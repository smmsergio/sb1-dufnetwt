import { logger } from '../utils/logger.js';

export class ProcessingAgent {
  cleanData(tenders) {
    try {
      return tenders.map(tender => ({
        expediente: this.sanitize(tender.expediente),
        titulo: this.sanitize(tender.titulo),
        organismo: this.sanitize(tender.organismo),
        presupuesto: this.cleanAmount(tender.presupuesto),
        fechaPublicacion: this.formatDate(tender.fechaPublicacion),
        fechaLimite: this.formatDate(tender.fechaLimite),
        estado: this.sanitize(tender.estado),
        enlace: tender.enlace,
        descripcion: this.sanitize(tender.descripcion)
      }));
    } catch (error) {
      logger.error('Error processing tenders:', error);
      throw error;
    }
  }

  sanitize(text) {
    return text?.trim().replace(/[\r\n]+/g, ' ') ?? '';
  }

  cleanAmount(amount) {
    return amount?.replace(/[^\d,]/g, '') ?? '';
  }

  formatDate(date) {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  }
}