# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.3.0
FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /src

FROM base as build
COPY --link package.json package-lock.json ./
RUN pnpm install --production=false
COPY --link . .
RUN pnpm run build
RUN pnpm prune --production

FROM base
ENV PORT=$PORT
COPY --from=build /src/.output /src/.output
CMD ["node", ".output/server/index.mjs"]
