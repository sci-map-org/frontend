import { env } from '../env';
import { Logger } from './Logger';

/**
 * Catches uncaught errors and console.error() calls and send them to cloudwatch
 */
if (typeof window !== 'undefined' && env.NODE_ENV === 'production') {
  const accessKeyId = env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = env.AWS_SECRET_KEY;
  const region = env.AWS_REGION;

  const logGroupName = 'sci-map-frontend';

  const logger = new Logger(accessKeyId, secretAccessKey, region, logGroupName);
  // logger.install({
  //   async messageFormatter(e, info = { type: 'unknown' }) {
  //     if (!e.message) {
  //       return null;
  //     }

  //     return JSON.stringify({
  //       message: e.message,
  //       timestamp: new Date().getTime(),
  //       userAgent: window.navigator.userAgent,
  //       ...info,
  //     });
  //   },
  // });
}
