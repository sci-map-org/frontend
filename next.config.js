const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  /* config options here */
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.API_URL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    discourseForumUrl: process.env.DISCOURSE_FORUM_URL,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_KEY,
    awsRegion: process.env.AWS_REGION,
    googleAnalyticsMeasurementId: process.env.GA_MEASUREMENT_ID,
  },
});
