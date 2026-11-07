// Signaturmobler i leksaksstil.
//
// Varje mobel byggs inom sin rektangel i datafilen, sa att den syns dar
// kollisionen sager att den star. Formerna ar enkla och rundade, och
// fargerna kommer ur TEMA i src/config/content.js.

import * as THREE from "three";
import { mat, lysande, rundLada, rundLadaMitt, cylinder, slump } from "./former.js";

const mitt = f => ({ x: f.x + f.bredd / 2, z: f.z + f.djup / 2 });

// Vridning runt lodlinjen sa att en framsida byggd mot norr vetter at
// det hall som "riktning" i datafilen anger.
const VRIDNING = { norr: 0, syd: Math.PI, ost: -Math.PI / 2, vast: Math.PI / 2 };

/**
 * Lagger en mobel som ar byggd kring origo, med framsidan mot norr, pa
 * sin plats och vrider den. Bredd ar alltid den langa sidan.
 */
function placera(f, bygg) {
  const lang = Math.max(f.bredd, f.djup), kort = Math.min(f.bredd, f.djup);
  const inre = bygg(lang, kort);
  const m = mitt(f);
  inre.position.set(m.x, 0, m.z);
  inre.rotation.y = VRIDNING[f.riktning || "norr"];
  return inre;
}

// ------------------------------------------------------------- disken

function disk(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  // Vit stomme, en bjorkskiva som sticker ut lite och en liten skarm.
  g.add(rundLada(f.x + 0.05, f.z + 0.05, f.bredd - 0.1, f.djup - 0.1, f.hojd - 0.06, 0,
                 mat(t.hylla), 0.06));
  g.add(rundLada(f.x, f.z, f.bredd, f.djup, 0.07, f.hojd - 0.07, mat(t.bjork), 0.03));
  // Skarmarna star langs den langa sidan. "skarmar": false ger en disk utan.
  if (f.skarmar === false) return g;
  const langsZ = f.djup > f.bredd;
  for (const d of [-0.55, 0.55]) {
    if (langsZ) {
      g.add(rundLadaMitt(m.x + 0.05, m.z + d, 0.05, 0.5, 0.34, f.hojd + 0.12, mat(t.automat), 0.02));
      g.add(rundLadaMitt(m.x + 0.02, m.z + d, 0.01, 0.44, 0.28, f.hojd + 0.15, lysande(t.skarm, 0.6), 0.004));
      g.add(cylinder(m.x + 0.08, m.z + d, 0.025, 0.14, f.hojd, mat(t.automat), 8));
    } else {
      g.add(rundLadaMitt(m.x + d, m.z + 0.05, 0.5, 0.05, 0.34, f.hojd + 0.12, mat(t.automat), 0.02));
      g.add(rundLadaMitt(m.x + d, m.z + 0.02, 0.44, 0.01, 0.28, f.hojd + 0.15, lysande(t.skarm, 0.6), 0.004));
      g.add(cylinder(m.x + d, m.z + 0.08, 0.025, 0.14, f.hojd, mat(t.automat), 8));
    }
  }
  return g;
}

/** Informationsdisken pa plan 1: en mindre disk med en enda skarm. */
function infodisk(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  g.add(rundLada(f.x + 0.05, f.z + 0.05, f.bredd - 0.1, f.djup - 0.1, f.hojd - 0.06, 0,
                 mat(t.hylla), 0.06));
  g.add(rundLada(f.x, f.z, f.bredd, f.djup, 0.07, f.hojd - 0.07, mat(t.bjork), 0.03));
  // En senapsgul rand runt disken, sa att den syns pa avstand.
  g.add(rundLada(f.x + 0.04, f.z + 0.04, f.bredd - 0.08, f.djup - 0.08, 0.12, f.hojd - 0.3,
                 mat(t.senap), 0.04));
  g.add(rundLadaMitt(m.x, m.z, 0.5, 0.05, 0.34, f.hojd + 0.12, mat(t.automat), 0.02));
  g.add(rundLadaMitt(m.x, m.z + 0.03, 0.44, 0.01, 0.28, f.hojd + 0.15, lysande(t.skarm, 0.6), 0.004));
  g.add(cylinder(m.x, m.z - 0.04, 0.025, 0.14, f.hojd, mat(t.automat), 8));
  return g;
}

/**
 * Ett datorbord med skarmar rygg mot rygg langs mitten, sa att man
 * sitter pa bada langsidorna.
 */
function datorbord(f, t) {
  return placera(f, (bredd, djup) => {
    const g = new THREE.Group();
    g.add(rundLadaMitt(0, 0, bredd, djup, 0.06, f.hojd - 0.06, mat(t.bjork), 0.03));
    const ben = mat(t.hylla);
    for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      g.add(cylinder(dx * (bredd / 2 - 0.1), dz * (djup / 2 - 0.1), 0.04, f.hojd - 0.06, 0, ben, 10));
    }
    const svart = mat(t.automat);
    const antal = Math.max(1, Math.floor(bredd / 1.1));
    for (let i = 0; i < antal; i++) {
      const x = -bredd / 2 + bredd * (i + 0.5) / antal;
      for (const sida of [-1, 1]) {
        const z = sida * 0.1;
        g.add(cylinder(x, z, 0.025, 0.14, f.hojd, svart, 8));
        g.add(rundLadaMitt(x, z, 0.56, 0.05, 0.36, f.hojd + 0.12, svart, 0.02));
        g.add(rundLadaMitt(x, z + sida * 0.03, 0.5, 0.01, 0.3, f.hojd + 0.15,
                           lysande(t.skarm, 0.6), 0.004));
        // Tangentbord framfor skarmen.
        g.add(rundLadaMitt(x, sida * 0.38, 0.42, 0.14, 0.025, f.hojd, mat(t.hylla), 0.01));
      }
    }
    return g;
  });
}

// ------------------------------------------------------------ automaten

function automat(f, t) {
  return placera(f, (bredd, djup) => {
    const g = new THREE.Group();
    const svart = mat(t.automat);
    // Fotplatta, pelare och en snett stalld skarm. Skarmen vetter at
    // det hall som riktning anger, annars mot norr.
    g.add(rundLadaMitt(0, 0, bredd * 0.7, djup, 0.05, 0, svart, 0.02));
    g.add(rundLadaMitt(0, 0.08, 0.26, 0.22, f.hojd - 0.15, 0, svart, 0.08));
    const huvud = new THREE.Group();
    huvud.add(rundLadaMitt(0, 0, bredd * 0.8, 0.1, 0.5, -0.25, mat(t.hylla), 0.04));
    huvud.add(rundLadaMitt(0, -0.052, bredd * 0.66, 0.01, 0.38, -0.19, lysande(t.skarm, 0.85), 0.004));
    huvud.position.set(0, f.hojd, -0.02);
    huvud.rotation.x = 0.35;
    g.add(huvud);
    return g;
  });
}

// ------------------------------------------------------------- labbet

/** Ett lagt vitt skap med bjorklock och tva luckor med runda knoppar. */
function skap(f, t) {
  return placera(f, (bredd, djup) => {
    const g = new THREE.Group();
    g.add(rundLadaMitt(0, 0, bredd - 0.04, djup - 0.04, f.hojd - 0.05, 0, mat(t.hylla), 0.05));
    g.add(rundLadaMitt(0, 0, bredd, djup, 0.05, f.hojd - 0.05, mat(t.bjork), 0.02));
    for (const dx of [-bredd / 4, bredd / 4]) {
      g.add(rundLadaMitt(dx, -djup / 2 + 0.01, bredd / 2 - 0.08, 0.02, f.hojd - 0.2, 0.08,
                         mat("#f1ebe1"), 0.01));
      g.add(rundLadaMitt(dx + (dx < 0 ? 0.18 : -0.18), -djup / 2 - 0.02, 0.06, 0.04, 0.06,
                         f.hojd * 0.6, mat(t.senap), 0.025));
    }
    return g;
  });
}

let pallIndex = 0;

/** En rund pall i nagon av bibliotekets farger. */
function pall(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  const r = Math.min(f.bredd, f.djup) / 2;
  const farg = [t.senap, t.mint, t.rosa][pallIndex++ % 3];
  g.add(cylinder(m.x, m.z, r * 0.95, f.hojd - 0.08, 0, mat(t.bjork), 16));
  g.add(cylinder(m.x, m.z, r, 0.1, f.hojd - 0.1, mat(farg), 20));
  return g;
}

/** Tv-bank med en stor tv, en spelkonsol och tva handkontroller. */
function tv(f, t) {
  return placera(f, (bredd, djup) => {
    const g = new THREE.Group();
    g.add(rundLadaMitt(0, 0, bredd, djup, f.hojd, 0, mat(t.bjork), 0.05));
    // Skarmen star pa en liten fot och vetter framat.
    const svart = mat(t.automat);
    g.add(rundLadaMitt(0, 0.05, 0.3, 0.16, 0.08, f.hojd, svart, 0.03));
    g.add(rundLadaMitt(0, 0.08, 0.08, 0.05, 0.14, f.hojd + 0.06, svart, 0.02));
    g.add(rundLadaMitt(0, 0.06, 1.5, 0.07, 0.86, f.hojd + 0.18, svart, 0.04));
    g.add(rundLadaMitt(0, 0.02, 1.38, 0.01, 0.74, f.hojd + 0.24, lysande(t.tv, 0.6), 0.006));
    // Konsolen och tva handkontroller.
    g.add(rundLadaMitt(0.62, -0.06, 0.3, 0.2, 0.06, f.hojd, mat(t.hylla), 0.02));
    for (const [dx, farg] of [[-0.75, t.rosa], [-0.45, t.mint]]) {
      g.add(rundLadaMitt(dx, -0.12, 0.16, 0.1, 0.04, f.hojd, mat(farg), 0.018));
    }
    return g;
  });
}

// ----------------------------------------------------- soffa och fatolj

const SITTFARGER = t => [t.senap, t.mint, t.rosa];

/**
 * Ryggen hamnar pa den sida som vetter bort fran gruppen, sa att soffor
 * och fatoljer runt ett bord vander sig mot varandra.
 */
