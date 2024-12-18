export const TENDER_SELECTORS = {
  // Profile list selectors
  profileList: {
    table: '#tableBusquedaPerfilContratante',
    rows: '#tableBusquedaPerfilContratante tbody tr',
    title: '.tdOrganoContratacionBusqPerfil a:first-child span',
    profileUrl: '.tdOrganoContratacionBusqPerfil a:nth-child(2)',
    organization: '.tdNombreAdmin',
    status: '.tdEstado',
    openTenders: '.tdLicAbiertas'
  },

  // Search form selectors
  searchForm: {
    searchButton: '#viewns_Z7_AVEQAI930GRPE02BR764FO30G0_\\:listaperfiles\\:botonbuscar',
    form: '#viewns_Z7_AVEQAI930GRPE02BR764FO30G0_\\:listaperfiles'
  },

  // Profile page selectors
  profilePage: {
    tenderTab: 'input[value="Licitaciones"]',
    tenderTable: '#tableLicitacionesPerfilContratante',
    tenderRows: '#tableLicitacionesPerfilContratante tbody tr',
    expediente: '.tdExpediente a:last-child', // Changed to get the second link
    tipo: '.tdTipoContrato',
    objeto: '.tdTipoContratoLicOC',
    estado: '.tdEstado',
    importe: '.tdImporte',
    nextButton: 'input[value="Siguiente >>"]',
    lastButton: 'input[value="Último"]'
  },

  // Tender details selectors  
  tenderDetails: {
    expediente: '#fila0_columna0 span:last-child',
    titulo: '#fila4_columna2 span',
    presupuesto: '#fila5_columna2 span:first-child',
    tipo: '#fila7_columna2 span', 
    estado: '#fila3_columna2 span',
    cpv: '#fila8_columna2 span',
    descripcion: '#fila4_columna2 span'
  }
};