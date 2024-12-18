import { logger } from '../utils/logger.js';
import { TENDER_SELECTORS } from '../selectors/tender.selectors.js';
import { extractTenderFromRow, extractTenderDetails } from '../extractors/tender.extractor.js';
import { delay } from '../utils/helpers.js';

export class TenderNavigator {
  constructor(pageNavigator) {
    this.pageNavigator = pageNavigator;
  }

  async extractTendersFromProfile(profileUrl) {
    let allTenders = [];
    try {
      const page = await this.pageNavigator.createPage();
      await this.pageNavigator.navigateToUrl(page, profileUrl);

      // Navigate to tenders tab
      await this.pageNavigator.waitAndClick(page, TENDER_SELECTORS.profilePage.tenderTab);
      await this.pageNavigator.waitForContent(page, TENDER_SELECTORS.profilePage.tenderTable);

      // Extract tenders from all pages
      do {
        const tenders = await this.extractTendersFromPage(page);
        allTenders = allTenders.concat(tenders);

        if (await this.hasNextPage(page)) {
          await this.goToNextPage(page);
        } else {
          break;
        }
      } while (true);

      await page.close();
      return allTenders;
    } catch (error) {
      logger.error(`Error extracting tenders from profile ${profileUrl}:`, error);
      return allTenders;
    }
  }

  async extractTendersFromPage(page) {
    try {
      await this.pageNavigator.waitForContent(page, TENDER_SELECTORS.profilePage.tenderTable);
      const tenders = await page.evaluate(extractTenderFromRow, TENDER_SELECTORS.profilePage);

      // Get details for each tender
      const detailedTenders = [];
      for (const tender of tenders) {
        try {
          const details = await this.extractTenderDetails(tender.enlace);
          detailedTenders.push({
            ...tender,
            ...details
          });
          await delay(2000);
        } catch (error) {
          logger.error(`Error extracting details for tender ${tender.enlace}:`, error);
          detailedTenders.push(tender);
        }
      }

      return detailedTenders;
    } catch (error) {
      logger.error('Error extracting tenders from page:', error);
      return [];
    }
  }

  async extractTenderDetails(tenderUrl) {
    try {
      const page = await this.pageNavigator.createPage();
      await this.pageNavigator.navigateToUrl(page, tenderUrl);
      await this.pageNavigator.waitForContent(page, '#DetalleLicitacionVIS_UOE');
      
      const details = await page.evaluate(extractTenderDetails, TENDER_SELECTORS.tenderDetails);
      await page.close();
      return details;
    } catch (error) {
      logger.error(`Error extracting tender details from ${tenderUrl}:`, error);
      return {};
    }
  }

  async hasNextPage(page) {
    try {
      const nextButton = await page.$(TENDER_SELECTORS.profilePage.nextButton);
      const isDisabled = nextButton ? await page.evaluate(el => el.disabled, nextButton) : true;
      return nextButton && !isDisabled;
    } catch (error) {
      logger.error('Error checking for next page:', error);
      return false;
    }
  }

  async goToNextPage(page) {
    try {
      await this.pageNavigator.waitAndClick(page, TENDER_SELECTORS.profilePage.nextButton, {
        afterClickDelay: 3000,
        waitForNavigation: true
      });
      await this.pageNavigator.waitForContent(page, TENDER_SELECTORS.profilePage.tenderTable);
    } catch (error) {
      logger.error('Error navigating to next page:', error);
      throw error;
    }
  }
}