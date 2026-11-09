// Rutorna och knapparna har samma storlek pa skarmen aven nar man zoomar
// in eller ut i webblasaren (Ctrl + och Ctrl -).
//
// Webblasaren later inte en sida stanga av zoomen, men den syns i
// devicePixelRatio. Kvoten mot vardet utan zoom satts som --motzoom, och
// CSS-egenskapen zoom i index.html krymper eller forstorer rutorna lika
// mycket at andra hallet. Karta och skyltar ritas i 3D och paverkas inte.

// Vanliga zoomsteg i webblasarna, utom 100 %.
const ZOOMSTEG = [0.25, 0.33, 0.5, 0.67, 0.75, 0.8, 0.9, 1.1, 1.25, 1.33, 1.5, 1.75, 2, 2.5, 3, 4, 5];

/**
 * Ar sidan redan zoomad nar den laddas? Da ar fonstrets yttre bredd (i
 * skarmens matt) en annan an den inre (i sidans matt). Bara en kvot som
 * ligger nara ett vanligt zoomsteg raknas, sa att en sidopanel eller
 * liknande inte tas for zoom.
 */
function zoomVidStart() {
  if (!window.outerWidth || !window.innerWidth) return 1;
  const kvot = window.outerWidth / window.innerWidth;
  const narmast = ZOOMSTEG.reduce((a, b) => (Math.abs(b - kvot) < Math.abs(a - kvot) ? b : a));
  return Math.abs(narmast - kvot) / narmast < 0.02 ? narmast : 1;
}

export function hallFastStorlek() {
  const grund = window.devicePixelRatio / zoomVidStart();
  const uppdatera = () => {
    const zoom = window.devicePixelRatio / grund;
    document.documentElement.style.setProperty("--motzoom", String(1 / zoom));
  };
  uppdatera();
  window.addEventListener("resize", uppdatera);
}
