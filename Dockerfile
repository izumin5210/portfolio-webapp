# syntax=docker/dockerfile:1.3

FROM node:16.15.0-bullseye-slim as base

WORKDIR /app

RUN apt-get update \
  && apt-get install -y \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*


#  builder
#-----------------------------------------------
FROM base as builder

ENV CI true
COPY ./package.json ./yarn.lock ./.yarnrc.yml /app/
COPY ./.yarn /app/.yarn

# workspaces' package.json
COPY ./packages/scripts/package.json /app/packages/scripts/package.json
COPY ./packages/remark-h1-as-title/package.json /app/packages/remark-h1-as-title/package.json
COPY ./packages/remark-extract-lead/package.json /app/packages/remark-extract-lead/package.json
COPY ./packages/remark-meta-description/package.json /app/packages/remark-meta-description/package.json

# install dependencies
RUN --mount=type=cache,target=/app/.yarn/cache,id=yarn-cache,sharing=shared \
  yarn install --immutable

COPY ./.babelrc ./tsconfig.base.json ./tsconfig.json ./next.config.js ./next-env.d.ts ./sentry.*.config.js /app/
COPY ./src/ /app/src
COPY ./packages /app/packages

ENV NODE_ENV production

ARG GIT_SHA
RUN yarn bootstrap
RUN --mount=type=secret,id=dotenv,dst=/app/.env yarn build && rm -rf .next/static/**/*.map


#  runner
#-----------------------------------------------
FROM base as runner

ENV NODE_ENV production

# Timezone
ENV TZ Asia/Tokyo

# Locale
RUN echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen \
  && apt-get update && apt-get install -y locales \
  && locale-gen ja_JP.UTF-8 \
  && update-locale LANG=ja_JP.UTF-8 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
ENV LC_CTYPE=ja_JP.UTF-8

# Library
RUN apt-get update \
  && apt-get install -y \
    tini \
  && rm -rf /var/lib/apt/lists/*

# Google Chrome
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable libxss1 fonts-noto-cjk \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Copy static files
COPY package.json ./data.yml /app/
COPY ./public/ /app/public
COPY ./_articles/ /app/_articles

# Copy build artifacts
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy bundler analyzer results
COPY --from=builder /app/.next/analyze/client.html ./public/_analyze/client.html
COPY --from=builder /app/.next/server/analyze/server.html ./public/_analyze/server.html

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "server.js"]
