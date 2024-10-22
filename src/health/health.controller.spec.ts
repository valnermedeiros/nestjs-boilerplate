import { validateEnvironmentVariables } from '@/common/helper/env.validation';
import { HealthController } from '@/health/health.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validate: validateEnvironmentVariables,
          isGlobal: true,
          envFilePath: ['../../.env.test']
        }),
        TerminusModule,
        HttpModule,
        PrismaModule
      ],
      controllers: [HealthController]
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
