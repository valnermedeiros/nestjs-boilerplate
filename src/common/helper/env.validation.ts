import { Expose, plainToInstance, Type } from 'class-transformer';
import { IsEnum, IsOptional, Max, Min, validateSync } from 'class-validator';
import 'reflect-metadata';

enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test',
  PROVISION = 'provision'
}

class EnvironmentVariables {
  @Expose({ name: 'NODE_ENV' })
  @IsOptional()
  @IsEnum(Environment)
  nodeEnv!: Environment;

  @Expose({ name: 'PORT' })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @Max(65535)
  port!: number;

  @Expose({ name: 'SWAGGER_DOCS' })
  @IsOptional()
  @Type(() => Boolean)
  swaggerDocs!: boolean;

  constructor(partial: Partial<EnvironmentVariables>) {
    Object.assign(this, partial);
    this.port = this.port || 3000;
    this.swaggerDocs = this.swaggerDocs || false;
    this.nodeEnv = this.nodeEnv || Environment.DEVELOPMENT;
  }
}

export function validateEnvironmentVariables(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    strategy: 'excludeAll'
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
