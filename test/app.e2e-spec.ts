import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { AppModule } from "@src/app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";
import { step } from "@test/bdd.utils";

describe("AppController (e2e)", () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    await step(
      "Given: NestJS application is initialized with full AppModule",
      async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication<NestFastifyApplication>(
          new FastifyAdapter(),
        );
        await app.init();
        await app.getHttpAdapter().getInstance().ready();
      },
    );
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('GET / should return "Hello World!" with 200 status', async () => {
    let response: { statusCode: number; payload: string };

    await step("When: GET request is made to root endpoint", async () => {
      response = await app.inject({ method: "GET", url: "/" });
    });

    await step("Then: response status should be 200", () => {
      expect(response.statusCode).toBe(200);
    });

    await step('Then: response body should be "Hello World!"', () => {
      expect(response.payload).toBe("Hello World!");
    });
  });
});
