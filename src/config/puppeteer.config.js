export const PUPPETEER_CONFIG = {
  headless: false,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--window-size=1366,768'
  ],
  defaultViewport: {
    width: 1366,
    height: 768
  }
};

export const NAVIGATION_CONFIG = {
  waitUntil: 'networkidle0',
  timeout: 30000
};

export const RATE_LIMITS = {
  pageLoad: 2000,
  betweenRequests: 1000
};