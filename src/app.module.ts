import { Module, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "@src/app.controller";
import { AppService } from "@src/app.service";
import { CommonModule } from "@src/common/common.module";
import { NODE_ENV } from "@src/common/constants/config.const";
import { validateEnvironmentVariables } from "@src/common/helper/env.validation";
import { HealthModule } from "@src/health/health.module";
import { LoggerModule } from "nestjs-pino";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentVariables,
      isGlobal: true,
      cache: true,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProd = config.get<string>(NODE_ENV) === "production";
        return {
          pinoHttp: {
            level: isProd ? "info" : "debug",
            transport: isProd ? undefined : { target: "pino-pretty" },
          },
          forRoutes: [{ path: "*", method: RequestMethod.ALL }],
          exclude: [{ method: RequestMethod.ALL, path: "/health" }],
        };
      },
    }),
    ScheduleModule.forRoot(),
    CommonModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
