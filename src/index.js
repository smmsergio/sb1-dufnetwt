import { NavigationAgent } from './agents/NavigationAgent.js';
import { FilterAgent } from './agents/FilterAgent.js';
import { ProcessingAgent } from './agents/ProcessingAgent.js';
import { ExportAgent } from './agents/ExportAgent.js';
import { logger } from './utils/logger.js';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
  override: true
});

async function main() {
  const navigationAgent = new NavigationAgent();
  const filterAgent = new FilterAgent();
  const processingAgent = new ProcessingAgent();
  const exportAgent = new ExportAgent();

  try {
    await navigationAgent.initialize();
    const rawTenders = await navigationAgent.extractTenders();
    const filteredTenders = await filterAgent.filterSoftwareTenders(rawTenders);
    const processedTenders = processingAgent.cleanData(filteredTenders);
    await exportAgent.exportToCSV(processedTenders);
    logger.info('Tender extraction completed successfully');
  } catch (error) {
    logger.error('Error in main process:', error);
  } finally {
    await navigationAgent.close();
  }
}

main();