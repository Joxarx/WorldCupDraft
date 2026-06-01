// World Cup 2026 — 12 groups (A–L), 4 fixed teams each = 48 teams.
// The TEAMS in each group are FIXED. What the draw randomises is which
// PARTICIPANT (person) is assigned to each group.

export const TEAMS = {
  // Grupo A
  MEX: { code: 'MEX', name: 'México',          flag: '🇲🇽', color: '#006847', funFact: 'Anfitrión del mundial 1970, 1986 y 2026.', strength: 'Local + afición masiva' },
  RSA: { code: 'RSA', name: 'Sudáfrica',       flag: '🇿🇦', color: '#007A4D', funFact: 'Campeona africana en 1996.',          strength: 'Ritmo y velocidad' },
  KOR: { code: 'KOR', name: 'Corea del Sur',   flag: '🇰🇷', color: '#CD2E3A', funFact: 'Semifinalista en 2002.',             strength: 'Presión incansable' },
  CZE: { code: 'CZE', name: 'Rep. Checa',      flag: '🇨🇿', color: '#11457E', funFact: 'Subcampeona de la Euro 1996.',       strength: 'Disciplina europea' },

  // Grupo B
  CAN: { code: 'CAN', name: 'Canadá',          flag: '🇨🇦', color: '#D52B1E', funFact: 'Anfitrión del mundial 2026.',        strength: 'Energía local' },
  BIH: { code: 'BIH', name: 'Bosnia',          flag: '🇧🇦', color: '#1F6FB2', funFact: 'Los dragones de los Balcanes.',      strength: 'Ataque potente' },
  QAT: { code: 'QAT', name: 'Qatar',           flag: '🇶🇦', color: '#8A1538', funFact: 'Campeón asiático 2019 y 2023.',      strength: 'Bloque sólido' },
  SUI: { code: 'SUI', name: 'Suiza',           flag: '🇨🇭', color: '#D8232A', funFact: 'La nati siempre en octavos.',        strength: 'Orden táctico' },

  // Grupo C
  BRA: { code: 'BRA', name: 'Brasil',          flag: '🇧🇷', color: '#009C3B', funFact: 'Cinco veces campeona del mundo.',    strength: 'Talento ofensivo' },
  MAR: { code: 'MAR', name: 'Marruecos',       flag: '🇲🇦', color: '#C1272D', funFact: 'Semifinalista en Qatar 2022.',       strength: 'Defensa de hierro' },
  HAI: { code: 'HAI', name: 'Haití',           flag: '🇭🇹', color: '#00209F', funFact: 'Vuelve a un mundial tras 1974.',     strength: 'Talento caribeño' },
  SCO: { code: 'SCO', name: 'Escocia',         flag: '🏴', color: '#0065BD', funFact: 'La Tartan Army imparable.',         strength: 'Intensidad física' },

  // Grupo D
  USA: { code: 'USA', name: 'Estados Unidos',  flag: '🇺🇸', color: '#1A3A6B', funFact: 'Anfitrión del mundial 2026.',        strength: 'Atletismo y juventud' },
  PAR: { code: 'PAR', name: 'Paraguay',        flag: '🇵🇾', color: '#D52B1E', funFact: 'Subcampeón Copa América 2011.',      strength: 'Garra guaraní' },
  AUS: { code: 'AUS', name: 'Australia',       flag: '🇦🇺', color: '#00843D', funFact: 'Los Socceroos del Pacífico.',        strength: 'Fortaleza física' },
  TUR: { code: 'TUR', name: 'Turquía',         flag: '🇹🇷', color: '#E30A17', funFact: 'Tercer lugar en Corea/Japón 2002.',  strength: 'Garra otomana' },

  // Grupo E
  GER: { code: 'GER', name: 'Alemania',        flag: '🇩🇪', color: '#2B2B2B', funFact: 'Cuatro veces campeona del mundo.',   strength: 'Disciplina táctica' },
  CUW: { code: 'CUW', name: 'Curazao',         flag: '🇨🇼', color: '#002B7F', funFact: 'La isla más pequeña en un mundial.',  strength: 'Sorpresa caribeña' },
  CIV: { code: 'CIV', name: 'Costa de Marfil', flag: '🇨🇮', color: '#FF8200', funFact: 'Campeona africana en 2024.',         strength: 'Poderío físico' },
  ECU: { code: 'ECU', name: 'Ecuador',         flag: '🇪🇨', color: '#FFCE00', funFact: 'La Tri sudamericana.',               strength: 'Altura y garra' },

  // Grupo F
  NED: { code: 'NED', name: 'Países Bajos',    flag: '🇳🇱', color: '#FF6C00', funFact: 'La naranja mecánica.',               strength: 'Fútbol total' },
  JPN: { code: 'JPN', name: 'Japón',           flag: '🇯🇵', color: '#BC002D', funFact: 'Venció a Alemania y España en 2022.', strength: 'Presión alta' },
  SWE: { code: 'SWE', name: 'Suecia',          flag: '🇸🇪', color: '#1F6FB2', funFact: 'Tercer lugar en USA 1994.',          strength: 'Orden nórdico' },
  TUN: { code: 'TUN', name: 'Túnez',           flag: '🇹🇳', color: '#E70013', funFact: 'Las águilas de Cartago.',            strength: 'Disciplina defensiva' },

  // Grupo G
  BEL: { code: 'BEL', name: 'Bélgica',         flag: '🇧🇪', color: '#E30613', funFact: 'La generación dorada.',              strength: 'Mediocampo creativo' },
  EGY: { code: 'EGY', name: 'Egipto',          flag: '🇪🇬', color: '#CE1126', funFact: 'Récord de 7 títulos africanos.',     strength: 'La magia de Salah' },
  IRN: { code: 'IRN', name: 'Irán',            flag: '🇮🇷', color: '#239F40', funFact: 'Team Melli, potencia asiática.',     strength: 'Solidez defensiva' },
  NZL: { code: 'NZL', name: 'Nueva Zelanda',   flag: '🇳🇿', color: '#1A3A6B', funFact: 'Los All Whites del Pacífico.',       strength: 'Juego aéreo' },

  // Grupo H
  ESP: { code: 'ESP', name: 'España',          flag: '🇪🇸', color: '#C60B1E', funFact: 'Campeona del mundo 2010.',           strength: 'Tiki-taka renovado' },
  CPV: { code: 'CPV', name: 'Cabo Verde',      flag: '🇨🇻', color: '#003893', funFact: 'Los tiburones azules debutan.',      strength: 'Sorpresa africana' },
  KSA: { code: 'KSA', name: 'Arabia Saudita',  flag: '🇸🇦', color: '#006C35', funFact: 'Venció a Argentina en 2022.',        strength: 'Velocidad y sorpresa' },
  URU: { code: 'URU', name: 'Uruguay',         flag: '🇺🇾', color: '#0E4C92', funFact: 'Dos veces campeona del mundo.',      strength: 'Garra charrúa' },

  // Grupo I
  FRA: { code: 'FRA', name: 'Francia',         flag: '🇫🇷', color: '#0055A4', funFact: 'Campeona del mundo 2018.',           strength: 'Ataque letal' },
  SEN: { code: 'SEN', name: 'Senegal',         flag: '🇸🇳', color: '#00853F', funFact: 'Campeona africana 2021.',            strength: 'Atletismo puro' },
  IRQ: { code: 'IRQ', name: 'Irak',            flag: '🇮🇶', color: '#CE1126', funFact: 'Campeón asiático en 2007.',          strength: 'Garra de los leones' },
  NOR: { code: 'NOR', name: 'Noruega',         flag: '🇳🇴', color: '#BA0C2F', funFact: 'Liderada por Erling Haaland.',       strength: 'Poder goleador' },

  // Grupo J
  ARG: { code: 'ARG', name: 'Argentina',       flag: '🇦🇷', color: '#6CA9DC', funFact: 'Campeona del mundo 2022.',           strength: 'La magia de Messi' },
  ALG: { code: 'ALG', name: 'Argelia',         flag: '🇩🇿', color: '#006233', funFact: 'Los zorros del desierto.',           strength: 'Talento técnico' },
  AUT: { code: 'AUT', name: 'Austria',         flag: '🇦🇹', color: '#ED2939', funFact: 'Presión al estilo alemán.',          strength: 'Intensidad física' },
  JOR: { code: 'JOR', name: 'Jordania',        flag: '🇯🇴', color: '#007A3D', funFact: 'Subcampeón asiático 2023.',          strength: 'Sorpresa árabe' },

  // Grupo K
  POR: { code: 'POR', name: 'Portugal',        flag: '🇵🇹', color: '#006600', funFact: 'Liderada por la estrella CR7.',      strength: 'Magia individual' },
  COD: { code: 'COD', name: 'RD Congo',        flag: '🇨🇩', color: '#007FFF', funFact: 'Los leopardos africanos.',           strength: 'Físico y velocidad' },
  UZB: { code: 'UZB', name: 'Uzbekistán',      flag: '🇺🇿', color: '#1EB53A', funFact: 'Debut mundialista histórico.',       strength: 'Bloque ordenado' },
  COL: { code: 'COL', name: 'Colombia',        flag: '🇨🇴', color: '#FCD116', funFact: 'Los cafeteros sudamericanos.',       strength: 'Talento ofensivo' },

  // Grupo L
  ENG: { code: 'ENG', name: 'Inglaterra',      flag: '🏴', color: '#1A3A6B', funFact: 'Cuna del fútbol moderno.',          strength: 'Plantilla profunda' },
  CRO: { code: 'CRO', name: 'Croacia',         flag: '🇭🇷', color: '#D52B1E', funFact: 'Subcampeona del mundo 2018.',        strength: 'La magia de Modric' },
  GHA: { code: 'GHA', name: 'Ghana',           flag: '🇬🇭', color: '#006B3F', funFact: 'Las estrellas negras de África.',    strength: 'Velocidad africana' },
  PAN: { code: 'PAN', name: 'Panamá',          flag: '🇵🇦', color: '#DA121A', funFact: 'La marea roja canalera.',            strength: 'Solidez defensiva' },
};

