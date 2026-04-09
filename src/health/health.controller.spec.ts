import { describe, it, expect, beforeEach } from 'vitest';
import { validateEnvironmentVariables } from '@src/common/helper/env.validation';
import { HealthController } from '@src/health/health.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { step } from '@test/bdd.utils';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    await step('Given: Health test module is created with required imports', async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            validate: validateEnvironmentVariables,
            isGlobal: true,
            envFilePath: ['../../.env.test']
          }),
          TerminusModule,
          HttpModule
        ],
        controllers: [HealthController]
      }).compile();

      controller = module.get<HealthController>(HealthController);
    });
  });

  it('should be defined', async () => {
    await step('Then: should have a valid instance', () => {
      expect(controller).toBeDefined();
    });
  });
});
