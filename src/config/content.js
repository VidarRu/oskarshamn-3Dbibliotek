// =====================================================================
//  INNEHÅLL – här ändrar du texter utan att röra resten av koden.
// =====================================================================
//
//  Så här gör du:
//   * Ändra text mellan citattecknen "...". Behåll citattecknen.
//   * Behåll kommatecknen i slutet av raderna.
//   * Rör inte "id". Det kopplar platsen till kartan.
//   * avdelning: true  = räknas som avdelning i minispelet
//     avdelning: false = övrig plats, syns i listan men räknas inte
//   * plan: 1 = platsen ligger på plan 1. Utan plan ligger den på plan 0.
//     Platsen måste också finnas i den våningens kartfil. Oskarshamn har
//     bara plan 0.
//   * Ordningen här är ordningen i listan på sidan.
//   * farg är zonens färg på golvet och kanten på skylten, skriven som
//     en färgkod. Håll dig till lugna nyanser: salvia, oliv, beige och tegelrött.
//     Starka färger gör kartan plottrig.
//
//  Spara filen och ladda om sidan för att se ändringen.
// =====================================================================

export const SIDA = {
  titel: "Oskarshamns stadsbibliotek",
  framme: "Du är framme vid {namn}",
  visarVag: "Följ prickarna till {namn}",
  stangHjalp: "Tryck Esc för att sluta visa vägen",
  oppettiderRubrik: "Öppettider",
  kontaktRubrik: "Kontakt",
  infoNamn: "Info: {namn}",
  stangKort: "Stäng",
  lasUpp: "Läs upp",
  slutaLasa: "Sluta läsa",

  // Våningar. Oskarshamn har bara en våning i kartan, men texterna
  // behövs om en våning till läggs till.
  nuPaPlan: "Du är på plan {plan}",
  vaningUpp: "Upp till plan {plan}",
  vaningNer: "Ner till plan {plan}",
  visarVagAnnanVaning: "{namn} finns på plan {plan}",
  visarVagAnnanUnder: "Följ prickarna till trappan."
};

// Kartfilerna i src/data, en per våning. Den första är entréplanet, där
// figuren börjar. Varje kartfil har sitt våningsnummer i "meta": { "plan": … }.
export const KARTOR = ["layout.json"];

