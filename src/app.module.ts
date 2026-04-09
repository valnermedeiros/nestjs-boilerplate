import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { CommonModule } from '@src/common/common.module';
import { validateEnvironmentVariables } from '@src/common/helper/env.validation';
import { HealthModule } from '@src/health/health.module';
import { Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { env } from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentVariables,
      isGlobal: true,
      cache: true
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport: env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined
      },
      forRoutes: ['*'],
      exclude: [{ method: RequestMethod.ALL, path: 'health' }]
    }),
    ScheduleModule.forRoot(),
    CommonModule,
    HealthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
