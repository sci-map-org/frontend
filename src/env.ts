import getConfig from 'next/config';

const requiredEnvVarsKeys = [
  'NODE_ENV',
  'FRONTEND_URL',
  'API_URL',
  'GOOGLE_CLIENT_ID',
  'DISCOURSE_FORUM_URL',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_KEY',
  'AWS_REGION',
] as const;

type EnvVarKey = typeof requiredEnvVarsKeys[number];

type Env = {
  APP: 'frontend' | 'web_extension';
} & { [key in EnvVarKey]: string };

const getEnv = (): Env => {
  const config = getConfig();
  const APP: Env['APP'] = !!config ? 'frontend' : 'web_extension';
  const envVars = !!config
    ? {
        APP,
        NODE_ENV: config.publicRuntimeConfig.nodeEnv,
        FRONTEND_URL: config.publicRuntimeConfig.frontendUrl,
        API_URL: config.publicRuntimeConfig.apiUrl,
        GOOGLE_CLIENT_ID: config.publicRuntimeConfig.googleClientId,
        DISCOURSE_FORUM_URL: config.publicRuntimeConfig.discourseForumUrl,
        AWS_ACCESS_KEY_ID: config.publicRuntimeConfig.awsAccessKeyId,
        AWS_SECRET_KEY: config.publicRuntimeConfig.awsSecretKey,
        AWS_REGION: config.publicRuntimeConfig.awsRegion,
      }
    : {
        APP,
        NODE_ENV: process.env.NODE_ENV,
        FRONTEND_URL: process.env.FRONTEND_URL,
        API_URL: process.env.API_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        DISCOURSE_FORUM_URL: process.env.DISCOURSE_FORUM_URL,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
        AWS_REGION: process.env.AWS_REGION,
      };

  //validate
  requiredEnvVarsKeys.forEach((envVarKey) => {
    if (typeof envVarKey !== 'string') throw new Error(`Missing Env var ${envVarKey}`);
  });

  return envVars as Required<typeof envVars>;
};
export const env: Env = getEnv();
