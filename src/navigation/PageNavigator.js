import { delay } from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

export class PageNavigator {
  constructor(browser, config) {
    this.browser = browser;
    this.config = config;
  }

  async createPage() {
    const page = await this.browser.newPage();
    await page.setViewport(this.config.defaultViewport);
    return page;
  }

  async navigateToUrl(page, url, waitOptions = {}) {
    try {
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
        ...waitOptions
      });
      await delay(2000); // Base delay after navigation
    } catch (error) {
      logger.error(`Error navigating to ${url}:`, error);
      throw error;
    }
  }

  async waitAndClick(page, selector, options = {}) {
    try {
      await page.waitForSelector(selector, { visible: true, timeout: 10000 });
      await delay(1000); // Small delay before clicking
      await page.click(selector);
      await delay(options.afterClickDelay || 2000); // Configurable delay after clicking
      
      if (options.waitForNavigation) {
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30000 });
      }
    } catch (error) {
      logger.error(`Error clicking element ${selector}:`, error);
      throw error;
    }
  }

  async waitForContent(page, selector, options = {}) {
    try {
      await page.waitForSelector(selector, { 
        visible: true, 
        timeout: options.timeout || 10000 
      });
      await delay(1000); // Small delay after content appears
    } catch (error) {
      logger.error(`Error waiting for content ${selector}:`, error);
      throw error;
    }
  }
}