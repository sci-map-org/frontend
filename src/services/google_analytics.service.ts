import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const dev = process.env.NODE_ENV !== 'production'
console.log(dev)
// export const initGA = () => {
//     ReactGA.initialize(publicRuntimeConfig.googleAnalyticsMeasurementId)
// }

// export const logPageView = () => {
//     ReactGA.set({ page: window.location.pathname })
//     ReactGA.pageview(window.location.pathname)
// }

export const GA_TRACKING_ID = 'G-TPMCDNJKEY'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// export const event = ({ action, category, label, value }) => {
//   window.gtag('event', action, {
//     event_category: category,
//     event_label: label,
//     value: value,
//   })
// }