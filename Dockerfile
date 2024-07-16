# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.3.0
FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /src

RUN apt-get update && \
    apt-get install -y curl && \
    npm install -g pnpm

FROM base as build
COPY --link package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --link . .

RUN pnpm run build

RUN pnpm prune --prod

FROM base
ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD ["node", ".output/server/index.mjs"]
