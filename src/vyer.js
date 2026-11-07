// Fasta kameraplatser for granskning.
//
// Verifieringen tar en skarmbild fran varje plats, sa att samma vinklar
// gar att jamfora mellan olika versioner. Oppna spelet med ?vy=salen for
// att se en av dem i webblasaren. plan: 1 betyder att vyn visar plan 1.
//
// Koordinaterna galler Oskarshamns stadsbibliotek.

export const VYER = {
  oversikt: {
    beskrivning: "Hela biblioteket snett uppifran, fran soder",
    position: [19.7, 52, 74],
    mot: [19.7, 0, 25]
  },
  uppifran: {
    beskrivning: "Hela biblioteket rakt uppifran, som kartan",
    position: [19.7, 70, 26.5],
    mot: [19.7, 0, 26]
  },
  vasterut: {
    beskrivning: "Vastra delen av salen rakt uppifran: barnavdelningen, borden och Demokratitorget",
    position: [7.0, 24.0, 15.01],
    mot: [7.0, 0, 15.0]
  },
  start: {
    beskrivning: "Dar figuren borjar, framfor informationsdisken",
    position: [11.0, 3.2, 49.2],
    mot: [19.0, 0.8, 46.5]
  },
  entre: {
    beskrivning: "Innanfor entren, blickar mot informationsdisken",
    position: [5.0, 2.2, 50.6],
    mot: [17.0, 1.0, 45.0]
  },
  infodisk: {
    beskrivning: "Informationsdisken och spiraltrappan",
    position: [13.0, 3.0, 50.8],
    mot: [19.5, 0.8, 42.0]
  },
  gangen: {
    beskrivning: "Gangen norrut fran informationsdisken, forbi Du ar har",
    position: [15.6, 2.2, 46.0],
    mot: [14.8, 1.0, 32.0]
  },
  lana: {
    beskrivning: "Lana och lamna, Poesi och den sneda vaggen",
    position: [14.5, 3.0, 36.0],
    mot: [22.5, 0.8, 27.0]
  },
  studierum: {
    beskrivning: "Studierummen snett uppifran",
    position: [25.0, 7.0, 32.1],
    mot: [29.5, 0.0, 32.5]
  },
  salen: {
    beskrivning: "Stora salen fran Demokratitorget, blickar mot nordost",
    position: [10.0, 4.0, 25.4],
    mot: [22.9, 0.5, 9.3]
  },
  barn: {
    beskrivning: "Barnavdelningen, blickar mot blomman i nordvast",
    position: [12.5, 2.6, 18.0],
    mot: [4.0, 0.8, 4.0]
  },
  hanget: {
    beskrivning: "Hanget och Grattan fran vaster",
    position: [14.9, 5.5, 16.3],
    mot: [19.45, 0.5, 10.0]
  },
  storstil: {
    beskrivning: "Storstil och entre meroppet",
    position: [21.2, 3.0, 5.5],
    mot: [21.0, 0.8, 0.0]
  },
  fakta: {
    beskrivning: "Mellan faktahyllorna, blickar norrut",
    position: [33.1, 1.8, 17.3],
    mot: [33.1, 1.0, 3.0]
  },
  romaner: {
    beskrivning: "Romaner och spanning i sydost",
    position: [28.5, 2.6, 26.5],
    mot: [38.0, 0.8, 19.0]
  },
  meroppet: {
    beskrivning: "Entre meroppet med lanautomaten",
    position: [15.25, 2.6, 5.8],
    mot: [15.25, 1.0, 0.5]
  },
  scenen: {
    beskrivning: "Scenen pa Demokratitorget, stolraderna och blomstallningarna, fran nordost",
    position: [12.0, 4.4, 17.0],
    mot: [6.5, 0.6, 24.0]
  },
  bordsgruppen: {
    beskrivning: "Borden, soffan och den laga vaggen vid vastra fonstret",
    position: [8.5, 4.0, 22.0],
    mot: [1.2, 0.6, 16.5]
  },
  lovridan: {
    beskrivning: "Lovridan och de utfallbara vaggarna, sedda fran oster",
    position: [13.8, 3.0, 26.2],
    mot: [5.0, 1.2, 24.8]
  },
  barnscen: {
    beskrivning: "Den lilla scenen med tva steg i barnavdelningen",
    position: [9.8, 2.8, 7.6],
    mot: [6.8, 0.4, 3.0]
  },
  nodutgang: {
    beskrivning: "Nodutgangen i norra vaggen vid faktabockerna",
    position: [26.8, 2.6, 4.6],
    mot: [30.6, 1.0, 0.8]
  },
  kulturradet: {
    beskrivning: "Glasvaggarna och Kulturradets hylla vid Spanning",
    position: [22.0, 3.0, 22.0],
    mot: [27.5, 0.8, 26.0]
  },
  datorbas: {
    beskrivning: "Datorbasen bakom scenen, blickar vasterut",
    position: [10.4, 2.6, 27.9],
    mot: [3.0, 0.6, 27.9]
  },
  skogen: {
    beskrivning: "Lilla skogen i barnavdelningens nordvastra horn",
    position: [6.8, 3.4, 8.5],
    mot: [2.0, 1.2, 1.5]
  },
  mangsprak: {
    beskrivning: "Mangsprak for barn och unga och hyllskyltarna i barnavdelningen",
    position: [11.5, 3.2, 20.5],
    mot: [5.0, 0.8, 14.0]
  },
  anslagstavla: {
    beskrivning: "Anslagstavlan i korridoren, narmast Poesi",
    position: [14.4, 2.0, 39.0],
    mot: [16.4, 1.3, 35.4]
  },
  automater: {
    beskrivning: "Automaterna rygg mot rygg och aterlamningsvagnen",
    position: [17.0, 3.0, 29.5],
    mot: [20.0, 0.6, 25.5]
  },
  nyheter: {
    beskrivning: "Nyhetshyllan mellan blomkrukorna vid Oskarshamnssamlingen",
    position: [21.0, 2.4, 26.0],
    mot: [21.0, 0.8, 30.5]
  },
  sokstation: {
    beskrivning: "Sokstationen vid pelaren, sedd fran Utskrift",
    position: [12.6, 2.4, 27.4],
    mot: [13.3, 1.0, 23.4]
  },
  skylt: {
    beskrivning: "Skyltarna over Hanget och Grattan pa nara hall",
    position: [16.0, 5.0, 22.0],
    mot: [19.0, 2.4, 16.0]
  }
};