export const PLATSER = [
  // ---------------------------------------------------- avdelningar
  {
    id: "informationsdisk",
    namn: "Informationsdisken",
    beskrivning: "Här kan du fråga personalen om allt.",
    avdelning: true,
    farg: "#a88b6a"
  },
  {
    id: "lana_lamna",
    namn: "Låna och lämna",
    beskrivning: "Automater där du lånar och lämnar tillbaka själv.",
    avdelning: true,
    farg: "#8c7a62"
  },
  {
    id: "barnavdelning",
    namn: "Barnavdelningen",
    beskrivning: "Bilderböcker, barnböcker och en blomma att sitta i.",
    avdelning: true,
    farg: "#b9a684"
  },
  {
    id: "hanget",
    namn: "Hänget",
    beskrivning: "Ungdomsavdelningen. Böcker, ett bord och en soffa för dig som är ung.",
    avdelning: true,
    farg: "#7f8a66"
  },
  {
    id: "faktabocker",
    namn: "Faktaböcker",
    beskrivning: "Böcker om allt mellan himmel och jord.",
    avdelning: true,
    farg: "#8f948a"
  },
  {
    id: "romaner",
    namn: "Romaner",
    beskrivning: "Skönlitteratur för vuxna.",
    avdelning: true,
    farg: "#6f8a6a"
  },
  {
    id: "storstil",
    namn: "Storstil, DAISY och lättläst",
    beskrivning: "Böcker med stor text, talböcker och lättlästa böcker.",
    avdelning: true,
    farg: "#a3a08f"
  },
  {
    id: "ljudbocker",
    namn: "Ljudböcker, filmer och musik",
    beskrivning: "Böcker att lyssna på, filmer och musik.",
    avdelning: true,
    farg: "#93876f"
  },
  {
    id: "biografier",
    namn: "Biografier",
    beskrivning: "Berättelser om verkliga människors liv.",
    avdelning: true,
    farg: "#9c9281"
  },
  {
    id: "poesi",
    namn: "Poesi",
    beskrivning: "Dikter och lyrik.",
    avdelning: true,
    farg: "#b07a62"
  },
  {
    id: "oskarshamnssamlingen",
    namn: "Oskarshamnssamlingen",
    beskrivning: "Böcker om Oskarshamn och trakten runt omkring.",
    avdelning: true,
    farg: "#a46e58"
  },
  {
    id: "dagstidningar",
    namn: "Dagstidningar",
    beskrivning: "Dagens tidningar och bord att läsa vid.",
    avdelning: true,
    farg: "#a39279"
  },
  {
    id: "demokratitorget",
    namn: "Demokratitorget",
    beskrivning: "Information om samhället, och soffor att sitta i.",
    avdelning: true,
    farg: "#9a9890"
  },

  // ------------------------------------------------- övriga platser
  {
    id: "utanfor",
    namn: "Utanför entrén",
    beskrivning: "Här börjar du.",
    avdelning: false,
    farg: "#c9c1ae"
  },
  {
    id: "entre",
    namn: "Entré",
    beskrivning: "Här kommer du in.",
    avdelning: false,
    farg: "#c9c1ae"
  },
  {
    id: "meroppet",
    namn: "Entré meröppet",
    beskrivning: "Här kommer du in när biblioteket har meröppet.",
    avdelning: false,
    farg: "#b3aa95"
  },
  {
    id: "karta",
    namn: "Du är här",
    beskrivning: "Här sitter orienteringskartan över biblioteket.",
    avdelning: false,
    farg: "#b07a62"
  },
  {
    id: "toaletter",
    namn: "Toalett",
    beskrivning: "Toaletten vid entrén.",
    avdelning: false,
    farg: "#b1ab94"
  },
  {
    id: "toalett_mitt",
    namn: "Toalett",
    beskrivning: "Toaletten mitt i biblioteket, intill Gråttan.",
    avdelning: false,
    farg: "#b1ab94"
  },
  {
    id: "reservationer",
    namn: "Reserverade böcker",
    beskrivning: "Här hämtar du det du har reserverat.",
    avdelning: false,
    farg: "#8c7a62"
  },
  {
    id: "utskrift",
    namn: "Utskrift och kopiering",
    beskrivning: "Här skriver du ut och kopierar.",
    avdelning: false,
    farg: "#857c70"
  },
  {
    id: "datorer",
    namn: "Datorer",
    beskrivning: "Datorer som alla får använda.",
    avdelning: false,
    farg: "#7d7a72"
  },
  {
    id: "tidskrifter",
    namn: "Tidskrifter",
    beskrivning: "Tidningar som kommer ut varje vecka eller månad.",
    avdelning: false,
    farg: "#a39279"
  },
  {
    id: "grattan",
    namn: "Gråttan",
    beskrivning: "Ett litet rum med egen dörr.",
    avdelning: false,
    farg: "#7f8a66"
  },
  {
    id: "andra_sprak",
    namn: "Böcker på andra språk",
    beskrivning: "Böcker på många olika språk.",
    avdelning: false,
    farg: "#9c9281"
  },
  {
    id: "spanning",
    namn: "Spänning",
    beskrivning: "Deckare och thrillers.",
    avdelning: false,
    farg: "#6f7d68"
  },
  {
    id: "serier",
    namn: "Tecknade serier",
    beskrivning: "Serieböcker och grafiska romaner.",
    avdelning: false,
    farg: "#a88b6a"
  },
  {
    id: "studierum1",
    namn: "Studierum 1",
    beskrivning: "Ett rum med ett bord för fyra, där du kan plugga i lugn och ro.",
    avdelning: false,
    farg: "#8f948a"
  },
  {
    id: "studierum2",
    namn: "Studierum 2",
    beskrivning: "Ett rum med fyra skrivbord, där du kan plugga i lugn och ro.",
    avdelning: false,
    farg: "#8f948a"
  }
];

// =====================================================================
//  ÖPPETTIDER OCH KONTAKT
// =====================================================================
//
//  Hämtat från bibliotekets webbplats (via en sökning) den 23 oktober
//  2026. Skriv "Stängt" för dagar då biblioteket är stängt.
//  Ordningen är måndag först, söndag sist. Tiderna är när det finns
//  personal. Meröppet står i avvikelser nedan.
//  Telefon och e-post saknas än. Tomma uppgifter visas inte.

export const OPPETTIDER = [
  { dag: "Måndag",  tid: "Stängt" },
  { dag: "Tisdag",  tid: "10–18" },
  { dag: "Onsdag",  tid: "10–18" },
  { dag: "Torsdag", tid: "10–18" },
  { dag: "Fredag",  tid: "10–18" },
  { dag: "Lördag",  tid: "10–14" },
  { dag: "Söndag",  tid: "10–14" }
];

