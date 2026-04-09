# Claude Code Rules — NestJS Boilerplate

## Environment

- Always use `fnm` to resolve Node and pnpm: prefix every shell command that needs node/pnpm with `eval "$(fnm env)" &&`
- Package manager: `pnpm`
- Node version: >=24 (managed by fnm)

## Code Style

- TypeScript strict mode is on (`noImplicitAny`, `strictNullChecks`, `strictBindCallApply`)
- Never use `any` — use `unknown` and narrow with type guards
- Path aliases: `@src/` maps to `src/`, `@test/` maps to `test/`
- No relative imports — always use `@src/` or `@test/` aliases

## NestJS Conventions

- One module per feature directory under `src/`
- Providers, controllers, and modules are registered in their own feature module
- Use `@Global()` only for truly cross-cutting concerns (e.g. config, logging)
- Dependency injection via constructor — never instantiate services manually outside tests
- Use `@nestjs/config` `ConfigService` for all environment access; validate env vars in `env.validation.ts`
- Exception filters go in `src/filters/`

## ESLint

- **Never bypass ESLint rules** — no `// eslint-disable` comments, no `/* eslint-disable */` blocks
- **Never edit `eslint.config.mjs`** — if code triggers a lint error, fix the code
- Run lint before committing: `eval "$(fnm env)" && pnpm lint`

## Testing

### Framework
- Test runner: **Vitest**
- Unit/integration tests: `src/**/*.spec.ts` — run with `pnpm test`
- E2E tests: `test/**/*.e2e-spec.ts` — run with `pnpm test:e2e`
- Coverage: `pnpm test:cov`
- UI mode: `pnpm test:ui`

### BDD Structure — Given / When / Then
Every test must use inline `step()` from `@test/bdd.utils` to label stages:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { step } from '@test/bdd.utils';

it('should do something', async () => {
  let result: string;

  await step('Given: precondition is set up', async () => {
    // setup
  });

  await step('When: action is performed', async () => {
    result = subject.doSomething();
  });

  await step('Then: result should match expectation', () => {
    expect(result).toBe('expected');
  });
});
```

- Use `async () =>` only when the callback actually awaits something; otherwise use `() =>`
- `beforeEach`/`beforeAll` setup blocks also use `step()` with a `Given:` label
- `afterAll` teardown does not need a step label

### Allure Reporting
- Steps are tracked automatically via `step()` and appear in Allure reports
- Generate report: `pnpm test:allure`
- View report: `pnpm test:allure:report`
- `allure-results/` and `allure-report/` are gitignored

### E2E Tests
- Use Fastify's built-in `app.inject()` — no `supertest` or other HTTP clients
- Initialize the full `AppModule` via `Test.createTestingModule({ imports: [AppModule] })`
- Always call `await app.close()` in `afterAll`

## Scripts Reference

```bash
pnpm build              # compile with nest build
pnpm start:dev          # watch mode
pnpm lint               # eslint --fix (also formats via prettier plugin)
pnpm test               # vitest run (unit)
pnpm test:watch         # vitest watch
pnpm test:e2e           # vitest e2e
pnpm test:cov           # coverage
pnpm test:allure        # generate allure report
pnpm test:allure:report # serve allure report
```
