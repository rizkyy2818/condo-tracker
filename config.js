// =====================================================================
// GAME DATA + SERVER GENERATOR
// Data diambil dari halaman condo-servers.vip.
// =====================================================================

export const GAMES = [
  { title: 'Untitled Game',        genre: 'Roleplay', visits: 12_400_000, likes: 486_000, baseActive: 3820 },
  { title: 'Untitled Game (2)',    genre: 'Roleplay', visits: 5_300_000,  likes: 210_000, baseActive: 1140 },
  { title: 'untitled',             genre: 'Roleplay', visits: 2_900_000,  likes: 118_000, baseActive: 640  },
  { title: 'Untitled Experience',  genre: 'Roleplay', visits: 1_650_000,  likes: 74_000,  baseActive: 410  },
  { title: 'new place',            genre: 'Roleplay', visits: 880_000,    likes: 52_000,  baseActive: 520  },
  { title: 'Place1',               genre: 'Roleplay', visits: 1_200_000,  likes: 66_000,  baseActive: 730  },
  { title: 'Untitled Game (Copy)', genre: 'Roleplay', visits: 2_100_000,  likes: 98_000,  baseActive: 960  },
  { title: 'My Game',              genre: 'Roleplay', visits: 740_000,    likes: 41_000,  baseActive: 480  },
];

export function fmt(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

function seededRand(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function seededInt(seed, min, max) {
  return Math.floor(seededRand(seed) * (max - min + 1)) + min;
}

export function makeServers(gameIdx, count = 9) {
  const servers = [];
  for (let i = 1; i <= count; i++) {
    const cap = 50;
    const seed = gameIdx * 100 + i;
    let fill;
    if (i % 3 === 0)      fill = seededInt(seed, 15, 30);
    else if (i % 3 === 1) fill = cap;
    else                  fill = seededInt(seed, 35, 48);
    servers.push({
      id: `srv-${gameIdx}-${i}`,
      name: `Server #${i}`,
      fill,
      cap,
      pct: Math.round((fill / cap) * 100),
    });
  }
  return servers;
}

export function randomGame() {
  return Math.floor(Math.random() * GAMES.length);
}

export function randomServer(gameIdx) {
  const servers = makeServers(gameIdx);
  const open = servers.filter(s => s.pct < 100);
  if (!open.length) return servers[0];
  return open[Math.floor(Math.random() * open.length)];
}

// ── Warna embed: #4b362a (dark brown) ─────────────────────────────
export function colorByLoad() {
  return 0x4b362a;
}

export function bar(pct, len = 10) {
  const f = Math.round((pct / 100) * len);
  return '▓'.repeat(f) + '░'.repeat(len - f);
}
