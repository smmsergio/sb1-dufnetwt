import { logger } from '../utils/logger.js';
import { OpenAIAnalyzer } from '../services/OpenAIAnalyzer.js';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
  override: true
});

export class FilterAgent {
  constructor() {
    this.analyzer = new OpenAIAnalyzer();
  }

  async filterSoftwareTenders(tenders) {
    try {
      const filteredTenders = [];
      
      for (const tender of tenders) {
        const isSoftwareRelated = await this.analyzer.analyzeTender(tender);
        if (isSoftwareRelated) {
          filteredTenders.push(tender);
        }
      }

      logger.info(`Filtered ${filteredTenders.length} software-related tenders from ${tenders.length} total tenders`);
      return filteredTenders;
    } catch (error) {
      logger.error('Error filtering tenders:', error);
      throw error;
    }
  }
}