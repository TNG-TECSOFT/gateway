import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;  
  TANGO_MS_HOST: string;
  TANGO_MS_PORT: number;
  TANGO_MS_NAME: string;
  BILLING_MS_HOST: string;
  BILLING_MS_PORT: number;
  BILLING_MS_NAME: string;
  SECRET_KEY: string;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  TANGO_MS_HOST: joi.string().required(),
  TANGO_MS_PORT: joi.number().required(),
  TANGO_MS_NAME: joi.string().required(),
  BILLING_MS_HOST: joi.string().required(),
  BILLING_MS_PORT: joi.number().required(),
  BILLING_MS_NAME: joi.string().required(),
  SECRET_KEY: joi.string().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate({ 
  ...process.env
});


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  port: envVars.PORT,
  tango_ms_host: envVars.TANGO_MS_HOST,
  tango_ms_port: envVars.TANGO_MS_PORT,
  tango_ms_name: envVars.TANGO_MS_NAME,
  billing_ms_host: envVars.BILLING_MS_HOST,
  billing_ms_port: envVars.BILLING_MS_PORT,
  billing_ms_name: envVars.BILLING_MS_NAME,
  secret_key: envVars.SECRET_KEY,
};