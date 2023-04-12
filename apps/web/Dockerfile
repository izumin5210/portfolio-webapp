# syntax=docker/dockerfile:1.3

FROM node:19.9.0-bullseye-slim as base

WORKDIR /app

RUN apt-get update \
  && apt-get install -y \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY .yarnrc.yml .
COPY .yarn ./.yarn

# pruner
#-----------------------------------------------
FROM base as pruner
WORKDIR /app
RUN npm i -g turbo@^1.5.3

COPY . .
RUN turbo prune --scope=@izumin5210/portfolio-webapp --docker

# installer
#-----------------------------------------------
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN --mount=type=cache,target=/app/.yarn/cache,id=yarn-cache,sharing=shared \
  yarn install --immutable

#  builder
#-----------------------------------------------
FROM base as builder

ENV CI true
ENV NODE_ENV production

RUN apt-get update \
  && apt-get install -y \
    git \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=pruner /app/.git ./.git
COPY --from=pruner /app/out/full/ .
COPY --from=installer /app/ .

COPY tsconfig.base.json /app/

RUN git rev-parse --short HEAD
RUN --mount=type=secret,id=dotenv,dst=/app/apps/web/.env \
  GIT_SHA=$(git rev-parse --short HEAD) yarn turbo run build --scope @izumin5210/portfolio-webapp \
  && rm -rf .next/static/**/*.map


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

# Copy build artifacts
COPY --from=builder /app/apps/web/.next/standalone /app/
COPY --from=builder /app/apps/web/.next/static /app/apps/web/.next/static

# Copy static files
COPY --from=builder /app/apps/web/public /app/apps/web/public

# Copy bundler analyzer results
COPY --from=builder /app/apps/web/.next/analyze/client.html /app/apps/web/public/_analyze/client.html
COPY --from=builder /app/apps/web/.next/server/analyze/server.html /app/apps/web/public/_analyze/server.html

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "/app/apps/web/server.js"]
