# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.3.0
FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /src

# Установка pnpm через npm
RUN apt-get update && \
    apt-get install -y curl && \
    npm install -g pnpm

FROM base as dependencies
COPY --link package.json pnpm-lock.yaml ./
# Устанавливаем все зависимости, включая devDependencies
RUN pnpm install --frozen-lockfile

FROM base as build
COPY --link . .

# Копируем только node_modules и файлы проекта
COPY --from=dependencies /src/node_modules ./node_modules

# Запустите сценарии сборки с pnpm
RUN pnpm run build

# Удалите разработческие зависимости, оставив только зависимости для продакшена
RUN pnpm prune --prod

FROM base
ENV PORT=$PORT

# Копирование результатов сборки в итоговый образ
COPY --from=build /src/.output /src/.output
COPY --from=build /src/node_modules ./node_modules

CMD ["node", ".output/server/index.mjs"]