export const KONTAKT = {
  namn:     "Oskarshamns stadsbibliotek",
  adress:   "Kulturhuset, Hantverksgatan 18–20, 572 28 Oskarshamn",
  telefon:  "",
  epost:    "",
  hemsida:  "bibliotek.oskarshamn.se",
  avvikelser: "Meröppet varje dag 7–22 för dig som har fyllt 18 och har ett meröppetkort med pinkod. Avvikelser kan förekomma, till exempel vid helger. Se hemsidan."
};

// =====================================================================
//  INFOPUNKTER – runda plattor på golvet i spelet.
// =====================================================================
//
//  "id" kopplar texten till plattans plats i kartan. Rör inte id.
//  Varje rad i "rader" blir ett eget stycke på infokortet.
//  visaOppettider: true lägger in hela veckans öppettider och kontakt.

export const INFOPUNKTER = [
  {
    id: "info_entre",
    rubrik: "Välkommen!",
    rader: ["Välkommen till Oskarshamns stadsbibliotek i Kulturhuset."],
    visaOppettider: true
  },
  {
    id: "info_karta",
    rubrik: "Du är här",
    rader: [
      "Här sitter en karta över biblioteket på väggen.",
      "Rakt fram norrut kommer du till Låna och lämna och den stora salen."
    ]
  },
  {
    id: "info_disk",
    rubrik: "Bibliotekskort och lån",
    rader: [
      "För att låna behöver du ett bibliotekskort. Ta med legitimation, så hjälper personalen dig här vid informationsdisken.",
      "Är boken utlånad kan du reservera den. Du hämtar den sedan i hyllan för reserverade böcker."
    ]
  },
  {
    id: "info_automater",
    rubrik: "Låna och lämna själv",
    rader: [
      "Här lånar och lämnar du tillbaka själv, med ditt bibliotekskort."
    ]
  },
  {
    id: "info_barn",
    rubrik: "För barn och föräldrar",
    rader: [
      "Här finns bilderböcker, barnböcker och böcker på andra språk.",
      "I hörnet i nordväst finns en stor blomma att sitta i."
    ]
  },
  {
    id: "info_meroppet",
    rubrik: "Meröppet",
    rader: [
      "Biblioteket har meröppet varje dag mellan 7 och 22. Då finns det ingen personal.",
      "För att komma in behöver du ha fyllt 18 år, vara låntagare i Oskarshamns kommun och ha en pinkod kopplad till ditt bibliotekskort."
    ]
  }
];

// =====================================================================
//  RUTOR – instruktionen och de små frågorna
// =====================================================================
//
//  Alla rutor dyker upp på samma ställe, längst ner i mitten.
//  Mellanslag betyder alltid Ja och Esc betyder alltid Nej eller Stäng.
//  Varje rad i "rader" blir ett eget stycke i instruktionen.

export const RUTOR = {
  instruktionRubrik: "Så går du runt i biblioteket",
  instruktionRader: [
    "Pilarna ↑ och ↓ går framåt och bakåt. Pilarna ← och → vrider figuren.",
    "Står du på en i-platta får du frågan om du vill veta vad platsen är. Du kan också klicka på i-bubblan.",
    "Vid entrédörrarna får du välja vad du vill göra. Gula prickar visar sedan vägen. Gå ut till dörrarna igen för att välja något annat.",
    "I Hänget finns två små spel, om du vill prova.",
    "Tryck på ? eller H för att se det här igen."
  ],
  forstar:      "Jag förstår",
  visaHjalp:    "Visa instruktionerna",
  ja:           "Ja",
  nej:          "Nej",
  infoFraga:    "Vill du veta vad det här är?",

  // Spelen. spelPlats är id för platsen där spelen startar. Skriv null
  // om biblioteket inte ska ha spelen, och ta då bort raden om spelen i
  // instruktionRader ovan.
  spelPlats:    "hanget",
  labbFraga:    "Vill du utmana dig själv lite grann?",
  labbUnder:    "Här i Hänget kan du prova ett litet spel.",
  valjSpel:     "Vilket spel vill du prova?",
  ingetSpel:    "Inget spel",
  avsluta:      "Avsluta spelet",
  spelSlut:     "Spelet är avslutat"
};

// =====================================================================
//  BEHOV – hjulet vid entrédörrarna
// =====================================================================
//
//  När figuren kommer fram till entrédörrarna dyker ett hjul upp.
//  Pilarna ← och → vrider hjulet och Enter väljer. Sedan leder gula
//  prickar till platsen.
//
//   * text   = det som står i hjulet
//   * mal    = id för platsen prickarna leder till (se PLATSER ovan)
//   * framme = det som står när man har kommit fram
//   * Ett val utan mal stänger bara hjulet.
//   * Ordningen här är ordningen i hjulet. Det första valet står i mitten
//     när hjulet öppnas.

