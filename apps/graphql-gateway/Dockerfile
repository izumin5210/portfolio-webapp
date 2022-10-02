# syntax=docker/dockerfile:1.3

FROM node:18.10.0-bullseye-slim as base

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
RUN turbo prune --scope=@izumin5210/portfolio-graphql-gateway --docker

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

RUN git rev-parse --short HEAD
RUN yarn turbo run build --scope @izumin5210/portfolio-graphql-gateway


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

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn workspaces focus --all --production
RUN --mount=type=cache,target=/app/.yarn/cache,id=yarn-cache,sharing=shared \
  yarn install --immutable

# Copy build artifacts
COPY --from=builder /app/apps/graphql-gateway/dist /app/apps/graphql-gateway/dist

COPY data.yml .
COPY _articles ./_articles

WORKDIR /app/apps/graphql-gateway

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "./dist/main.js"]
