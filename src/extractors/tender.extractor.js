/**
 * Extracts tender information from the profile's tender table
 * @param {Object} selectors - DOM selectors for tender elements
 */
export function extractTenderFromRow(selectors) {
  const results = [];
  const rows = document.querySelectorAll(selectors.tenderRows);
  
  rows.forEach(row => {
    try {
      const expedienteEl = row.querySelector(selectors.expediente);
      const tipoEl = row.querySelector(selectors.tipo);
      const objetoEl = row.querySelector(selectors.objeto);
      const estadoEl = row.querySelector(selectors.estado);
      const importeEl = row.querySelector(selectors.importe);

      if (expedienteEl) {
        const tender = {
          expediente: expedienteEl.textContent.trim(),
          enlace: expedienteEl.href,
          tipo: tipoEl ? tipoEl.textContent.trim() : '',
          objeto: objetoEl ? objetoEl.textContent.trim() : '',
          estado: estadoEl ? estadoEl.textContent.trim() : '',
          importe: importeEl ? parseFloat(importeEl.textContent.trim().replace(/\./g, '').replace(',', '.')) || 0 : 0
        };
        results.push(tender);
      }
    } catch (error) {
      console.error('Error extracting tender data:', error);
    }
  });

  return results;
}

/**
 * Extracts detailed tender information from the tender details page
 * @param {Object} selectors - DOM selectors for tender details
 */
export function extractTenderDetails(selectors) {
  try {
    const getText = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.textContent.trim() : '';
    };

    return {
      expediente: getText(selectors.expediente),
      titulo: getText(selectors.titulo),
      presupuesto: getText(selectors.presupuesto),
      tipo: getText(selectors.tipo),
      estado: getText(selectors.estado),
      cpv: getText(selectors.cpv),
      descripcion: getText(selectors.descripcion)
    };
  } catch (error) {
    console.error('Error extracting tender details:', error);
    return {};
  }
}