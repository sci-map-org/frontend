import { Logger } from 'cloudwatch-front-logger';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

/**
 * Catches uncaught errors and console.error() calls and send them to cloudwatch
 */
if (typeof window !== 'undefined' && publicRuntimeConfig.nodeEnv === 'production') {
  const accessKeyId = publicRuntimeConfig.awsAccessKeyId;
  const secretAccessKey = publicRuntimeConfig.awsSecretKey;
  const region = publicRuntimeConfig.awsRegion;

  const logGroupName = 'sci-map-frontend';

  const logger = new Logger(accessKeyId, secretAccessKey, region, logGroupName);

  logger.install();
}