function ryggsida(f, alla) {
  // En ensam fatolj vid en vagg far sin rygg angiven i datafilen.
  if (f.rygg) return f.rygg;
  const m = mitt(f);
  const grannar = alla.filter(o => ["soffa", "fatolj", "bord"].includes(o.typ) &&
    Math.hypot(mitt(o).x - m.x, mitt(o).z - m.z) < 3.5);
  const c = grannar.reduce((s, o) => ({ x: s.x + mitt(o).x, z: s.z + mitt(o).z }), { x: 0, z: 0 });
  c.x /= grannar.length; c.z /= grannar.length;
  const dx = m.x - c.x, dz = m.z - c.z;
  if (f.bredd >= f.djup * 1.4) return dz < 0 ? "norr" : "syd";
  if (f.djup >= f.bredd * 1.4) return dx < 0 ? "vast" : "ost";
  return Math.abs(dx) > Math.abs(dz) ? (dx < 0 ? "vast" : "ost") : (dz < 0 ? "norr" : "syd");
}

function sittmobel(f, t, alla, index) {
  const g = new THREE.Group();
  const farg = mat(SITTFARGER(t)[index % 3]);
  const sits = 0.42;
  const rygg = 0.2;
  const arm = 0.14;
  const sida = ryggsida(f, alla);

  g.add(rundLada(f.x, f.z, f.bredd, f.djup, sits, 0, farg, 0.12));

  // Rygg och armstod som rundade kuddar.
  const r = { norr: [f.x, f.z, f.bredd, rygg], syd: [f.x, f.z + f.djup - rygg, f.bredd, rygg],
              vast: [f.x, f.z, rygg, f.djup], ost: [f.x + f.bredd - rygg, f.z, rygg, f.djup] }[sida];
  g.add(rundLada(r[0], r[1], r[2], r[3], f.hojd, 0, farg, 0.1));
  const langsX = sida === "norr" || sida === "syd";
  if (langsX) {
    g.add(rundLada(f.x, f.z, arm, f.djup, sits + 0.16, 0, farg, 0.07));
    g.add(rundLada(f.x + f.bredd - arm, f.z, arm, f.djup, sits + 0.16, 0, farg, 0.07));
  } else {
    g.add(rundLada(f.x, f.z, f.bredd, arm, sits + 0.16, 0, farg, 0.07));
    g.add(rundLada(f.x, f.z + f.djup - arm, f.bredd, arm, sits + 0.16, 0, farg, 0.07));
  }
  return g;
}

/**
 * En stol med rygg pa den sida som "rygg" anger, sa att den vander sig mot
 * bordet. "mot": [x, z] vrider i stallet stolen sa att den tittar mot den
 * punkten, till exempel en scen.
 */
function stol(f, t) {
  if (f.mot) return stolMot(f, t);
  const g = new THREE.Group();
  const sits = 0.45;
  const farg = mat(SITTFARGER(t)[sittIndex++ % 3]);
  const ben = mat(t.hylla);
  for (const [dx, dz] of [[0.05, 0.05], [f.bredd - 0.05, 0.05], [0.05, f.djup - 0.05], [f.bredd - 0.05, f.djup - 0.05]]) {
    g.add(cylinder(f.x + dx, f.z + dz, 0.02, sits - 0.04, 0, ben, 8));
  }
  g.add(rundLada(f.x, f.z, f.bredd, f.djup, 0.05, sits - 0.05, farg, 0.03));
  const T = 0.05;
  const r = { norr: [f.x, f.z, f.bredd, T], syd: [f.x, f.z + f.djup - T, f.bredd, T],
              vast: [f.x, f.z, T, f.djup], ost: [f.x + f.bredd - T, f.z, T, f.djup] }[f.rygg || "syd"];
  g.add(rundLada(r[0], r[1], r[2], r[3], f.hojd - sits, sits, farg, 0.02));
  return g;
}

function stolMot(f, t) {
  const g = new THREE.Group();
  const sits = 0.45, b = Math.min(f.bredd, f.djup), T = 0.05;
  const farg = mat(SITTFARGER(t)[sittIndex++ % 3]);
  const ben = mat(t.hylla);
  // Byggd kring origo med ryggen at soder, alltsa tittande mot norr.
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    g.add(cylinder(dx * (b / 2 - 0.05), dz * (b / 2 - 0.05), 0.02, sits - 0.04, 0, ben, 8));
  }
  g.add(rundLadaMitt(0, 0, b, b, 0.05, sits - 0.05, farg, 0.03));
  g.add(rundLadaMitt(0, b / 2 - T / 2, b, T, f.hojd - sits, sits, farg, 0.02));
  const m = mitt(f);
  g.position.set(m.x, 0, m.z);
  g.rotation.y = Math.atan2(-(f.mot[0] - m.x), -(f.mot[1] - m.z));
  return g;
}

function bord(f, t) {
  const g = new THREE.Group();
  // "enFot": true ger ett hogt cafebord med en fot och ett kryss i golvet.
  if (f.enFot) {
    const m = mitt(f);
    g.add(rundLada(f.x, f.z, f.bredd, f.djup, 0.04, f.hojd - 0.04, mat(t.bjork), 0.02));
    g.add(cylinder(m.x, m.z, 0.035, f.hojd - 0.04, 0, mat(t.hylla), 10));
    g.add(rundLadaMitt(m.x, m.z, Math.min(f.bredd, 0.6), 0.07, 0.04, 0, mat(t.hylla), 0.02));
    g.add(rundLadaMitt(m.x, m.z, 0.07, Math.min(f.djup, 0.6), 0.04, 0, mat(t.hylla), 0.02));
    return g;
  }
  // "rund": true ger ett runt bord pa en enda fot.
  if (f.rund) {
    const m = mitt(f), r = Math.min(f.bredd, f.djup) / 2;
    g.add(cylinder(m.x, m.z, r, 0.06, f.hojd - 0.06, mat(t.bjork), 32));
    g.add(cylinder(m.x, m.z, 0.05, f.hojd - 0.06, 0, mat(t.hylla), 12));
    g.add(cylinder(m.x, m.z, r * 0.45, 0.04, 0, mat(t.hylla), 24));
    return g;
  }
  g.add(rundLada(f.x, f.z, f.bredd, f.djup, 0.06, f.hojd - 0.06, mat(t.bjork), 0.03));
  const ben = mat(t.hylla);
  for (const [dx, dz] of [[0.1, 0.1], [f.bredd - 0.1, 0.1], [0.1, f.djup - 0.1], [f.bredd - 0.1, f.djup - 0.1]]) {
    g.add(cylinder(f.x + dx, f.z + dz, 0.04, f.hojd - 0.06, 0, ben, 10));
  }
  return g;
}

/**
 * Studiebas: skrivplatser med ljuddampande skarmvaggar runt sig.
 * "antal" bas i rad langs den langa sidan och "rader" (1 eller 2) bredvid
 * varandra. Tva rader vander sig mot varandra over en skarm i mitten.
 * "bord" ar bordets djup tvars over; ar rektangeln bredare ryms stolarna
 * innanfor, och gavelskarmarna gar da ut over dem, som i ett gruppbas.
 */
function studiebas(f, t) {
  const g = new THREE.Group();
  const langsZ = f.djup >= f.bredd;
  const L = langsZ ? f.djup : f.bredd;
  const K = langsZ ? f.bredd : f.djup;
  // s gar langs den langa sidan, k tvars over.
  const lada = (s, k, ls, lk, h, y0, m, r) => langsZ
    ? rundLada(f.x + k, f.z + s, lk, ls, h, y0, m, r)
    : rundLada(f.x + s, f.z + k, ls, lk, h, y0, m, r);
  const ben = (s, k, h, m) => langsZ
    ? cylinder(f.x + k, f.z + s, 0.03, h, 0, m, 8)
    : cylinder(f.x + s, f.z + k, 0.03, h, 0, m, 8);

  const rader = f.rader || 1, antal = f.antal || 1;
  const bord = f.bord || K;
  const k0 = (K - bord) / 2;
  const BORDHOJD = 0.74, T = 0.05;
  // "skarmar": "mork" ger morkgra skarmar. "dator": true stallar en
  // dator med tangentbord pa varje skiva, med skarmen mot den bakre kanten.
  const skiva = mat(t.bjork), vit = mat(t.hylla);
  const filt = mat(f.skarmar === "mork" ? (t.morkSkarm || t.morkgra) : t.ljudvagg);
  const plats = L / antal;
  const radDjup = bord / rader;

  // En skiva per plats, med ben vid den oppna kanten.
  for (let r = 0; r < rader; r++) {
    for (let i = 0; i < antal; i++) {
      const s = i * plats + T, ls = plats - 2 * T;
      const k = k0 + r * radDjup + (r === 1 ? T / 2 : 0.01);
      const lk = radDjup - T / 2 - 0.01;
      g.add(lada(s, k, ls, lk, 0.05, BORDHOJD - 0.05, skiva, 0.02));
      const ytter = r === 0 && rader === 2 ? k + 0.06 : k + lk - 0.06;
      if (rader === 2) {
        g.add(ben(s + 0.08, ytter, BORDHOJD - 0.05, vit));
        g.add(ben(s + ls - 0.08, ytter, BORDHOJD - 0.05, vit));
      } else {
        for (const kk of [k + 0.06, k + lk - 0.06]) {
          g.add(ben(s + 0.08, kk, BORDHOJD - 0.05, vit));
          g.add(ben(s + ls - 0.08, kk, BORDHOJD - 0.05, vit));
        }
      }
    }
  }

  // Skarmvaggar av filt med en tunn bjorklist overst. Gavlarna och
  // mellanvaggarna gar tvars over, mittskarmen langs mitten.
  const skarm = (s, k, ls, lk) => {
    g.add(lada(s, k, ls, lk, f.hojd - 0.03, 0, filt, 0.02));
    g.add(lada(s, k, ls, lk, 0.03, f.hojd - 0.03, skiva, 0.012));
  };
  for (let i = 0; i <= antal; i++) {
    const s = Math.min(Math.max(i * plats - T / 2, 0), L - T);
    // Mellan basen racker skarmen over bordet, gavlarna gar hela vagen.
    const yttre = i === 0 || i === antal;
    skarm(s, yttre ? 0 : k0, T, yttre ? K : bord);
  }
  if (rader === 2) skarm(T, K / 2 - T / 2, L - 2 * T, T);

  // Datorerna. Den bakre kanten ar den som vetter at "bak" (norr, syd,
  // ost eller vast), annars den forsta kanten tvars over.
  if (f.dator && rader === 1) {
    const bakForst = !f.bak || f.bak === "norr" || f.bak === "vast";
    const svart = mat(t.automat);
    for (let i = 0; i < antal; i++) {
      const s = (i + 0.5) * plats;
      const kBak = bakForst ? k0 + 0.12 : k0 + bord - 0.12;
      const kTang = bakForst ? k0 + bord * 0.62 : k0 + bord * 0.38;
      const ut = bakForst ? 1 : -1;
      g.add(lada(s - 0.06, kBak - 0.06, 0.12, 0.12, 0.02, BORDHOJD, svart, 0.01));
      g.add(lada(s - 0.02, kBak - 0.02, 0.04, 0.04, 0.12, BORDHOJD, svart, 0.01));
      g.add(lada(s - 0.26, kBak - 0.025, 0.52, 0.05, 0.32, BORDHOJD + 0.12, svart, 0.02));
      g.add(lada(s - 0.23, kBak + ut * 0.03 - 0.005, 0.46, 0.01, 0.26, BORDHOJD + 0.15,
                 lysande(t.skarm, 0.6), 0.004));
      g.add(lada(s - 0.21, kTang - 0.07, 0.42, 0.14, 0.025, BORDHOJD, vit, 0.01));
    }
  }
  return g;
}

