# syntax=docker/dockerfile:1.3

FROM node:16.13.1-bullseye-slim

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
    tini \
  && rm -rf /var/lib/apt/lists/*

#  yarn
#-----------------------------------------------
COPY ./package.json ./yarn.lock /app/
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn,id=yarn-cache,sharing=shared \
  yarn install --frozen-lockfile --no-progress

COPY ./.babelrc ./tsconfig.json ./next.config.js ./next-env.d.ts ./data.yml /app/
COPY ./public/ /app/public
COPY ./src/ /app/src

ENV NODE_ENV production

ARG GIT_SHA
RUN yarn build

#  App
#-----------------------------------------------
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node_modules/.bin/next", "start"]
