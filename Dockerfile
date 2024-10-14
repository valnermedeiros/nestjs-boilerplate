FROM node:22.9.0-alpine AS base

ARG PNPM_HOME="/pnpm"
ARG PATH="$PNPM_HOME:$PATH"
ARG HUSKY="0"

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN apk add --no-cache curl && \
  export PNPM_VERSION=$(npm pkg get packageManager | tr -d '"') && \
  corepack enable && \
  corepack prepare "$PNPM_VERSION" --activate

FROM base AS dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile --ignore-scripts

FROM base AS build
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm prisma generate && \
  pnpm build && \
  pnpm prune --prod --ignore-scripts

FROM base AS deploy
COPY --from=base /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD [ "pnpm", "start:prod" ]
