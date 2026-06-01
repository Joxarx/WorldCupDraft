// World Cup 2026 - Group structure with team metadata.
// 12 groups (A-L), 4 teams each = 48 teams (real 2026 format).
// Flags are emoji (works everywhere). Each team has a fun fact + strength
// surfaced during the draw animation.

export const TEAMS = {
  // Grupo A
  MEX: { code: 'MEX', name: 'Mexico',          flag: '🇲🇽', color: '#006847', funFact: 'Anfitrion del mundial 1970, 1986 y 2026.', strength: 'Local + aficion masiva' },
  RSA: { code: 'RSA', name: 'Sudafrica',       flag: '🇿🇦', color: '#007A4D', funFact: 'Campeona africana en 1996.',          strength: 'Ritmo y velocidad' },
  KOR: { code: 'KOR', name: 'Corea del Sur',   flag: '🇰🇷', color: '#CD2E3A', funFact: 'Semifinalista en 2002.',             strength: 'Presion incansable' },
  CZE: { code: 'CZE', name: 'Republica Checa', flag: '🇨🇿', color: '#11457E', funFact: 'Subcampeona de la Euro 1996.',       strength: 'Disciplina europea' },

  // Grupo B
  CAN: { code: 'CAN', name: 'Canada',          flag: '🇨🇦', color: '#FF0000', funFact: 'Anfitrion del mundial 2026.',        strength: 'Energia local' },
  BIH: { code: 'BIH', name: 'Bosnia',          flag: '🇧🇦', color: '#002395', funFact: 'Los dragones de los Balcanes.',      strength: 'Ataque potente' },
  QAT: { code: 'QAT', name: 'Qatar',           flag: '🇶🇦', color: '#8A1538', funFact: 'Campeon asiatico 2019 y 2023.',      strength: 'Bloque solido' },
  SUI: { code: 'SUI', name: 'Suiza',           flag: '🇨🇭', color: '#FF0000', funFact: 'La nati siempre en octavos.',        strength: 'Orden tactico' },

  // Grupo C
  BRA: { code: 'BRA', name: 'Brasil',          flag: '🇧🇷', color: '#009C3B', funFact: 'Cinco veces campeona del mundo.',    strength: 'Talento ofensivo' },
  MAR: { code: 'MAR', name: 'Marruecos',       flag: '🇲🇦', color: '#C1272D', funFact: 'Semifinalista en Qatar 2022.',       strength: 'Defensa de hierro' },
  HAI: { code: 'HAI', name: 'Haiti',           flag: '🇭🇹', color: '#00209F', funFact: 'Vuelve a un mundial tras 1974.',     strength: 'Talento caribeno' },
  SCO: { code: 'SCO', name: 'Escocia',         flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: '#005EB8', funFact: 'La Tartan Army imparable.',         strength: 'Intensidad fisica' },

  // Grupo D
  USA: { code: 'USA', name: 'Estados Unidos',  flag: '🇺🇸', color: '#0A3161', funFact: 'Anfitrion del mundial 2026.',        strength: 'Atletismo y juventud' },
  PAR: { code: 'PAR', name: 'Paraguay',        flag: '🇵🇾', color: '#D52B1E', funFact: 'Subcampeon Copa America 2011.',      strength: 'Garra guarani' },
  AUS: { code: 'AUS', name: 'Australia',       flag: '🇦🇺', color: '#00843D', funFact: 'Los Socceroos del Pacifico.',        strength: 'Fortaleza fisica' },
  TUR: { code: 'TUR', name: 'Turquia',         flag: '🇹🇷', color: '#E30A17', funFact: 'Tercer lugar en Corea/Japon 2002.',  strength: 'Garra otomana' },

  // Grupo E
  GER: { code: 'GER', name: 'Alemania',        flag: '🇩🇪', color: '#000000', funFact: 'Cuatro veces campeona del mundo.',   strength: 'Disciplina tactica' },
  CUW: { code: 'CUW', name: 'Curazao',         flag: '🇨🇼', color: '#002B7F', funFact: 'La isla mas pequena en un mundial.',  strength: 'Sorpresa caribena' },
  CIV: { code: 'CIV', name: 'Costa de Marfil', flag: '🇨🇮', color: '#FF8200', funFact: 'Campeona africana en 2024.',         strength: 'Poderio fisico' },
  ECU: { code: 'ECU', name: 'Ecuador',         flag: '🇪🇨', color: '#FFD100', funFact: 'La Tri sudamericana.',               strength: 'Altura y garra' },

  // Grupo F
  NED: { code: 'NED', name: 'Paises Bajos',    flag: '🇳🇱', color: '#FF6C00', funFact: 'La naranja mecanica.',               strength: 'Futbol total' },
  JPN: { code: 'JPN', name: 'Japon',           flag: '🇯🇵', color: '#BC002D', funFact: 'Vencio a Alemania y Espana en 2022.', strength: 'Presion alta' },
  SWE: { code: 'SWE', name: 'Suecia',          flag: '🇸🇪', color: '#FECC02', funFact: 'Tercer lugar en USA 1994.',          strength: 'Orden nordico' },
  TUN: { code: 'TUN', name: 'Tunez',           flag: '🇹🇳', color: '#E70013', funFact: 'Las aguilas de Cartago.',            strength: 'Disciplina defensiva' },

  // Grupo G
  BEL: { code: 'BEL', name: 'Belgica',         flag: '🇧🇪', color: '#E30613', funFact: 'La generacion dorada.',              strength: 'Mediocampo creativo' },
  EGY: { code: 'EGY', name: 'Egipto',          flag: '🇪🇬', color: '#CE1126', funFact: 'Record de 7 titulos africanos.',     strength: 'La magia de Salah' },
  IRN: { code: 'IRN', name: 'Iran',            flag: '🇮🇷', color: '#239F40', funFact: 'Team Melli, potencia asiatica.',     strength: 'Solidez defensiva' },
  NZL: { code: 'NZL', name: 'Nueva Zelanda',   flag: '🇳🇿', color: '#012169', funFact: 'Los All Whites del Pacifico.',       strength: 'Juego aereo' },

  // Grupo H
  ESP: { code: 'ESP', name: 'Espana',          flag: '🇪🇸', color: '#AA151B', funFact: 'Campeona del mundo 2010.',           strength: 'Tiki-taka renovado' },
  CPV: { code: 'CPV', name: 'Cabo Verde',      flag: '🇨🇻', color: '#003893', funFact: 'Los tiburones azules debutan.',      strength: 'Sorpresa africana' },
  KSA: { code: 'KSA', name: 'Arabia Saudita',  flag: '🇸🇦', color: '#006C35', funFact: 'Vencio a Argentina en 2022.',        strength: 'Velocidad y sorpresa' },
  URU: { code: 'URU', name: 'Uruguay',         flag: '🇺🇾', color: '#0038A8', funFact: 'Dos veces campeona del mundo.',      strength: 'Garra charrua' },

  // Grupo I
  FRA: { code: 'FRA', name: 'Francia',         flag: '🇫🇷', color: '#0055A4', funFact: 'Campeona del mundo 2018.',           strength: 'Ataque letal' },
  SEN: { code: 'SEN', name: 'Senegal',         flag: '🇸🇳', color: '#00853F', funFact: 'Campeona africana 2021.',            strength: 'Atletismo puro' },
  IRQ: { code: 'IRQ', name: 'Irak',            flag: '🇮🇶', color: '#CE1126', funFact: 'Campeon asiatico en 2007.',          strength: 'Garra de los leones' },
  NOR: { code: 'NOR', name: 'Noruega',         flag: '🇳🇴', color: '#BA0C2F', funFact: 'Liderada por Erling Haaland.',       strength: 'Poder goleador' },

  // Grupo J
  ARG: { code: 'ARG', name: 'Argentina',       flag: '🇦🇷', color: '#74ACDF', funFact: 'Campeona del mundo 2022.',           strength: 'La magia de Messi' },
  ALG: { code: 'ALG', name: 'Argelia',         flag: '🇩🇿', color: '#006233', funFact: 'Los zorros del desierto.',           strength: 'Talento tecnico' },
  AUT: { code: 'AUT', name: 'Austria',         flag: '🇦🇹', color: '#ED2939', funFact: 'Presion al estilo aleman.',          strength: 'Intensidad fisica' },
  JOR: { code: 'JOR', name: 'Jordania',        flag: '🇯🇴', color: '#007A3D', funFact: 'Subcampeon asiatico 2023.',          strength: 'Sorpresa arabe' },

  // Grupo K
  POR: { code: 'POR', name: 'Portugal',        flag: '🇵🇹', color: '#006600', funFact: 'Liderada por la estrella CR7.',      strength: 'Magia individual' },
  COD: { code: 'COD', name: 'RD Congo',        flag: '🇨🇩', color: '#007FFF', funFact: 'Los leopardos africanos.',           strength: 'Fisico y velocidad' },
  UZB: { code: 'UZB', name: 'Uzbekistan',      flag: '🇺🇿', color: '#1EB53A', funFact: 'Debut mundialista historico.',       strength: 'Bloque ordenado' },
  COL: { code: 'COL', name: 'Colombia',        flag: '🇨🇴', color: '#FCD116', funFact: 'Los cafeteros sudamericanos.',       strength: 'Talento ofensivo' },

  // Grupo L
  ENG: { code: 'ENG', name: 'Inglaterra',      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#CF142B', funFact: 'Cuna del futbol moderno.',          strength: 'Plantilla profunda' },
  CRO: { code: 'CRO', name: 'Croacia',         flag: '🇭🇷', color: '#FF0000', funFact: 'Subcampeona del mundo 2018.',        strength: 'La magia de Modric' },
  GHA: { code: 'GHA', name: 'Ghana',           flag: '🇬🇭', color: '#006B3F', funFact: 'Las estrellas negras de Africa.',    strength: 'Velocidad africana' },
  PAN: { code: 'PAN', name: 'Panama',          flag: '🇵🇦', color: '#DA121A', funFact: 'La marea roja canalera.',            strength: 'Solidez defensiva' },
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

export const getGroupTeams = (group) => group.teams.map((code) => TEAMS[code]);
