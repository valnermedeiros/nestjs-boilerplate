import joi from 'joi';

export function getValidationSchema(): joi.Schema {
  return joi.object({
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test', 'provision', 'staging')
      .default('development'),
    PORT: joi.number().port().default(3000),
    DATABASE_URL: joi.string().required()
  });
}
