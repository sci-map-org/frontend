import getConfig from 'next/config';

type Env = {
  NODE_ENV: string;
  API_URL: string;
  GOOGLE_CLIENT_ID: string;
  DISCOURSE_FORUM_URL: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_KEY: string;
  AWS_REGION: string;
};
export class Environment {
  private envVars: Env;
  constructor() {
    const config = getConfig();
    if (!!config) {
      this.envVars = config.publicRuntimeConfig;
    } else {
      console.log(process.env.API_URL);
      this.envVars = {
        NODE_ENV: process.env.NODE_ENV,
        API_URL: process.env.API_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        DISCOURSE_FORUM_URL: process.env.DISCOURSE_FORUM_URL,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
        AWS_REGION: process.env.AWS_REGION,
      } as Env; // TODO: validate
    }
    console.log(this.envVars);
    console.log(this.envVars.API_URL);
  }
}

export const environment = new Environment();