// ------------------------------------------------------------ scenen

function scen(f, t) {
  const g = new THREE.Group();
  g.add(rundLada(f.x, f.z, f.bredd, f.djup, f.hojd, 0, mat(t.bjork), Math.min(0.08, f.hojd / 2)));
  // "fond": false ger en lag scen utan fondvagg.
  if (f.fond === false) return g;
  // Fondvagg mot norra vaggen, i det bla scenljuset fran fotot.
  g.add(rundLada(f.x, f.z - 0.3, f.bredd, 0.08, 2.6, f.hojd,
                 mat(t.scenFond, { emissive: t.scenFond, emissiveIntensity: 0.25 }), 0.03));
  return g;
}

// ------------------------------------------------------------ trappor

function randTextur(t) {
  const c = document.createElement("canvas");
  c.width = 128; c.height = 16;
  const x = c.getContext("2d");
  x.fillStyle = "#222";
  x.fillRect(0, 0, 128, 16);
  x.fillStyle = t.senap;
  for (let i = -16; i < 128; i += 16) {
    x.beginPath();
    x.moveTo(i, 16); x.lineTo(i + 8, 16); x.lineTo(i + 16, 0); x.lineTo(i + 8, 0);
    x.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

function trappa(f, t) {
  if (f.ner) return trappaNer(f, t);
  const g = new THREE.Group();
  const antal = 14;
  const langsZ = f.djup >= f.bredd;
  const steglangd = (langsZ ? f.djup : f.bredd) / antal;
  const steg = mat("#8f8b86");

  // Stiger mot norr respektive mot vaster, bort fran rummet.
  for (let i = 0; i < antal; i++) {
    const h = (f.hojd * (i + 1)) / antal;
    const fram = (antal - 1 - i) * steglangd;
    g.add(langsZ
      ? rundLada(f.x, f.z + fram, f.bredd, steglangd, h, 0, steg, 0.02)
      : rundLada(f.x + fram, f.z, steglangd, f.djup, h, 0, steg, 0.02));
  }

  // Gul-svart rand pa forsta steget.
  const tex = randTextur(t);
  tex.repeat.set((langsZ ? f.bredd : f.djup) / 0.5, 1);
  const rand = new THREE.Mesh(
    new THREE.PlaneGeometry(langsZ ? f.bredd - 0.04 : 0.1, langsZ ? 0.1 : f.djup - 0.04),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 }));
  rand.rotation.x = -Math.PI / 2;
  if (!langsZ) {
    // Randen loper langs z, sa monstret vrids ett kvarts varv.
    tex.center.set(0.5, 0.5);
    tex.rotation = Math.PI / 2;
  }
  const forsta = f.hojd / antal + 0.002;
  rand.position.set(langsZ ? f.x + f.bredd / 2 : f.x + f.bredd - 0.08,
                    forsta,
                    langsZ ? f.z + f.djup - 0.08 : f.z + f.djup / 2);
  rand.receiveShadow = true;
  g.add(rand);

  // Bjorkracken langs bada sidor, i trappans lutning.
  const lutLangd = Math.hypot(langsZ ? f.djup : f.bredd, f.hojd);
  const vinkel = Math.atan2(f.hojd, langsZ ? f.djup : f.bredd);
  for (const kant of [0.06, (langsZ ? f.bredd : f.djup) - 0.06]) {
    const racke = new THREE.Mesh(
      new THREE.BoxGeometry(langsZ ? 0.07 : lutLangd, 0.06, langsZ ? lutLangd : 0.07),
      mat(t.bjork));
    racke.castShadow = true;
    if (langsZ) {
      racke.position.set(f.x + kant, f.hojd / 2 + 0.9, f.z + f.djup / 2);
      racke.rotation.x = vinkel;
    } else {
      racke.position.set(f.x + f.bredd / 2, f.hojd / 2 + 0.9, f.z + kant);
      racke.rotation.z = -vinkel;
    }
    g.add(racke);
  }
  return g;
}

/**
 * En trappa som gar ner genom ett hal i golvet. Hålet tas upp av golvet
 * sjalvt (se varld.js). Har byggs stegen, schaktets vaggar och racken
 * med glas langs kanterna. f.nerMot sager at vilket hall trappan sjunker.
 *
 * Ett trapplopp kan borja under golvet och sluta i ett vilplan, sa att
 * tva lopp tillsammans blir en trappa som svanger:
 *   fran      hur langt under golvet loppet borjar (0 = vid golvet)
 *   fall      hur mycket loppet sjunker
 *   vilplan   langd pa det plana partiet i den nedre anden
 *   racke     sidor med racke bara en bit, { syd: [fran, till] } i meter
 *             fran det nordvastra hornet, eller false for inget racke
 */
export const SCHAKTDJUP = 2.9;

function trappaNer(f, t) {
  const g = new THREE.Group();
  const mot = f.nerMot || "norr";
  const langsZ = mot === "norr" || mot === "syd";
  const langd = langsZ ? f.djup : f.bredd;
  const fran = f.fran ?? 0;
  const fall = f.fall ?? SCHAKTDJUP - 0.1 - fran;
  const vilplan = f.vilplan ?? 0;
  const antal = Math.max(3, Math.round(fall / 0.2));
  const steglangd = (langd - vilplan) / antal;
  // Bjorksteg, sa att trappan syns mot det grå golvet nar man tittar ner.
  const steg = mat(t.bjork);
  const kant = mat("#5b4130");

  // Rektangel "fram" meter fran den kant dar man kliver ner, "l" lang.
  const bit = (fram, l) =>
    mot === "vast" ? [f.x + f.bredd - fram - l, f.z, l, f.djup] :
    mot === "ost"  ? [f.x + fram, f.z, l, f.djup] :
    mot === "norr" ? [f.x, f.z + f.djup - fram - l, f.bredd, l] :
                     [f.x, f.z + fram, f.bredd, l];

  // Steg i fran ovansidan och nedat, och vilplanet sist.
  for (let i = 0; i < antal; i++) {
    const [x, z, b, d] = bit(i * steglangd, steglangd);
    const topp = -(fran + (fall * (i + 1)) / antal);
    g.add(rundLada(x, z, b, d, topp + SCHAKTDJUP, -SCHAKTDJUP, steg, 0.02));
    // Mork framkant pa varje steg, sa att stegen gar att skilja at.
    const [nx, nz, nb, nd] = bit(i * steglangd, 0.06);
    g.add(rundLada(nx, nz, nb, nd, 0.012, topp, kant, 0.004));
  }
  if (vilplan > 0) {
    const [x, z, b, d] = bit(langd - vilplan, vilplan);
    g.add(rundLada(x, z, b, d, SCHAKTDJUP - fran - fall, -SCHAKTDJUP, steg, 0.02));
  }

  // Gul-svart rand pa forsta steget, sa att kanten syns.
  if (fran === 0) {
    const tex = randTextur(t);
    const tvars = langsZ ? f.bredd : f.djup;
    tex.repeat.set(tvars / 0.5, 1);
    const rand = new THREE.Mesh(new THREE.PlaneGeometry(tvars - 0.04, 0.1),
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 }));
    rand.rotation.x = -Math.PI / 2;
    if (!langsZ) rand.rotation.z = Math.PI / 2;
    const [x, z, b, d] = bit(0, 0.12);
    rand.position.set(x + b / 2, -fall / antal + 0.002, z + d / 2);
    g.add(rand);
  }

  // Kanterna: vaggar ner i schaktet och glasracke ovanfor golvet. Ingen
  // av delarna hamnar dar man kliver ner, och en kant kan vara kortad
  // dar trappan fortsatter i ett annat lopp.
  const T = 0.06;
  const motsatt = { norr: "syd", syd: "norr", ost: "vast", vast: "ost" };
  const kanter = [];
  for (const sida of ["norr", "syd", "vast", "ost"]) {
    if (sida === motsatt[mot]) continue;
    const del = f.racke?.[sida];
    if (del === false) continue;
    const langsSida = sida === "norr" || sida === "syd" ? f.bredd : f.djup;
    const [a, b] = del || [0, langsSida];
    kanter.push(
      sida === "norr" ? [f.x + a, f.z, b - a, T] :
      sida === "syd"  ? [f.x + a, f.z + f.djup - T, b - a, T] :
      sida === "vast" ? [f.x, f.z + a, T, b - a] :
                        [f.x + f.bredd - T, f.z + a, T, b - a]);
  }
  const vagg = mat(t.vaggKant);
  const glas = new THREE.MeshStandardMaterial({
    color: t.glas, transparent: true, opacity: 0.35, roughness: 0.1, depthWrite: false });
  const bjork = mat(t.bjork);
  for (const [x, z, b, d] of kanter) {
    g.add(rundLada(x, z, b, d, SCHAKTDJUP, -SCHAKTDJUP, vagg, 0.01));
    const ruta = new THREE.Mesh(new THREE.BoxGeometry(b, 0.85, d), glas);
    ruta.position.set(x + b / 2, 0.45, z + d / 2);
    g.add(ruta);
    g.add(rundLada(x - 0.01, z - 0.01, b + 0.02, d + 0.02, 0.07, 0.9, bjork, 0.03));
  }
  g.add(rundLada(f.x, f.z, f.bredd, f.djup, 0.05, -SCHAKTDJUP - 0.05, mat("#6d6a66"), 0.01));
  return g;
}

// --------------------------------------------------------------- hissen

