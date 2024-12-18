/**
 * Extracts profile information from the search results table
 * @param {Object} selectors - DOM selectors for profile elements
 */
export function extractProfileFromRow(selectors) {
  const results = [];
  const rows = document.querySelectorAll(selectors.rows);
  
  rows.forEach(row => {
    try {
      const titleEl = row.querySelector(selectors.title);
      const profileUrlEl = row.querySelector(selectors.profileUrl);
      const organizationEl = row.querySelector(selectors.organization);
      const statusEl = row.querySelector(selectors.status);
      const openTendersEl = row.querySelector(selectors.openTenders);

      if (titleEl && profileUrlEl) {
        const profile = {
          titulo: titleEl.textContent.trim(),
          enlace: profileUrlEl.href,
          organismo: organizationEl ? organizationEl.textContent.trim() : '',
          estado: statusEl ? statusEl.textContent.trim() : '',
          licitacionesAbiertas: openTendersEl ? parseInt(openTendersEl.textContent.trim()) || 0 : 0
        };
        results.push(profile);
      }
    } catch (error) {
      console.error('Error extracting profile data:', error);
    }
  });

  return results;
}