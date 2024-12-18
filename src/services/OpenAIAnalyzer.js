import OpenAI from 'openai';
import { logger } from '../utils/logger.js';
import { config } from '../config/config.js';

export class OpenAIAnalyzer {
  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openai.apiKey
    });
  }

  async analyzeTender(tender) {
    try {
      const prompt = this.buildPrompt(tender);
      
      const response = await this.openai.chat.completions.create({
        model: config.openai.model,
        messages: [{
          role: "system",
          content: "You are an expert in analyzing public tenders. Your task is to determine if a tender is related to software development or IT services. Respond with only 'true' or 'false'."
        }, {
          role: "user",
          content: prompt
        }],
        temperature: config.openai.temperature,
        max_tokens: config.openai.maxTokens
      });

      const result = response.choices[0].message.content.toLowerCase().includes('true');
      logger.debug(`OpenAI analysis for tender ${tender.expediente}: ${result}`);
      return result;
    } catch (error) {
      logger.error('Error analyzing tender with OpenAI:', error);
      return false;
    }
  }

  buildPrompt(tender) {
    return `Analyze this public tender and determine if it's related to software development or IT services:
Title: ${tender.titulo || ''}
Description: ${tender.descripcion || ''}
Organization: ${tender.organismo || ''}`;
  }
}