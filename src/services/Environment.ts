import getConfig from 'next/config';

type Env = {
  NODE_ENV: string; //'development' | 'production';
  API_URL: string; // # http://sci-map-api.eu-central-1.elasticbeanstalk.com/graphql
  GOOGLE_CLIENT_ID: string; //390325140829-njk2aup9efs7tprmpmqmke93886q602i.apps.googleusercontent.com
  DISCOURSE_FORUM_URL: string; //https://forum.sci-map.org
  AWS_ACCESS_KEY_ID: string; //='AKIASZYYXGWID7FCLFG2'
  AWS_SECRET_KEY: string; //='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'
  AWS_REGION: string; //'eu-central-1'
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