function hiss(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  g.add(rundLada(f.x, f.z, f.bredd, f.djup, f.hojd, 0, mat(t.morkgra), 0.05));
  // Dorrarna vetter at det hall som riktning anger, annars mot norr.
  const dorr = mat("#85817c", { roughness: 0.5 });
  const lampa = lysande(t.senap, 1.2);
  const sida = f.riktning || "norr";
  if (sida === "ost" || sida === "vast") {
    const x = sida === "ost" ? f.x + f.bredd + 0.01 : f.x - 0.01;
    for (const dz of [-0.31, 0.31]) {
      g.add(rundLadaMitt(x, m.z + 0.1 + dz, 0.04, 0.6, 2.1, 0, dorr, 0.015));
    }
    g.add(rundLadaMitt(x + (sida === "ost" ? 0.01 : -0.01), m.z + 0.1, 0.04, 0.16, 0.12, 2.2, lampa, 0.02));
  } else {
    const z = sida === "syd" ? f.z + f.djup + 0.01 : f.z - 0.01;
    for (const dx of [-0.31, 0.31]) {
      g.add(rundLadaMitt(m.x + dx, z, 0.6, 0.04, 2.1, 0, dorr, 0.015));
    }
    // Den lilla gula vaningslampan.
    g.add(rundLadaMitt(m.x - 0.75, z + (sida === "syd" ? 0.01 : -0.01), 0.16, 0.04, 0.12, 2.2, lampa, 0.02));
  }
  return g;
}

// --------------------------------------------------------------- tavlor

function tavla(f, t) {
  const g = new THREE.Group();
  const slp = slump(f.id);
  const c = document.createElement("canvas");
  c.width = 256; c.height = 184;
  const x = c.getContext("2d");
  const farger = [t.senap, t.mint, t.rosa, "#7a3b33", "#5b4130", "#fbf6ee"];
  x.fillStyle = farger[Math.floor(slp() * 3)];
  x.fillRect(0, 0, 256, 184);
  // Nagra enkla former, som barnteckningar.
  for (let i = 0; i < 5; i++) {
    x.fillStyle = farger[Math.floor(slp() * farger.length)];
    const r = 20 + slp() * 50;
    x.beginPath();
    if (slp() < 0.5) x.arc(slp() * 256, slp() * 184, r, 0, Math.PI * 2);
    else x.roundRect(slp() * 200, slp() * 130, r * 1.6, r, 14);
    x.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;

  const y0 = 1.15;
  g.add(rundLada(f.x, f.z, f.bredd, f.djup, f.hojd, y0, mat(t.bjork), 0.03));
  // Tavlan hanger pa ostra vaggen och vetter mot vaster.
  const bild = new THREE.Mesh(new THREE.PlaneGeometry(f.djup - 0.14, f.hojd - 0.14),
                              new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }));
  bild.rotation.y = -Math.PI / 2;
  bild.position.set(f.x - 0.002, y0 + f.hojd / 2, f.z + f.djup / 2);
  g.add(bild);
  return g;
}

// --------------------------------------------------------------- pelare

function pelare(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  const r = Math.min(f.bredd, f.djup) / 2;
  const farg = f.farg === "laxrosa" ? t.laxrosa : t.vagg;
  // "form": "fyrkantig" ger en fyrkantig pelare med en mork sockel.
  if (f.form === "fyrkantig") {
    g.add(rundLada(f.x, f.z, f.bredd, f.djup, f.hojd, 0, mat(farg), 0.03));
    g.add(rundLada(f.x - 0.012, f.z - 0.012, f.bredd + 0.024, f.djup + 0.024, 0.16, 0,
                   mat("#4a4744"), 0.02));
    return g;
  }
  g.add(cylinder(m.x, m.z, r, f.hojd, 0, mat(farg), 24));
  g.add(cylinder(m.x, m.z, r + 0.012, 0.16, 0, mat("#4a4744"), 24));
  return g;
}

// ----------------------------------------------------------- kopiatorn

/** En stor kopiator med pappersfack, en lutad panel och ett lock overst. */
function kopiator(f, t) {
  return placera(f, (bredd, djup) => {
    const g = new THREE.Group();
    const ljus = mat("#e9e5de"), mork = mat("#8d8984");
    const kropp = f.hojd - 0.12;
    g.add(rundLadaMitt(0, 0, bredd * 0.56, djup, kropp, 0, ljus, 0.05));
    // Fyra pappersfack med morka handtag pa framsidan.
    for (let i = 0; i < 4; i++) {
      const y = 0.1 + i * 0.17;
      g.add(rundLadaMitt(0, -djup / 2 - 0.005, bredd * 0.52, 0.02, 0.13, y, mat("#f4f1ec"), 0.01));
      g.add(rundLadaMitt(0, -djup / 2 - 0.02, 0.18, 0.02, 0.03, y + 0.09, mork, 0.008));
    }
    // Locket och skannern overst, och en lutad panel med skarm.
    g.add(rundLadaMitt(0, 0.02, bredd * 0.56, djup - 0.06, 0.12, kropp, ljus, 0.03));
    const panel = new THREE.Group();
    panel.add(rundLadaMitt(0, 0, 0.36, 0.2, 0.04, 0, mork, 0.015));
    panel.add(rundLadaMitt(-0.06, 0, 0.16, 0.12, 0.01, 0.04, lysande(t.skarm, 0.7), 0.004));
    panel.position.set(bredd * 0.12, kropp + 0.08, -djup / 2 + 0.02);
    panel.rotation.x = 0.4;
    g.add(panel);
    // Utmatningsfacket pa sidan, med nagra ark.
    g.add(rundLadaMitt(bredd * 0.28 + 0.13, 0, 0.26, djup * 0.7, 0.03, kropp * 0.62, mork, 0.01));
    g.add(rundLadaMitt(bredd * 0.28 + 0.13, 0, 0.22, djup * 0.55, 0.02, kropp * 0.62 + 0.03,
                       mat("#fbfaf7"), 0.005));
    // Ett litet bord med papper bredvid.
    g.add(rundLadaMitt(-bredd / 2 + 0.15, 0, 0.28, djup * 0.9, 0.75, 0, mat(t.bjork), 0.04));
    g.add(rundLadaMitt(-bredd / 2 + 0.15, 0, 0.22, 0.3, 0.12, 0.75, mat("#fbfaf7"), 0.01));
    return g;
  });
}

// ------------------------------------------------------- varuautomater

/**
 * En hog varuautomat. sort "godis" har ett stort fonster med fargglada
 * paket i rader, sort "kaffe" har en lysande panel och en kopphylla.
 */
function varuautomat(f, t) {
  return placera(f, (bredd, djup) => {
    const g = new THREE.Group();
    const godis = f.sort === "godis";
    const fram = -djup / 2;
    g.add(rundLadaMitt(0, 0, bredd, djup, f.hojd, 0, mat(godis ? t.rosa : t.automat), 0.06));
    if (godis) {
      // Glasruta med fyra rader paket, och knappsats till hoger.
      const b = bredd * 0.62, x0 = -bredd * 0.12;
      g.add(rundLadaMitt(x0, fram - 0.005, b, 0.02, 1.0, 0.6, mat("#3b2f27"), 0.02));
      const farger = [t.senap, t.mint, "#e6dccb", t.bjork, "#7a3b33"];
      const slp = slump(f.id);
      for (let rad = 0; rad < 4; rad++) {
        for (let i = 0; i < 5; i++) {
          g.add(rundLadaMitt(x0 - b / 2 + b * (i + 0.5) / 5, fram - 0.02, b / 5 - 0.04, 0.03,
                             0.15, 0.68 + rad * 0.23,
                             mat(farger[Math.floor(slp() * farger.length)]), 0.01));
        }
      }
      g.add(rundLadaMitt(x0, fram - 0.012, b, 0.012, 1.0, 0.6, new THREE.MeshStandardMaterial({
        color: t.glas, transparent: true, opacity: 0.25, roughness: 0.1, depthWrite: false }), 0.01));
      g.add(rundLadaMitt(bredd * 0.36, fram - 0.01, bredd * 0.16, 0.02, 0.4, 1.0,
                         lysande(t.skarm, 0.5), 0.01));
      g.add(rundLadaMitt(x0, fram - 0.01, b, 0.03, 0.16, 0.3, mat("#3b2f27"), 0.02));
    } else {
      // Lysande panel med bild pa en kopp, knappar och en nisch for koppen.
      g.add(rundLadaMitt(0, fram - 0.005, bredd * 0.8, 0.02, 0.6, 1.0, lysande(t.bjork, 0.45), 0.02));
      g.add(cylinder(0, fram - 0.02, 0.1, 0.16, 1.2, mat("#fbf6ee"), 16));
      for (let i = 0; i < 3; i++) {
        g.add(rundLadaMitt(-0.2 + i * 0.2, fram - 0.01, 0.12, 0.02, 0.06, 0.85,
                           mat([t.senap, t.mint, t.rosa][i]), 0.01));
      }
      g.add(rundLadaMitt(0, fram + 0.08, 0.32, 0.18, 0.32, 0.4, mat("#1b1a19"), 0.02));
      g.add(cylinder(0, fram + 0.04, 0.04, 0.09, 0.42, mat("#fbf6ee"), 12));
      // Vattenkranen bredvid.
      g.add(rundLadaMitt(bredd * 0.3, fram - 0.01, 0.12, 0.04, 0.18, 0.55, mat(t.glas), 0.02));
    }
    return g;
  });
}

// ---------------------------------------------------------- nodutgang

let nodMaterial = null;
/** Den gronna nodutgangsskylten: en springande figur mot en dorr. */
function nodSkylt() {
  if (!nodMaterial) {
    const duk = document.createElement("canvas");
    duk.width = 256; duk.height = 104;
    const c = duk.getContext("2d");
    c.fillStyle = "#1f8a4c";
    c.beginPath();
    c.roundRect(0, 0, 256, 104, 12);
    c.fill();
    c.strokeStyle = c.fillStyle = "#ffffff";
    c.lineCap = "round";
    c.lineWidth = 11;
    // Dorren till hoger och figuren som springer mot den.
    c.strokeRect(176, 18, 52, 70);
    c.beginPath(); c.arc(124, 26, 10, 0, Math.PI * 2); c.fill();
    c.beginPath();
    c.moveTo(120, 40); c.lineTo(108, 66);
    c.moveTo(108, 66); c.lineTo(128, 86);
    c.moveTo(108, 66); c.lineTo(86, 84);
    c.moveTo(118, 44); c.lineTo(142, 58);
    c.moveTo(118, 44); c.lineTo(96, 50);
    c.stroke();
    // En pil framfor figuren.
    c.beginPath();
    c.moveTo(24, 52); c.lineTo(70, 52);
    c.moveTo(56, 38); c.lineTo(72, 52); c.lineTo(56, 66);
    c.stroke();
    const tex = new THREE.CanvasTexture(duk);
    tex.colorSpace = THREE.SRGBColorSpace;
    nodMaterial = new THREE.MeshStandardMaterial({
      map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.55, roughness: 0.5 });
  }
  return nodMaterial;
}