export const BEHOV = {
  rubrik:    "Vad vill du göra i dag?",
  under:     "Välj med ← och →. Tryck Enter för att få vägen visad.",
  stang:     "Stäng",
  valj:      "Visa vägen",
  prickfarg: "#e3b230",       // de gula prickarna
  visarVag:  "Följ de gula prickarna",
  visarVagUnder: "Till {namn}. Tryck Esc för att sluta visa vägen.",
  visarVagAnnanVaning: "{namn} finns på plan {plan}. Följ prickarna till trappan.",

  val: [
    { text: "Hitta en bok",            mal: "informationsdisk",
      framme: "Vid informationsdisken hjälper personalen dig att hitta rätt bok." },
    { text: "Låna eller lämna böcker", mal: "lana_lamna",
      framme: "Här lånar och lämnar du själv, med ditt bibliotekskort." },
    { text: "Hämta reserverad bok",    mal: "reservationer",
      framme: "Här i hyllan hämtar du det du har reserverat." },
    { text: "Gå på toaletten",         mal: "toaletter",
      framme: "Här är toaletten. Det finns en till mitt i biblioteket, intill Gråttan." },
    { text: "Sitta och plugga",        mal: "studierum1",
      framme: "I studierummen kan du sitta i lugn och ro och plugga." },
    { text: "Göra en utskrift",        mal: "utskrift",
      framme: "Här skriver du ut och kopierar." },
    { text: "Låna en dator",           mal: "datorer",
      framme: "Här finns datorer som alla får använda." },
    { text: "Hitta barnböcker",        mal: "barnavdelning",
      framme: "Här är barnavdelningen, med bilderböcker och barnböcker." },
    { text: "Sitta och hänga",         mal: "hanget",
      framme: "Hänget är till för dig som är ung. Slå dig ner!" },
    { text: "Sitta ner en stund",      mal: "demokratitorget",
      framme: "Här på Demokratitorget kan du sitta ner en stund." },
    { text: "Läsa en tidning",         mal: "dagstidningar",
      framme: "Här finns dagens tidningar. Tidskrifterna står en bit bort åt öster." },
    { text: "Bara titta runt",         mal: null }
  ]
};

// =====================================================================
//  MOBIL – menyn i stället för styrning, på mobil och surfplatta
// =====================================================================
//
//  På en pekskärm går det inte att styra figuren med pilar. Där kommer
//  i stället en meny med samma val som hjulet vid entrén (BEHOV.val
//  ovan, utom valen utan mal). Trycker man på ett val går figuren dit
//  av sig själv, firar när den är framme och går sedan tillbaka till
//  start, så att man kan välja något nytt.
//
//  Överst i menyn finns en bred knapp, "Jag vill utforska själv". Då
//  fälls menyn ner till en smal list, och figuren går dit man trycker
//  på golvet. "Meny" i listen fäller upp menyn igen.
//
//  Vill man prova menyn på en dator: lägg till ?lage=mobil i adressen.
//  ?lage=dator ger styrningen med pilar även på en pekskärm.

export const MOBIL = {
  rubrik:      "Vad vill du göra i dag?",
  utforska:    "Jag vill utforska själv",
  utforskaUnder: "Tryck på golvet dit du vill gå",
  under:       "Eller välj en plats, så går figuren dit och visar vägen.",
  utforskaRubrik: "Tryck på golvet dit du vill gå",
  utforskaRad: "Tryck på en plats på golvet, så går figuren dit.",
  visaMeny:    "Meny",
  paVag:       "På väg till {namn}",
  paVagUnder:  "Följ figuren och de gula prickarna.",
  paVagAnnanVaning: "{namn} finns på plan {plan}. Figuren tar sig upp dit.",
  avbryt:      "Avbryt",
  framme:      "Du är framme vid {namn}!",
  igen:        "Välj något nytt",
  vantetid:    8,          // sekunder innan figuren går tillbaka till start
  fart:        4.2         // meter i sekunden när figuren går själv
};

// =====================================================================
//  MINISPEL – "Biblioteksorientering", startas i Hänget
// =====================================================================
//
//  Alla platser med avdelning: true räknas. {namn}, {antal} och
//  {totalt} byts mot rätt ord och siffror när texten visas.

