import { logger } from '../utils/logger.js';
import { TENDER_SELECTORS } from '../selectors/tender.selectors.js';
import { extractProfileFromRow } from '../extractors/profile.extractor.js';

export class ProfileNavigator {
  constructor(pageNavigator) {
    this.pageNavigator = pageNavigator;
  }

  async searchProfiles(page) {
    try {
      await this.pageNavigator.waitAndClick(
        page,
        TENDER_SELECTORS.searchForm.searchButton
      );
      await this.pageNavigator.waitForContent(
        page,
        TENDER_SELECTORS.profileList.table
      );
    } catch (error) {
      logger.error('Error searching profiles:', error);
      throw error;
    }
  }

  async extractProfiles(page) {
    try {
      await this.pageNavigator.waitForContent(
        page,
        TENDER_SELECTORS.profileList.table
      );
      return await page.evaluate(extractProfileFromRow, TENDER_SELECTORS.profileList);
    } catch (error) {
      logger.error('Error extracting profiles:', error);
      throw error;
    }
  }
}