# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.3.0
FROM node:${NODE_VERSION}-slim AS base

ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /src

# Установка зависимостей через npm
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

FROM base AS dependencies
COPY --link package.json package-lock.json ./
# Устанавливаем все зависимости, включая devDependencies
RUN npm ci

FROM dependencies AS build
COPY --link . .

# Запустите сценарии сборки с npm
RUN npm run build

# Удалите разработческие зависимости, оставив только зависимости для продакшена
RUN npm prune --production

FROM node:${NODE_VERSION}-slim AS runtime
WORKDIR /src
ENV NODE_ENV=production
ENV PORT=$PORT

# Копирование результатов сборки и продакшен зависимостей в итоговый образ
COPY --from=build /src/.output /src/.output
COPY --from=build /src/node_modules ./node_modules
COPY --from=build /src/package.json ./package.json

CMD ["node", ".output/server/index.mjs"]
