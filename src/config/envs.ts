import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;  
  HOST: string;
  MS_PORT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  
  HOST: joi.string().required(),
  MS_PORT: joi.number().required(),
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
  ms_port: envVars.MS_PORT,
  host: envVars.HOST,

};