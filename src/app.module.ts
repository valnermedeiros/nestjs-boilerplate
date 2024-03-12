import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { CommonModule } from '@/common/common.module';
import { getValidationSchema } from '@/common/helper/env.helper';
import { HealthModule } from '@/health/health.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema: getValidationSchema(), isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined
      },
      forRoutes: ['*'],
      exclude: [{ method: RequestMethod.ALL, path: 'health' }]
    }),
    ScheduleModule.forRoot(),
    CommonModule,
    HealthModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