/**
 * En nodutgang i ytterväggen: en dorr med tryckstang, vagg ovanfor och
 * en liten gron skylt. riktning ar sidan som vetter in mot rummet.
 */
function nodutgang(f, t) {
  return placera(f, (bredd, djup) => {
    const g = new THREE.Group();
    const dorrHojd = f.hojd;
    g.add(rundLadaMitt(0, 0, bredd, djup, 3.2 - dorrHojd, dorrHojd, mat(t.vagg), 0.04));
    g.add(rundLadaMitt(0, 0, bredd, djup * 0.5, dorrHojd, 0, mat("#e3ddd4"), 0.03));
    // Karm och tryckstang pa insidan.
    for (const dx of [-bredd / 2 + 0.04, bredd / 2 - 0.04]) {
      g.add(rundLadaMitt(dx, 0, 0.08, djup, dorrHojd, 0, mat(t.karm), 0.02));
    }
    g.add(rundLadaMitt(0, -djup * 0.25 - 0.05, bredd * 0.7, 0.05, 0.05, 1.0, mat("#9b9690"), 0.02));
    const skylt = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.17), nodSkylt());
    // Planet vetter mot syd fran borjan, vand det mot norr (in mot rummet).
    skylt.rotation.y = Math.PI;
    skylt.position.set(0, dorrHojd + 0.2, -djup / 2 - 0.025);
    g.add(skylt);
    g.add(rundLadaMitt(0, -djup / 2 - 0.01, 0.46, 0.02, 0.21, dorrHojd + 0.095, mat("#f7f1e6"), 0.01));
    return g;
  });
}

// -------------------------------------------------------------- pentry

/** En pentrybank: vita skap, bjorkskiva, diskho med kran och en vattenkokare. */
function pentry(f, t) {
  return placera(f, (bredd, djup) => {
    const g = new THREE.Group();
    g.add(rundLadaMitt(0, 0, bredd - 0.04, djup - 0.04, f.hojd - 0.05, 0, mat(t.hylla), 0.04));
    g.add(rundLadaMitt(0, 0, bredd, djup, 0.05, f.hojd - 0.05, mat(t.bjork), 0.02));
    const luckor = Math.max(2, Math.round(bredd / 0.6));
    for (let i = 0; i < luckor; i++) {
      const x = -bredd / 2 + bredd * (i + 0.5) / luckor;
      g.add(rundLadaMitt(x, -djup / 2 + 0.01, bredd / luckor - 0.05, 0.02, f.hojd - 0.2, 0.08,
                         mat("#f1ebe1"), 0.01));
      g.add(rundLadaMitt(x, -djup / 2 - 0.02, 0.12, 0.03, 0.03, f.hojd - 0.22, mat(t.senap), 0.012));
    }
    // Diskhon ar en grund, gra fordjupning i skivan, med kran bakom.
    g.add(rundLadaMitt(bredd * 0.2, 0, 0.5, 0.36, 0.02, f.hojd, mat("#b9b6b1"), 0.03));
    g.add(cylinder(bredd * 0.2, djup / 2 - 0.1, 0.02, 0.26, f.hojd, mat("#c9c6c1"), 10));
    g.add(rundLadaMitt(bredd * 0.2, djup / 2 - 0.16, 0.04, 0.14, 0.03, f.hojd + 0.24, mat("#c9c6c1"), 0.012));
    g.add(cylinder(-bredd * 0.25, 0, 0.09, 0.22, f.hojd, mat(t.mint), 16));
    return g;
  });
}

// ----------------------------------------------------------- sittrappa

/**
 * En sittrappa med "steg" breda trappsteg som stiger mot "hogMot".
 * Varje steg har en dyna i nagon av bibliotekets farger.
 */
function sittrappa(f, t) {
  const g = new THREE.Group();
  const n = f.steg || 3;
  const sida = f.hogMot || "ost";
  const langsX = sida === "ost" || sida === "vast";
  const L = langsX ? f.bredd : f.djup;
  const s = L / n, h = f.hojd / n;
  const dynor = [t.senap, t.mint, t.rosa];
  for (let i = 0; i < n; i++) {
    // Steg i borjar i fran den laga sidan och gar anda till den hoga.
    const fran = sida === "ost" || sida === "syd" ? i * s : 0;
    const langd = L - i * s;
    const [x, z, b, d] = langsX ? [f.x + fran, f.z, langd, f.djup] : [f.x, f.z + fran, f.bredd, langd];
    g.add(rundLada(x, z, b, d, h, i * h, mat(t.bjork), 0.03));
    // Dynan ligger pa stegets synliga del.
    const synlig = sida === "ost" || sida === "syd" ? 0 : langd - s;
    const [dx, dz, db, dd] = langsX ? [x + synlig + 0.04, z + 0.06, s - 0.08, d - 0.12]
                                    : [x + 0.06, z + synlig + 0.04, b - 0.12, s - 0.08];
    g.add(rundLada(dx, dz, db, dd, 0.06, (i + 1) * h, mat(dynor[i % 3]), 0.03));
  }
  return g;
}

// ------------------------------------------------------------- vaxter

/** En krukvaxt: en rund kruka och ett moln av runda blad. */
function vaxt(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  const r = Math.min(f.bredd, f.djup) / 2;
  const slp = slump(f.id);
  const kruka = Math.min(0.45, f.hojd * 0.3);
  g.add(cylinder(m.x, m.z, r * 0.55, kruka, 0, mat(t.kruka || t.bjork), 20));
  g.add(cylinder(m.x, m.z, r * 0.6, 0.06, kruka - 0.06, mat(t.kruka || t.bjork), 20));
  const blad = [t.vaxt || "#7d8f6a", t.vaxtLjus || "#94a37e"];
  const klot = (x, y, z, rr, farg) => {
    const k = new THREE.Mesh(new THREE.SphereGeometry(rr, 16, 12), mat(farg));
    k.position.set(x, y, z);
    k.castShadow = k.receiveShadow = true;
    g.add(k);
  };
  klot(m.x, kruka + (f.hojd - kruka) * 0.5, m.z, r * 0.7, blad[0]);
  for (let i = 0; i < 6; i++) {
    const v = (i / 6) * Math.PI * 2 + slp();
    klot(m.x + Math.cos(v) * r * 0.5, kruka + (f.hojd - kruka) * (0.35 + slp() * 0.4),
         m.z + Math.sin(v) * r * 0.5, r * (0.38 + slp() * 0.12), blad[i % 2]);
  }
  return g;
}

// --------------------------------------------------------- snurrhylla

/** En rund snurrhylla med tre hyllplan och bocker runt kanten. Den star still. */
function snurrhylla(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  const r = Math.min(f.bredd, f.djup) / 2;
  const slp = slump(f.id);
  const vit = mat(t.hylla);
  g.add(cylinder(m.x, m.z, r * 0.9, 0.08, 0, vit, 28));
  g.add(cylinder(m.x, m.z, 0.06, f.hojd, 0, vit, 12));
  const plan = 3;
  for (let p = 0; p < plan; p++) {
    const y = 0.12 + p * (f.hojd - 0.2) / plan;
    g.add(cylinder(m.x, m.z, r, 0.03, y, vit, 28));
    const antal = Math.round(r * 14);
    for (let i = 0; i < antal; i++) {
      if (slp() < 0.1) continue;
      const v = (i / antal) * Math.PI * 2;
      const h = 0.18 + slp() * 0.1;
      const bok = rundLadaMitt(0, 0, 0.13, 0.03, h, 0,
                               mat(t.bocker[Math.floor(slp() * t.bocker.length)]), 0.008);
      const ring = new THREE.Group();
      ring.add(bok);
      ring.position.set(m.x + Math.cos(v) * r * 0.78, y + 0.03, m.z + Math.sin(v) * r * 0.78);
      ring.rotation.y = -v + Math.PI / 2;
      // Lutar lite bakat, med framsidan utat.
      bok.rotation.x = -0.15;
      g.add(ring);
    }
  }
  return g;
}

// ---------------------------------------------------------- exponering

/** Ett litet vitt exponeringsbord med nagra bocker som star med framsidan ut. */
function exponering(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  const slp = slump(f.id);
  g.add(rundLada(f.x, f.z, f.bredd, f.djup, f.hojd, 0, mat(t.hylla), 0.06));
  const sida = Math.min(f.bredd, f.djup);
  for (const [dx, dz, vrid] of [[-0.18, -0.08, 0.5], [0.16, 0.1, -0.7], [0.05, -0.2, 2.2]]) {
    const bok = new THREE.Group();
    const b = rundLadaMitt(0, 0, 0.2, 0.03, 0.27, 0, mat(t.bocker[Math.floor(slp() * t.bocker.length)]), 0.008);
    b.rotation.x = -0.25;
    bok.add(b);
    bok.position.set(m.x + dx * sida, f.hojd, m.z + dz * sida);
    bok.rotation.y = vrid;
    g.add(bok);
  }
  return g;
}

// ------------------------------------------------------------- blomma

/** En lag, mjuk sittdyna formad som en blomma, med kronblad runt en mitt. */
function blomma(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  const r = Math.min(f.bredd, f.djup) / 2;
  const kronblad = 6;
  const farg = mat(t.blomma || t.bjork);
  for (let i = 0; i < kronblad; i++) {
    const v = (i / kronblad) * Math.PI * 2;
    g.add(cylinder(m.x + Math.cos(v) * r * 0.58, m.z + Math.sin(v) * r * 0.58, r * 0.4,
                   f.hojd, 0, farg, 24));
  }
  g.add(cylinder(m.x, m.z, r * 0.5, f.hojd + 0.04, 0, mat(t.senap), 24));
  return g;
}

// -------------------------------------------------------------- banken

