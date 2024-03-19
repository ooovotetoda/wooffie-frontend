# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.3.0
FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /src

RUN apt-get update && apt-get install -y curl && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

FROM base as build
COPY --link package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --production=false

COPY --link . .

RUN pnpm run build

RUN pnpm prune --production

FROM base
ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD ["node", ".output/server/index.mjs"]
