import puppeteer from 'puppeteer';
import { logger } from '../utils/logger.js';
import { PUPPETEER_CONFIG } from '../config/puppeteer.config.js';
import { PageNavigator } from '../navigation/PageNavigator.js';
import { ProfileNavigator } from '../navigation/ProfileNavigator.js';
import { TenderNavigator } from '../navigation/TenderNavigator.js';

export class NavigationAgent {
  constructor() {
    this.baseUrl = 'https://contrataciondelestado.es/wps/portal/perfilContratante';
  }

  async initialize() {
    try {
      this.browser = await puppeteer.launch(PUPPETEER_CONFIG);
      this.pageNavigator = new PageNavigator(this.browser, PUPPETEER_CONFIG);
      this.profileNavigator = new ProfileNavigator(this.pageNavigator);
      this.tenderNavigator = new TenderNavigator(this.pageNavigator);
      this.page = await this.pageNavigator.createPage();
      await this.pageNavigator.navigateToUrl(this.page, this.baseUrl);
    } catch (error) {
      logger.error('Error initializing browser:', error);
      throw error;
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async extractTenders() {
    try {
      // Search and extract profiles
      await this.profileNavigator.searchProfiles(this.page);
      const profiles = await this.profileNavigator.extractProfiles(this.page);
      logger.info(`Found ${profiles.length} profiles`);

      // Extract tenders from each profile
      let allTenders = [];
      for (const profile of profiles) {
        try {
          const tenders = await this.tenderNavigator.extractTendersFromProfile(profile.enlace);
          allTenders = allTenders.concat(tenders);
        } catch (error) {
          logger.error(`Error extracting tenders from profile ${profile.enlace}:`, error);
        }
      }

      return allTenders;
    } catch (error) {
      logger.error('Error extracting tenders:', error);
      return [];
    }
  }
}