/** En lag trabank: en bjorkskiva pa en vit sockel. */
function bank(f, t) {
  const g = new THREE.Group();
  g.add(rundLada(f.x + 0.05, f.z + 0.05, f.bredd - 0.1, f.djup - 0.1, f.hojd - 0.06, 0, mat(t.hylla), 0.04));
  g.add(rundLada(f.x, f.z, f.bredd, f.djup, 0.06, f.hojd - 0.06, mat(f.fack ? t.hylla : t.bjork), 0.03));
  // "fack": true ger oppna fack i sidan, med lador i nagra av dem, pa den
  // sida som "fackMot" anger (norr, syd, ost eller vast).
  if (!f.fack) return g;
  const sida = f.fackMot || "syd";
  const langsX = sida === "norr" || sida === "syd";
  const langd = langsX ? f.bredd : f.djup;
  const antal = Math.max(1, Math.round(langd / 0.55));
  const slp = slump(f.id);
  const lador = [t.mint, "#f1ebe1", t.rosa, "#9fb1ad"];
  for (let i = 0; i < antal; i++) {
    const a = (i + 0.5) * langd / antal;
    const fb = langd / antal - 0.1, fh = f.hojd - 0.2;
    // Facket ar en mork oppning; i vartannat star en lada.
    const yta = { norr: [f.x + a, f.z - 0.004], syd: [f.x + a, f.z + f.djup + 0.004],
                  vast: [f.x - 0.004, f.z + a], ost: [f.x + f.bredd + 0.004, f.z + a] }[sida];
    g.add(rundLadaMitt(yta[0], yta[1], langsX ? fb : 0.01, langsX ? 0.01 : fb, fh, 0.08,
                       mat("#d8d2c6"), 0.01));
    if (slp() < 0.55) {
      const in1 = sida === "norr" ? 0.06 : sida === "syd" ? -0.06 : 0;
      const in2 = sida === "vast" ? 0.06 : sida === "ost" ? -0.06 : 0;
      g.add(rundLadaMitt(yta[0] + in2, yta[1] + in1, langsX ? fb * 0.8 : 0.05, langsX ? 0.05 : fb * 0.8,
                         fh * 0.75, 0.08, mat(lador[Math.floor(slp() * lador.length)]), 0.02));
    }
  }
  return g;
}

// -------------------------------------------------------- spiraltrappa

/**
 * En spiraltrappa runt en pelare, som slingrar sig upp mot taket. Den gar
 * till en vaning som inte finns i kartan och gar inte att kliva upp i.
 * "steg" ar antalet trappsteg, "varv" hur langt den vrider sig.
 * "forstaSteg" (norr, syd, ost, vast) ar hallet det nedersta steget
 * pekar at, sa att man kliver pa trappan fran ratt sida.
 */
function spiraltrappa(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  const r = Math.min(f.bredd, f.djup) / 2;
  const n = f.steg || 16;
  const varv = f.varv || 0.85;
  // Vinkeln raknas fran oster mot soder, som stegen vrids nedan.
  const borja = { ost: 0, syd: Math.PI / 2, vast: Math.PI, norr: -Math.PI / 2 }[f.forstaSteg || "ost"];
  const steg = mat("#8f8b86");
  g.add(cylinder(m.x, m.z, 0.08, f.hojd, 0, mat(t.hylla), 16));
  for (let i = 0; i < n; i++) {
    const v = borja + (i / n) * varv * Math.PI * 2;
    const del = new THREE.Group();
    del.add(rundLadaMitt(r / 2, 0, r - 0.02, r * 2 * Math.PI * varv / n + 0.06, 0.06, 0, steg, 0.02));
    del.position.set(m.x, (f.hojd * (i + 1)) / n - 0.06, m.z);
    del.rotation.y = -v;
    g.add(del);
    // En tunn ribba i racket vid varje steg.
    g.add(cylinder(m.x + Math.cos(v) * (r - 0.05), m.z + Math.sin(v) * (r - 0.05), 0.015,
                   0.9, (f.hojd * (i + 1)) / n, mat(t.bjork), 6));
  }
  return g;
}

// -------------------------------------------------------- anslagstavla