// Accent palette draws from the official FIFA World Cup 26 rainbow identity.
export const GROUPS = [
  { id: 'A', name: 'Grupo A', accent: '#E4002B', teams: ['MEX', 'RSA', 'KOR', 'CZE'] },
  { id: 'B', name: 'Grupo B', accent: '#FF6B00', teams: ['CAN', 'BIH', 'QAT', 'SUI'] },
  { id: 'C', name: 'Grupo C', accent: '#FFC400', teams: ['BRA', 'MAR', 'HAI', 'SCO'] },
  { id: 'D', name: 'Grupo D', accent: '#A3E635', teams: ['USA', 'PAR', 'AUS', 'TUR'] },
  { id: 'E', name: 'Grupo E', accent: '#22C55E', teams: ['GER', 'CUW', 'CIV', 'ECU'] },
  { id: 'F', name: 'Grupo F', accent: '#14B8A6', teams: ['NED', 'JPN', 'SWE', 'TUN'] },
  { id: 'G', name: 'Grupo G', accent: '#06B6D4', teams: ['BEL', 'EGY', 'IRN', 'NZL'] },
  { id: 'H', name: 'Grupo H', accent: '#3B82F6', teams: ['ESP', 'CPV', 'KSA', 'URU'] },
  { id: 'I', name: 'Grupo I', accent: '#6366F1', teams: ['FRA', 'SEN', 'IRQ', 'NOR'] },
  { id: 'J', name: 'Grupo J', accent: '#A855F7', teams: ['ARG', 'ALG', 'AUT', 'JOR'] },
  { id: 'K', name: 'Grupo K', accent: '#D6409F', teams: ['POR', 'COD', 'UZB', 'COL'] },
  { id: 'L', name: 'Grupo L', accent: '#EC4899', teams: ['ENG', 'CRO', 'GHA', 'PAN'] },
];

