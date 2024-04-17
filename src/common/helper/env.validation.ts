/* eslint-disable @typescript-eslint/naming-convention */
import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUrl,
  Max,
  Min,
  validateSync
} from 'class-validator';

enum Environment {
  development = 'development',
  staging = 'staging',
  production = 'production',
  test = 'test',
  provision = 'provision'
}

class EnvironmentVariables {
  @IsDefined()
  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT!: number;

  @IsUrl({
    protocols: ['postgresql'],
    require_port: true
  })
  @IsDefined()
  DATABASE_URL!: string;

  @IsDefined()
  @IsBoolean()
  SWAGGER_DOCS!: boolean;
}

export function validateEnvironmentVariables(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
