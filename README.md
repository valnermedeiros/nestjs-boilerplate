# NestJS Boilerplate

A production-ready NestJS boilerplate with Fastify, Vitest, Allure reporting, and strict tooling.

## Stack

| Layer | Technology |
|---|---|
| Framework | [NestJS](https://nestjs.com) + [Fastify](https://fastify.dev) |
| Language | TypeScript (strict mode) |
| Testing | [Vitest](https://vitest.dev) + [Allure](https://allurereport.org) |
| Linting | ESLint + Prettier (via plugin) |
| Commits | [Conventional Commits](https://www.conventionalcommits.org) + commitlint |
| Node | >=24 managed via [fnm](https://github.com/Schniz/fnm) |
| Package manager | pnpm |

## Prerequisites

- [fnm](https://github.com/Schniz/fnm) — Node version manager
- Node 24+ (`fnm install 24`)
- pnpm (`npm i -g pnpm`)

## Getting Started

```bash
# install dependencies
pnpm install

# start in watch mode
pnpm start:dev

# build for production
pnpm build

# start production build
pnpm start:prod
```

## Testing

Tests use Vitest with a BDD-style Given / When / Then structure via inline `step()` calls. Results are reported to Allure.

```bash
# unit & integration tests
pnpm test

# watch mode
pnpm test:watch

# e2e tests
pnpm test:e2e

# coverage report
pnpm test:cov

# vitest ui
pnpm test:ui

# generate allure report
pnpm test:allure

# serve allure report
pnpm test:allure:report
```

### Test Structure

```typescript
it("should do something", async () => {
  await step("Given: precondition", async () => { ... });
  await step("When: action is performed", async () => { ... });
  await step("Then: result matches expectation", () => { ... });
});
```

## Linting

ESLint handles both linting and formatting (via `eslint-plugin-prettier`).

```bash
pnpm lint
```

The pre-commit hook runs lint automatically on staged `src/**/*` files.

## Commits

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org):

```
feat: add user authentication
fix: resolve token expiry issue
chore: update dependencies
refactor: simplify health controller
```

Use `pnpm commit` (commitizen) for an interactive prompt.

## Project Structure

```
src/
├── common/           # shared helpers, constants, modules
│   ├── constants/
│   └── helper/
├── filters/          # global exception filters
│   └── exception/
├── health/           # health check endpoint (/health)
├── app.controller.ts
├── app.module.ts
└── app.service.ts
test/
├── bdd.utils.ts      # Given/When/Then step helper
└── app.e2e-spec.ts
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NODE_ENV` | Environment | `development` |
| `PORT` | HTTP port | `3000` |
| `SWAGGER_DOCS` | Enable Swagger UI | `false` |

Copy `.env.test.local` as `.env` for local overrides.
