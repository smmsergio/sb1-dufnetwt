import { createObjectCsvWriter } from 'csv-writer';
import { format } from 'date-fns';
import { logger } from '../utils/logger.js';

export class ExportAgent {
  async exportToCSV(tenders) {
    const timestamp = format(new Date(), 'yyyy-MM-dd');
    const filename = `licitaciones_${timestamp}.csv`;

    const csvWriter = createObjectCsvWriter({
      path: filename,
      header: [
        { id: 'expediente', title: 'Número de Expediente' },
        { id: 'titulo', title: 'Título' },
        { id: 'organismo', title: 'Organismo Contratante' },
        { id: 'presupuesto', title: 'Presupuesto Base' },
        { id: 'fechaPublicacion', title: 'Fecha Publicación' },
        { id: 'fechaLimite', title: 'Fecha Límite' },
        { id: 'estado', title: 'Estado' },
        { id: 'enlace', title: 'Enlace' },
        { id: 'descripcion', title: 'Descripción' }
      ],
      encoding: 'utf8'
    });

    try {
      await csvWriter.writeRecords(tenders);
      logger.info(`Exported ${tenders.length} tenders to ${filename}`);
    } catch (error) {
      logger.error('Error exporting to CSV:', error);
      throw error;
    }
  }
}