export const MINISPEL = {
  namn:          "Biblioteksorientering",
  forklaring:    "Gå till alla avdelningar i biblioteket.",
  rubrik:        "Biblioteksorientering",
  rakning:       "{antal} av {totalt}",
  hittade:       "Du hittade {namn}",
  hittadeUnder:  "{antal} av {totalt} avdelningar",
  hittadMarke:   "Hittad!",
  grattisRubrik: "Bra gjort!",
  grattisText:   "Du har hittat alla {totalt} avdelningar. Nu hittar du rätt när du kommer till biblioteket på riktigt!",
  spelaIgen:     "Spela igen",
  fortsatt:      "Avsluta spelet"
};

// =====================================================================
//  BOKJAKT – samla böcker och undvik låntagare, startas i Hänget
// =====================================================================

export const BOKJAKT = {
  antalBocker:    20,
  poangPerBok:    10,
  tappVidKrock:   3,      // så många böcker tappar man vid krock
  antalLantagare: 4,      // högst så många som det finns banor i kartan
  lantagarFart:   1.4,    // meter per sekund (spelaren går 3,2)

  namn:           "Bokjakten",
  rakning:        "{bocker} böcker · {poang} poäng",
  rakningEn:      "1 bok · {poang} poäng",
  allaSamlade:    "Alla böcker samlade!",
  allaUnder:      "Nya böcker dyker snart upp.",
  krock:          "Du tappade {antal} böcker",
  krockUtan:      "Akta låntagarna",
  forklaring:     "Samla böcker och undvik låntagarna. Krockar du tappar du några böcker."
};

// =====================================================================
//  TEMA – världens färger. Hämtade ur orienteringskartan från 2025
//  (salvia, oliv, beige, grått och tegelrött) och dämpade till en lugn
//  palett.
// =====================================================================
//
//  Färgkoder skrivs som "#rrggbb". Ändra, spara och ladda om sidan.
//  Starka färger gör kartan plottrig för den som är känslig för intryck.

export const TEMA = {
  // Himmel och mark runt huset
  bakgrund:      "#f1f0ea",
  mark:          "#e5e6dc",

  // Golv
  golv:          "#d6d4ce",   // ljusgrått, som kartans bakgrund
  golvMonster:   "#c6c3bb",   // det svaga marmormönstret
  stengolv:      "#d9d3c4",   // plattor i entrén och utanför
  stengolvFog:   "#c4bca9",

  // Väggar
  vagg:          "#f8f6f0",   // varmvitt
  vaggKant:      "#ebe7dc",   // överkanten
  laxrosa:       "#dccdb6",   // accentväggar, beige
  tegel:         "#c08a6c",
  tegelFog:      "#a0715a",
  morkgra:       "#6d6c68",
  glas:          "#a9d6dc",   // fönster och glasväggar, svagt blå
  tak:           "#b9b5ab",
  karm:          "#f5f3ec",   // fönsterkarmar

  // Möbler
  hylla:         "#fbfaf6",   // vita hyllor
  bjork:         "#d0b997",   // träskivor, beige som borden i kartan
  automat:       "#2e2d2b",
  skarm:         "#9fb1ad",   // matt skärm
  tv:            "#a7b2b4",
  scenFond:      "#6b5a48",
  ljudvagg:      "#9aa38a",   // salviagröna skärmar runt studieplatserna
  lampa:         "#fff3dc",
  lampSken:      "#ffd89a",
  vaxt:          "#6f8a5e",   // växternas blad
  vaxtLjus:      "#8ea67a",
  kruka:         "#b0705a",   // tegelröda krukor
  blomma:        "#cdb99b",   // blomdynan i barnavdelningen

  // Pendellampor hänger över de här platserna (samma id som i listan ovan)
  lampor: ["informationsdisk", "entre", "hanget", "demokratitorget", "barnavdelning",
           "poesi", "oskarshamnssamlingen", "dagstidningar", "studierum1", "studierum2",
           "lana_lamna"],

  // Accentfärger. senap används till i-plattorna, så den ska synas, men
  // inte skrika. Här är den tegelröd, som i kartan.
  senap:         "#b0705a",
  mint:          "#9aab8a",
  rosa:          "#c49a84",

  // Bokryggarna dras slumpvis ur den här listan
  bocker: ["#5f7a5c", "#848c64", "#c7b29a", "#b0705a", "#6b6a66",
           "#e3dccb", "#476949", "#9a7b5c"],

  // Figuren: mörkgrön tröja, så att den syns mot det ljusa golvet
  figurTroja:    "#476949",
  figurByxor:    "#4f4a44",
  figurHud:      "#f1d9c0",
  figurHar:      "#5a3d2b"
};