// FIFA code → ISO 3166-1 (flagcdn). Subdivisions for the home nations.
export const FLAG_ISO = {
  MEX: 'mx', RSA: 'za', KOR: 'kr', CZE: 'cz',
  CAN: 'ca', BIH: 'ba', QAT: 'qa', SUI: 'ch',
  BRA: 'br', MAR: 'ma', HAI: 'ht', SCO: 'gb-sct',
  USA: 'us', PAR: 'py', AUS: 'au', TUR: 'tr',
  GER: 'de', CUW: 'cw', CIV: 'ci', ECU: 'ec',
  NED: 'nl', JPN: 'jp', SWE: 'se', TUN: 'tn',
  BEL: 'be', EGY: 'eg', IRN: 'ir', NZL: 'nz',
  ESP: 'es', CPV: 'cv', KSA: 'sa', URU: 'uy',
  FRA: 'fr', SEN: 'sn', IRQ: 'iq', NOR: 'no',
  ARG: 'ar', ALG: 'dz', AUT: 'at', JOR: 'jo',
  POR: 'pt', COD: 'cd', UZB: 'uz', COL: 'co',
  ENG: 'gb-eng', CRO: 'hr', GHA: 'gh', PAN: 'pa',
};

export const flagUrl = (code) => (FLAG_ISO[code] ? `https://flagcdn.com/${FLAG_ISO[code]}.svg` : null);

export const getGroupTeams = (group) => group.teams.map((code) => TEAMS[code]);
