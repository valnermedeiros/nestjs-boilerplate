import { Expose, plainToInstance, Type } from "class-transformer";
import { IsEnum, IsOptional, Max, Min, validateSync } from "class-validator";
import "reflect-metadata";

enum Environment {
  DEVELOPMENT = "development",
  STAGING = "staging",
  PRODUCTION = "production",
  TEST = "test",
  PROVISION = "provision",
}

class EnvironmentVariables {
  @Expose()
  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @Max(65535)
  PORT!: number;

  @Expose()
  @IsOptional()
  @Type(() => Boolean)
  SWAGGER_DOCS!: boolean;

  constructor(partial: Partial<EnvironmentVariables>) {
    Object.assign(this, partial);
    this.PORT = this.PORT || 3000;
    this.SWAGGER_DOCS = this.SWAGGER_DOCS || false;
    this.NODE_ENV = this.NODE_ENV || Environment.DEVELOPMENT;
  }
}

export function validateEnvironmentVariables(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    strategy: "excludeAll",
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
