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
  utanfor: {
    beskrivning: "Utanfor entren, blickar in genom dorrarna",
    position: [-2.5, 5.5, 49.5],
    mot: [8.0, 0.5, 47.0]
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
    beskrivning: "Entre meroppet med snurrhyllan och sokstationen",
    position: [15.25, 2.6, 5.8],
    mot: [15.25, 1.0, 0.5]
  },
  skylt: {
    beskrivning: "Skyltarna over Hanget och Grattan pa nara hall",
    position: [16.0, 5.0, 22.0],
    mot: [19.0, 2.4, 16.0]
  }
};
