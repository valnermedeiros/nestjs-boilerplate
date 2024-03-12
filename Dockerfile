FROM node:20.11.0-alpine AS base

ARG PNPM_HOME="/pnpm"
ARG PATH="$PNPM_HOME:$PATH"
ARG HUSKY="0"

RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
ENV NODE_ENV="production"
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i -P --frozen-lockfile --ignore-scripts
RUN pnpx prisma generate

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile
RUN pnpm build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

EXPOSE 3000
CMD [ "pnpm", "start:prod" ]
