FROM node:20-bookworm

WORKDIR /frontend

COPY . .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

ENV NUXT_PORT=3000
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0
ENV NUXT_HOST=0.0.0.0
# ENV HOST=0.0.0.0

EXPOSE 3000

RUN pnpm run build
CMD ["node", "/frontend/.output/server/index.mjs"]
