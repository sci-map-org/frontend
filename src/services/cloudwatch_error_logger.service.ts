import getConfig from 'next/config';
import { Logger } from './Logger';
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
  logger.install({
    async messageFormatter(e, info = { type: 'unknown' }) {
      if (!e.message) {
        return null
      }

      return JSON.stringify({
        message: e.message,
        timestamp: new Date().getTime(),
        userAgent: window.navigator.userAgent,
        ...info,
      })
    },
  });
}