/** En duk med nagra affischer, som ritas en gang per tavla. */
function affischDuk(f, t) {
  const slp = slump(f.id);
  const B = 512, H = Math.round(512 * f.hojd / Math.max(f.bredd, f.djup));
  const c = document.createElement("canvas");
  c.width = B; c.height = H;
  const x = c.getContext("2d");
  // Korkbotten.
  x.fillStyle = t.kork || "#c9b48f";
  x.fillRect(0, 0, B, H);
  const farger = [t.senap, t.mint, t.rosa, "#7f8a66", "#a88b6a", "#6b6a66"];
  // Affischerna i ett glest rutnat, lite olika stora, aldrig sneda.
  const kol = 4, rad = 2;
  for (let r = 0; r < rad; r++) {
    for (let k = 0; k < kol; k++) {
      if (slp() < 0.12) continue;
      const cb = B / kol, ch = H / rad;
      const b = cb * (0.62 + slp() * 0.22), h = ch * (0.7 + slp() * 0.2);
      const px = k * cb + (cb - b) / 2, py = r * ch + (ch - h) / 2;
      x.fillStyle = "#fbf6ee";
      x.fillRect(px, py, b, h);
      // En fargad bild overst och nagra rader "text" under.
      x.fillStyle = farger[Math.floor(slp() * farger.length)];
      x.fillRect(px + b * 0.1, py + h * 0.08, b * 0.8, h * 0.42);
      x.fillStyle = "#4a4744";
      x.fillRect(px + b * 0.1, py + h * 0.58, b * 0.7, h * 0.07);
      x.fillStyle = "#8d8984";
      for (let i = 0; i < 3; i++) {
        x.fillRect(px + b * 0.1, py + h * (0.72 + i * 0.08), b * (0.45 + slp() * 0.35), h * 0.035);
      }
      // Ett litet nalhuvud.
      x.fillStyle = farger[Math.floor(slp() * 3)];
      x.beginPath(); x.arc(px + b / 2, py + 6, 5, 0, Math.PI * 2); x.fill();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * En anslagstavla med affischer om aktiviteter. Den hanger pa en vagg och
 * vetter at det hall som "riktning" anger. "y" ar hojden over golvet dar
 * tavlan borjar, "hojd" tavlans egen hojd.
 */
function anslagstavla(f, t) {
  return placera(f, (bredd, djup) => {
    const g = new THREE.Group();
    const y0 = f.y ?? 0.9;
    g.add(rundLadaMitt(0, 0, bredd, djup, f.hojd, y0, mat(t.bjork), 0.02));
    const bild = new THREE.Mesh(new THREE.PlaneGeometry(bredd - 0.08, f.hojd - 0.08),
      new THREE.MeshStandardMaterial({ map: affischDuk(f, t), roughness: 0.9 }));
    // Planet vetter mot syd fran borjan, vand det mot norr (framsidan).
    bild.rotation.y = Math.PI;
    bild.position.set(0, y0 + f.hojd / 2, -djup / 2 - 0.003);
    g.add(bild);
    return g;
  });
}

// ---------------------------------------------------- aterlamningsvagn

/**
 * En svart vagn att lagga tillbaka bocker i: en lada pa fyra sma hjul,
 * oppen upptill och med nagra bocker i. Framsidan vetter at "riktning".
 */
function aterlamningsvagn(f, t) {
  return placera(f, (bredd, djup) => {
    const g = new THREE.Group();
    const svart = mat(t.automat);
    const hjul = 0.1;
    for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      g.add(cylinder(dx * (bredd / 2 - 0.08), dz * (djup / 2 - 0.08), 0.045, hjul, 0, mat("#5d5a56"), 12));
    }
    const h = f.hojd - hjul;
    const T = 0.04;
    // Botten och fyra sidor, sa att den ar oppen upptill.
    g.add(rundLadaMitt(0, 0, bredd, djup, T, hjul, svart, 0.02));
    g.add(rundLadaMitt(0, -djup / 2 + T / 2, bredd, T, h, hjul, svart, 0.02));
    g.add(rundLadaMitt(0, djup / 2 - T / 2, bredd, T, h, hjul, svart, 0.02));
    g.add(rundLadaMitt(-bredd / 2 + T / 2, 0, T, djup, h, hjul, svart, 0.02));
    g.add(rundLadaMitt(bredd / 2 - T / 2, 0, T, djup, h, hjul, svart, 0.02));
    // Nagra bocker som ligger i, strax under kanten.
    const slp = slump(f.id);
    for (let i = 0; i < 5; i++) {
      const bok = rundLadaMitt((slp() - 0.5) * (bredd - 0.3), (slp() - 0.5) * (djup - 0.3),
                               0.2, 0.27, 0.04, f.hojd - 0.2 + i * 0.03,
                               mat(t.bocker[Math.floor(slp() * t.bocker.length)]), 0.01);
      bok.rotation.y = (slp() - 0.5) * 1.2;
      g.add(bok);
    }
    // En ljus skylt med en bok och en pil ner, pa framsidan.
    g.add(rundLadaMitt(0, -djup / 2 - 0.005, bredd * 0.5, 0.01, 0.16, f.hojd - 0.28,
                       mat("#f7f1e6"), 0.01));
    g.add(rundLadaMitt(0, -djup / 2 - 0.012, 0.08, 0.01, 0.08, f.hojd - 0.24, mat(t.senap), 0.01));
    return g;
  });
}

// ------------------------------------------------------- nyhetshylla

/**
 * En luftig stallning for nya bocker: tunna ben och tre lutande hyllplan
 * dar bockerna star med omslaget mot den som tittar. Framsidan vetter at
 * "riktning".
 */
function nyhetshylla(f, t) {
  return placera(f, (bredd, djup) => {
    const g = new THREE.Group();
    const vit = mat(t.hylla), tra = mat(t.bjork);
    const slp = slump(f.id);
    // Fyra tunna ben och en smal list overst.
    for (const dx of [-bredd / 2 + 0.03, bredd / 2 - 0.03]) {
      for (const dz of [-djup / 2 + 0.05, djup / 2 - 0.05]) {
        g.add(cylinder(dx, dz, 0.018, f.hojd, 0, vit, 8));
      }
      g.add(rundLadaMitt(dx, 0, 0.04, djup - 0.06, 0.03, 0.06, vit, 0.01));
      g.add(rundLadaMitt(dx, 0, 0.04, djup - 0.06, 0.03, f.hojd - 0.03, vit, 0.01));
    }
    // Tre plan som stiger bakat, som en trappa, sa att alla omslag syns.
    const plan = 3;
    for (let p = 0; p < plan; p++) {
      const y = 0.32 + p * (f.hojd - 0.55) / (plan - 1);
      const z = djup / 2 - 0.12 - (plan - 1 - p) * (djup - 0.24) / (plan - 1);
      g.add(rundLadaMitt(0, z, bredd - 0.08, 0.16, 0.025, y, tra, 0.01));
      g.add(rundLadaMitt(0, z - 0.075, bredd - 0.08, 0.015, 0.05, y + 0.02, tra, 0.006));
      // Bocker med omslaget framat, lutade lite bakat.
      const antal = Math.max(2, Math.floor((bredd - 0.16) / 0.27));
      for (let i = 0; i < antal; i++) {
        if (slp() < 0.12) continue;
        const bok = new THREE.Group();
        const h = 0.24 + slp() * 0.06;
        bok.add(rundLadaMitt(0, 0, 0.18 + slp() * 0.03, 0.025, h, 0,
                             mat(t.bocker[Math.floor(slp() * t.bocker.length)]), 0.008));
        // En ljus ruta pa omslaget, som en titel.
        bok.add(rundLadaMitt(0, -0.014, 0.12, 0.004, 0.05, h * 0.62, mat("#f7f1e6"), 0.002));
        bok.position.set(-bredd / 2 + 0.08 + (i + 0.5) * (bredd - 0.16) / antal, y + 0.025, z - 0.02);
        bok.rotation.x = -0.18;
        g.add(bok);
      }
    }
    return g;
  });
}

// ------------------------------------------------------------ spelskap

/**
 * Ett fyrsidigt skap for tv-spel. Spelfodralen star i hyllplan pa alla
 * fyra sidor, med ryggen ut som bocker. Det gar att snurra i verkligheten,
 * men star still har.
 */
function spelskap(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  const b = Math.min(f.bredd, f.djup);
  const vit = mat(t.hylla), mork = mat("#6b6a66");
  const slp = slump(f.id);
  g.add(cylinder(m.x, m.z, b * 0.45, 0.06, 0, mork, 24));
  g.add(rundLadaMitt(m.x, m.z, b - 0.08, b - 0.08, f.hojd - 0.06, 0.06, vit, 0.03));
  g.add(rundLadaMitt(m.x, m.z, b, b, 0.05, f.hojd, vit, 0.02));
  const plan = 4;
  const farger = [...t.bocker, "#5f6f7a", "#7a8b96"];
  const sidor = [[0, -1], [0, 1], [-1, 0], [1, 0]];
  for (const [ux, uz] of sidor) {
    const yta = (b - 0.08) / 2;
    for (let p = 0; p < plan; p++) {
      const y = 0.22 + p * (f.hojd - 0.35) / plan;
      // Hyllkanten och en rad fodral.
      const kx = m.x + ux * (yta + 0.005), kz = m.z + uz * (yta + 0.005);
      g.add(rundLadaMitt(kx, kz, ux ? 0.02 : b - 0.12, uz ? 0.02 : b - 0.12, 0.02, y, vit, 0.005));
      const antal = 14;
      for (let i = 0; i < antal; i++) {
        if (slp() < 0.08) continue;
        const a = -(b - 0.16) / 2 + (i + 0.5) * (b - 0.16) / antal;
        const fx = m.x + ux * (yta + 0.01) + (uz ? a : 0);
        const fz = m.z + uz * (yta + 0.01) + (ux ? a : 0);
        g.add(rundLadaMitt(fx, fz, ux ? 0.03 : 0.022, uz ? 0.03 : 0.022, 0.17, y + 0.02,
                           mat(farger[Math.floor(slp() * farger.length)]), 0.004));
      }
    }
  }
  return g;
}

// --------------------------------------------------------------- tradet

/**
 * Ett leksakstrad: en tjock brun stam med nagra grenar och en platt,
 * gyllene krona av runda moln, som tradet i Lilla skogen. "krona" ar
 * kronans radie. Bara stammen star i vagen.
 */
function trad(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  const stamFarg = mat(t.tradStam || "#8a6a4c");
  const kronaR = f.krona || 1.3;
  const hojd = f.hojd;
  const kronaY = hojd - 0.3;

  /** En gren som en avsmalnande cylinder fran punkt a till punkt b. */
  const gren = (a, b, ra, rb) => {
    const d = new THREE.Vector3().subVectors(b, a);
    const nat = new THREE.Mesh(new THREE.CylinderGeometry(rb, ra, d.length(), 10), stamFarg);
    nat.position.copy(a).addScaledVector(d, 0.5);
    nat.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    nat.castShadow = nat.receiveShadow = true;
    g.add(nat);
  };
  const V = (x, y, z) => new THREE.Vector3(m.x + x, y, m.z + z);
  // Stammen delar sig i fyra grenar som gar snett uppat mot kronan.
  gren(V(0, 0, 0), V(0, hojd * 0.55, 0), 0.2, 0.14);
  g.add(cylinder(m.x, m.z, 0.3, 0.1, 0, stamFarg, 14));
  for (const [v, l] of [[0.4, 0.75], [2.0, 0.65], [3.4, 0.8], [5.0, 0.6]]) {
    const ut = V(Math.cos(v) * l, kronaY - 0.1, Math.sin(v) * l);
    gren(V(0, hojd * 0.52, 0), ut, 0.1, 0.05);
  }

  // Kronan: platta, runda moln i tva toner, i tva ringar runt mitten.
  const slp = slump(f.id);
  const krona = [t.tradKrona || "#c8a46e", t.tradKronaLjus || "#d9bd8c"];
  const molnGeo = new THREE.SphereGeometry(1, 20, 12);
  const moln = (x, y, z, r, farg) => {
    const k = new THREE.Mesh(molnGeo, mat(farg));
    k.scale.set(r, r * 0.38, r);
    k.position.set(m.x + x, y, m.z + z);
    k.castShadow = k.receiveShadow = true;
    g.add(k);
  };
  moln(0, kronaY + 0.05, 0, kronaR * 0.55, krona[1]);
  for (const [ring, antal, storlek] of [[0.42, 5, 0.38], [0.72, 9, 0.3]]) {
    for (let i = 0; i < antal; i++) {
      const v = (i / antal) * Math.PI * 2 + slp() * 0.5;
      const r = kronaR * (ring + slp() * 0.06);
      moln(Math.cos(v) * r, kronaY - 0.05 + slp() * 0.15, Math.sin(v) * r,
           kronaR * (storlek + slp() * 0.08), krona[(i + (ring > 0.5 ? 1 : 0)) % 2]);
    }
  }
  return g;
}

// --------------------------------------------------------------- mattan

/** Monstret pa en orientalisk matta, i dampade farger. */
function mattDuk(f, t) {
  const B = 512, H = Math.round(512 * f.djup / f.bredd);
  const c = document.createElement("canvas");
  c.width = B; c.height = H;
  const x = c.getContext("2d");
  const botten = t.mattaBotten || "#8a4a3e", monster = t.mattaMonster || "#c9b48f";
  x.fillStyle = botten;
  x.fillRect(0, 0, B, H);
  // En bard runt kanten och ett falt av sma rutor i mitten.
  const kant = 26;
  x.strokeStyle = monster;
  x.lineWidth = 6;
  x.strokeRect(kant / 2, kant / 2, B - kant, H - kant);
  x.strokeRect(kant * 1.4, kant * 1.4, B - kant * 2.8, H - kant * 2.8);
  const ruta = 34;
  const slp = slump(f.id);
  const toner = [monster, "#a3765f", "#6b5a48", "#b9a684"];
  for (let yy = kant * 2; yy < H - kant * 2 - ruta / 2; yy += ruta) {
    for (let xx = kant * 2; xx < B - kant * 2 - ruta / 2; xx += ruta) {
      x.fillStyle = toner[Math.floor(slp() * toner.length)];
      x.beginPath();
      x.moveTo(xx + ruta / 2, yy + 4);
      x.lineTo(xx + ruta - 4, yy + ruta / 2);
      x.lineTo(xx + ruta / 2, yy + ruta - 4);
      x.lineTo(xx + 4, yy + ruta / 2);
      x.fill();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** En tunn matta pa golvet. Den gar att ga pa. */
function matta(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  g.add(rundLada(f.x, f.z, f.bredd, f.djup, 0.015, 0.012, mat(t.mattaBotten || "#8a4a3e"), 0.006));
  const yta = new THREE.Mesh(new THREE.PlaneGeometry(f.bredd - 0.02, f.djup - 0.02),
    new THREE.MeshStandardMaterial({ map: mattDuk(f, t), roughness: 0.95 }));
  yta.rotation.x = -Math.PI / 2;
  yta.position.set(m.x, 0.028, m.z);
  yta.receiveShadow = true;
  g.add(yta);
  return g;
}

// ---------------------------------------------------------- skarmvagg

let tapetBild = null;
/** Mork tapet med ett guldigt rutmonster, som skarmarna bakom scenen. */
function tapetTextur(t, langd, hojd) {
  if (!tapetBild) {
    tapetBild = document.createElement("canvas");
    tapetBild.width = tapetBild.height = 128;
    const c = tapetBild.getContext("2d");
    c.fillStyle = t.tapet || "#3f3d38";
    c.fillRect(0, 0, 128, 128);
    c.strokeStyle = t.tapetMonster || "#a8915e";
    c.fillStyle = t.tapetMonster || "#a8915e";
    c.lineWidth = 3;
    // Ett romb-monster med en liten prick i varje romb.
    for (const [cx, cy] of [[32, 32], [96, 96], [96, 32], [32, 96]]) {
      c.beginPath();
      c.moveTo(cx, cy - 26); c.lineTo(cx + 26, cy); c.lineTo(cx, cy + 26); c.lineTo(cx - 26, cy);
      c.closePath(); c.stroke();
      c.beginPath(); c.arc(cx, cy, 5, 0, Math.PI * 2); c.fill();
    }
  }
  const tex = new THREE.CanvasTexture(tapetBild);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  // En ruta i bilden ar en halv meter.
  tex.repeat.set(langd / 0.5, hojd / 0.5);
  return tex;
}

/**
 * En fristaende skarmvagg, lagre an de riktiga vaggarna. "monster": true
 * ger den morka tapeten. "lov": true hanger ett draperi av lov ovanfor
 * vaggen, fran taket och ner mot vaggens overkant.
 */
function skarmvagg(f, t) {
  const g = new THREE.Group();
  const langsX = f.bredd >= f.djup;
  const langd = langsX ? f.bredd : f.djup;
  const material = f.monster
    ? new THREE.MeshStandardMaterial({ map: tapetTextur(t, langd, f.hojd), roughness: 0.9 })
    : mat(t.vagg);
  g.add(rundLada(f.x, f.z, f.bredd, f.djup, f.hojd, 0, material, 0.02));
  g.add(rundLada(f.x - 0.01, f.z - 0.01, f.bredd + 0.02, f.djup + 0.02, 0.03, f.hojd,
                 mat(t.automat), 0.01));
  if (!f.lov) return g;

  // Loven hanger i tre rader pa snoren fran taket, tatt, i dampade farger.
  const slp = slump(f.id);
  const farger = t.lov || [t.senap, t.rosa, "#9a9890", "#efe9dc", "#5a5650"];
  const m = mitt(f);
  const lovGeo = new THREE.SphereGeometry(0.5, 10, 8);
  const topp = 3.05, botten = f.hojd + 0.12;
  const antal = Math.round(langd / 0.13);
  for (let rad = 0; rad < 3; rad++) {
    for (let i = 0; i < antal; i++) {
      const a = -langd / 2 + (i + 0.5 + (rad % 2) * 0.5) * langd / antal;
      if (Math.abs(a) > langd / 2 - 0.05) continue;
      const h = 0.34 + slp() * 0.14;
      const y = botten + h / 2 + rad * (topp - botten - h) / 2 + slp() * 0.06;
      const lov = new THREE.Mesh(lovGeo, mat(farger[Math.floor(slp() * farger.length)]));
      lov.scale.set(langsX ? 0.13 : 0.02, h, langsX ? 0.02 : 0.13);
      const ut = (rad - 1) * 0.03;
      lov.position.set(langsX ? m.x + a : m.x + ut, y, langsX ? m.z + ut : m.z + a);
      lov.castShadow = true;
      g.add(lov);
    }
  }
  return g;
}

// ------------------------------------------------------------ lovridan

/**
 * Ett draperi av lov som hanger fran taket nastan ner till golvet, pa
 * tunna tradar. Det gar inte att ga igenom. Inga vaggar, bara lov.
 */
function lovrida(f, t) {
  const g = new THREE.Group();
  const langsX = f.bredd >= f.djup;
  const langd = langsX ? f.bredd : f.djup;
  const m = mitt(f);
  const slp = slump(f.id);
  const farger = t.lov || [t.senap, t.rosa, "#9a9890", "#efe9dc", "#5a5650"];
  const lovGeo = new THREE.SphereGeometry(0.5, 8, 6);
  const topp = 3.15, botten = f.botten ?? 0.35;
  // En smal list i taket som tradarna hanger i.
  g.add(langsX ? rundLadaMitt(m.x, m.z, langd, 0.06, 0.05, topp, mat(t.automat), 0.02)
               : rundLadaMitt(m.x, m.z, 0.06, langd, 0.05, topp, mat(t.automat), 0.02));
  const tradar = Math.round(langd / 0.2);
  for (let i = 0; i < tradar; i++) {
    const a = -langd / 2 + (i + 0.5) * langd / tradar;
    const nere = botten + slp() * 0.3;
    const trad = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, topp - nere, 4),
                                mat("#d8d2c6"));
    trad.position.set(langsX ? m.x + a : m.x, (topp + nere) / 2, langsX ? m.z : m.z + a);
    g.add(trad);
    for (let y = nere; y < topp - 0.15; y += 0.26 + slp() * 0.08) {
      const lov = new THREE.Mesh(lovGeo, mat(farger[Math.floor(slp() * farger.length)]));
      const h = 0.16 + slp() * 0.06;
      lov.scale.set(langsX ? 0.09 : 0.015, h, langsX ? 0.015 : 0.09);
      lov.rotation[langsX ? "z" : "x"] = (slp() - 0.5) * 0.8;
      lov.position.set(langsX ? m.x + a : m.x, y + h / 2, langsX ? m.z : m.z + a);
      lov.castShadow = true;
      g.add(lov);
    }
  }
  return g;
}

// ------------------------------------------------------- blomstallning

/**
 * En blomstallning: blomlador som pa en balkong, staplade ovanpa varandra
 * i en smal svart stallning, sa att de bildar en lag vagg. Byggd langs x
 * kring origo. Anvands for sneda vaggar med "typ": "blomstallning".
 */
export function blomstallning(langd, tjock, hojd, t, id) {
  const g = new THREE.Group();
  const svart = mat(t.automat);
  const slp = slump(id);
  const vaningar = Math.max(2, Math.round(hojd / 0.42));
  const steg = hojd / vaningar;
  for (const x of [-langd / 2 + 0.03, langd / 2 - 0.03]) {
    g.add(rundLadaMitt(x, 0, 0.04, tjock, hojd, 0, svart, 0.015));
  }
  const blad = [t.vaxt || "#7d8f6a", t.vaxtLjus || "#94a37e"];
  const blommor = [t.rosa, t.senap, "#efe9dc"];
  const klotGeo = new THREE.SphereGeometry(1, 10, 8);
  const klot = (x, y, z, r, farg) => {
    const k = new THREE.Mesh(klotGeo, mat(farg));
    k.scale.setScalar(r);
    k.position.set(x, y, z);
    k.castShadow = true;
    g.add(k);
  };
  for (let v = 0; v < vaningar; v++) {
    const y0 = v * steg + 0.08;
    const lada = Math.min(0.18, steg * 0.45);
    g.add(rundLadaMitt(0, 0, langd - 0.1, tjock * 0.8, lada, y0, mat(t.kruka || t.bjork), 0.03));
    // Bladen vaxer upp ur ladan och hanger lite over kanten.
    const antal = Math.max(2, Math.round(langd / 0.16));
    for (let i = 0; i < antal; i++) {
      const x = -langd / 2 + 0.1 + (i + 0.5) * (langd - 0.2) / antal;
      const sida = (slp() - 0.5) * tjock * 0.6;
      klot(x, y0 + lada + 0.04 + slp() * 0.05, sida, 0.08 + slp() * 0.03, blad[i % 2]);
      if (slp() < 0.25) klot(x, y0 + lada + 0.11, sida, 0.035, blommor[Math.floor(slp() * 3)]);
    }
  }
  return g;
}

/** En hog barstol: rund sits pa ett smalt ben med en fotring. */
function barstol(f, t) {
  const g = new THREE.Group();
  const m = mitt(f);
  const r = Math.min(f.bredd, f.djup) / 2;
  const svart = mat(t.automat);
  g.add(cylinder(m.x, m.z, r * 0.75, 0.03, 0, svart, 20));
  g.add(cylinder(m.x, m.z, 0.03, f.hojd - 0.08, 0, svart, 10));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r * 0.6, 0.015, 6, 20), svart);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(m.x, f.hojd * 0.35, m.z);
  g.add(ring);
  g.add(cylinder(m.x, m.z, r, 0.08, f.hojd - 0.08, mat(t.senap), 20));
  return g;
}

// -------------------------------------------------------- pendellampor

let lampGeo = null;

/** En vit lampa med vagig kant, som hanger i en tunn sladd. */
export function pendellampa(x, z, t, hojd = 2.35) {
  if (!lampGeo) {
    // Profilen roteras runt mitten. Kupan ar rundad och vidgar sig nedat.
    const p = [];
    for (let i = 0; i <= 12; i++) {
      const a = i / 12;
      p.push(new THREE.Vector2(0.04 + Math.sin(a * Math.PI / 2) * 0.26, 0.3 - a * 0.3));
    }
    lampGeo = new THREE.LatheGeometry(p, 28);
  }
  const g = new THREE.Group();
  const kupa = new THREE.Mesh(lampGeo, mat(t.lampa, { side: THREE.DoubleSide, roughness: 0.5 }));
  kupa.castShadow = true;
  g.add(kupa);
  // Den vagiga kanten: en ring av sma kulor.
  const kulGeo = new THREE.SphereGeometry(0.045, 10, 8);
  for (let i = 0; i < 14; i++) {
    const v = (i / 14) * Math.PI * 2;
    const k = new THREE.Mesh(kulGeo, mat(t.lampa, { roughness: 0.5 }));
    k.position.set(Math.cos(v) * 0.29, 0, Math.sin(v) * 0.29);
    g.add(k);
  }
  // Det varma skenet underifran.
  const sken = new THREE.Mesh(new THREE.CircleGeometry(0.22, 24), lysande(t.lampSken, 1.6));
  sken.rotation.x = Math.PI / 2;
  sken.position.y = 0.02;
  g.add(sken);
  const sladd = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 1.2, 6), mat("#333"));
  sladd.position.y = 0.9;
  g.add(sladd);
  g.position.set(x, hojd, z);
  return g;
}

