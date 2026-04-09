import { describe, it, expect, beforeEach } from "vitest";
import { AppController } from "@src/app.controller";
import { AppService } from "@src/app.service";
import { step } from "@test/bdd.utils";

describe("AppController", () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    await step("Given: AppController is initialized", () => {
      appService = new AppService();
      appController = new AppController(appService);
    });
  });

  describe("getHello", () => {
    it('should return "Hello World!"', async () => {
      let result: string;

      await step("When: getHello() is called", () => {
        result = appController.getHello();
      });

      await step('Then: should return "Hello World!"', () => {
        expect(result).toBe("Hello World!");
      });
    });
  });
});
