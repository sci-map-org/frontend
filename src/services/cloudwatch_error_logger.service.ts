import { Logger } from 'cloudwatch-front-logger';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const accessKeyId = publicRuntimeConfig.awsAccessKeyId;
const secretAccessKey = publicRuntimeConfig.awsSecretKey;
const region = publicRuntimeConfig.awsRegion;

const logGroupName = 'sci-map-frontend';

const logger = new Logger(accessKeyId, secretAccessKey, region, logGroupName);

logger.install();

/**
 * Limitations: needs to be imported only on the browser as it depends on localStorage.
 * It is then dynamically (async) imported, so errors before that are not caught
 */