// ---------------------------------------------------------------- urval

let sittIndex = 0;

export function byggMobel(f, t, alla) {
  switch (f.typ) {
    case "disk": return disk(f, t);
    case "infodisk": return infodisk(f, t);
    case "datorbord": return datorbord(f, t);
    case "automat": return automat(f, t);
    case "soffa":
    case "fatolj": return sittmobel(f, t, alla, sittIndex++);
    case "bord": return bord(f, t);
    case "stol": return stol(f, t);
    case "studiebas": return studiebas(f, t);
    case "scen": return scen(f, t);
    case "trappa": return trappa(f, t);
    case "hiss": return hiss(f, t);
    case "skap": return skap(f, t);
    case "pall": return pall(f, t);
    case "tv": return tv(f, t);
    case "tavla": return tavla(f, t);
    case "pelare": return pelare(f, t);
    case "kopiator": return kopiator(f, t);
    case "varuautomat": return varuautomat(f, t);
    case "nodutgang": return nodutgang(f, t);
    case "pentry": return pentry(f, t);
    case "sittrappa": return sittrappa(f, t);
    case "vaxt": return vaxt(f, t);
    case "snurrhylla": return snurrhylla(f, t);
    case "exponering": return exponering(f, t);
    case "blomma": return blomma(f, t);
    case "bank": return bank(f, t);
    case "spiraltrappa": return spiraltrappa(f, t);
    case "anslagstavla": return anslagstavla(f, t);
    case "aterlamningsvagn": return aterlamningsvagn(f, t);
    case "nyhetshylla": return nyhetshylla(f, t);
    case "spelskap": return spelskap(f, t);
    case "trad": return trad(f, t);
    case "matta": return matta(f, t);
    case "skarmvagg": return skarmvagg(f, t);
    case "lovrida": return lovrida(f, t);
    case "barstol": return barstol(f, t);
    default: return rundLada(f.x, f.z, f.bredd, f.djup, f.hojd, 0, mat(t.hylla), 0.06);
  }
}
