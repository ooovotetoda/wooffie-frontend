# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.3.0
FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /src

# Явно устанавливаем переменную SHELL и запускаем установку pnpm
RUN apt-get update && \
    apt-get install -y curl && \
    SHELL=/bin/bash curl -fsSL https://get.pnpm.io/install.sh | sh -

FROM base as build
COPY --link package.json pnpm-lock.yaml ./

# Используйте pnpm для установки зависимостей
RUN pnpm install --frozen-lockfile --production=false

COPY --link . .

# Запустите сценарии сборки с pnpm
RUN pnpm run build

# Удалите разработческие зависимости, оставив только зависимости для продакшена
RUN pnpm prune --production

FROM base
ENV PORT=$PORT

# Копирование результатов сборки в итоговый образ
COPY --from=build /src/.output /src/.output

CMD ["node", ".output/server/index.mjs"]
