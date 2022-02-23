# syntax=docker/dockerfile:1.3

FROM node:16.14.0-bullseye-slim

WORKDIR /app

#  Timezone
#-----------------------------------------------
ENV TZ Asia/Tokyo

#  Locale
#-----------------------------------------------
RUN echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen \
  && apt-get update && apt-get install -y locales \
  && locale-gen ja_JP.UTF-8 \
  && update-locale LANG=ja_JP.UTF-8 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
ENV LC_CTYPE=ja_JP.UTF-8

#  Library
#-----------------------------------------------
RUN apt-get update \
  && apt-get install -y \
    ca-certificates \
    tini \
  && rm -rf /var/lib/apt/lists/*

#  yarn
#-----------------------------------------------
ENV CI true
COPY ./package.json ./yarn.lock ./.yarnrc.yml /app/
COPY ./.yarn /app/.yarn

# workspaces' package.json
COPY ./packages/scripts/package.json /app/packages/scripts/package.json
COPY ./packages/remark-h1-as-title/package.json /app/packages/remark-h1-as-title/package.json
COPY ./packages/remark-extract-lead/package.json /app/packages/remark-extract-lead/package.json
COPY ./packages/remark-meta-description/package.json /app/packages/remark-meta-description/package.json

RUN --mount=type=cache,target=/app/.yarn/cache,id=yarn-cache,sharing=shared \
  yarn install --immutable

COPY ./.babelrc ./tsconfig.base.json ./tsconfig.json ./next.config.js ./next-env.d.ts ./data.yml ./sentry.*.config.js /app/
COPY ./public/ /app/public
COPY ./src/ /app/src
COPY ./packages /app/packages
COPY ./_articles/ /app/_articles

ENV NODE_ENV production

ARG GIT_SHA
RUN yarn bootstrap
RUN --mount=type=secret,id=dotenv,dst=/app/.env yarn build && rm -rf .next/static/**/*.map

#  App
#-----------------------------------------------
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node_modules/.bin/next", "start"]
