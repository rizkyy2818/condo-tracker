// =====================================================================
// FAKE USER PROFILE GENERATOR (v7.1 FINAL)
// Fitur:
// - Bio mega pool (Indo clean + English + Roblox)
// - Status di baris baru (bukan di samping)
// - 35% chance no bio (realistis)
// - Anti-duplikat: username + bio + avatar tracked
// - Semua data synthetic — nggak nyentuh Roblox API/user real
// =====================================================================

// ═══════════════════════════════════════════════════════════════════
// NAMA POOLS
// ═══════════════════════════════════════════════════════════════════

const FIRST_PARTS = [
  'Shadow', 'Nova', 'Ghost', 'Pixel', 'Sky', 'Dark', 'Cosmic', 'Iron',
  'Neon', 'Thunder', 'Crimson', 'Silent', 'Mystic', 'Blaze', 'Frost',
  'Void', 'Turbo', 'Wild', 'Knight', 'Zero', 'Rogue', 'Storm', 'Silver',
  'Nitro', 'Quick', 'Epic', 'Alpha', 'Omega', 'Prime', 'Lunar', 'Solar',
  'Mega', 'Ultra', 'Hyper', 'Cyber', 'Astro', 'Aqua', 'Terra', 'Pyro',
  'Frozen', 'Burning', 'Hidden', 'Lost', 'Ancient', 'Phantom', 'Crystal',
  'Fatal', 'Lucky', 'Rapid', 'Sharp', 'Savage', 'Mad', 'Crazy', 'Sneaky',
  'Toxic', 'Royal', 'Deadly', 'Broken', 'Golden', 'Sacred',
  'Ember', 'River', 'Stone', 'Ocean', 'Cloud', 'Wind', 'Ash', 'Dust',
  'Rock', 'Snow', 'Rain', 'Flame', 'Leaf', 'Root', 'Echo', 'Pulse',
  'Drift', 'Glitch', 'Static', 'Signal', 'Code', 'Byte', 'Flash', 'Blur',
  'Haze', 'Mist', 'Nebula', 'Orbit', 'Vector', 'Matrix', 'Midnight',
  'Twilight', 'Dusk', 'Dawn', 'Eclipse', 'Umbra', 'Onyx', 'Raven',
  'Obsidian', 'Noir', 'Ink', 'Abyss', 'Specter', 'Lumen', 'Halo', 'Aura',
  'Radiant', 'Gleam', 'Shine', 'Prism', 'Mellow', 'Hush', 'Calm', 'Still',
  'Quiet', 'Tranquil', 'Serene', 'Dash', 'Swift', 'Speed', 'Rush', 'Bolt',
  'Vortex', 'Tiny', 'Giant', 'Titan', 'Colossal', 'Micro', 'Maxi',
  'Azure', 'Amber', 'Scarlet', 'Violet', 'Indigo', 'Jade', 'Ruby', 'Sapphire',
  'Wandering', 'Restless', 'Roaming', 'Endless', 'Eternal', 'Infinite',
];

const SECOND_PARTS = [
  'Hunter', 'Knight', 'Rider', 'Wizard', 'Blade', 'Phoenix', 'Wolf',
  'Fist', 'Samurai', 'Bolt', 'Fox', 'Storm', 'Raven', 'Runner', 'Byte',
  'Walker', 'Ace', 'Card', 'Owl', 'Cool', 'Pilot', 'Breaker', 'Arrow',
  'Kid', 'Sniper', 'Ninja', 'Pirate', 'Mage', 'Titan', 'Giant', 'Reaper',
  'Master', 'Warrior', 'Legend', 'Hero', 'Champion', 'Slayer', 'Drake',
  'Seeker', 'Bringer', 'Keeper', 'Smith', 'Lord', 'Born', 'Beast',
  'Spirit', 'Soul', 'King', 'Guard', 'Fang', 'Claw', 'Wing', 'Eyes',
  'Heart', 'Mind', 'Shade', 'Drift', 'Pulse', 'Core',
  'Dragon', 'Wyvern', 'Griffin', 'Falcon', 'Eagle', 'Hawk', 'Crow',
  'Lion', 'Tiger', 'Panther', 'Leopard', 'Bear', 'Lynx', 'Coyote',
  'Serpent', 'Viper', 'Cobra', 'Scorpion', 'Spider', 'Wasp', 'Mantis',
  'Sage', 'Oracle', 'Prophet', 'Seer', 'Warden', 'Sentinel', 'Ranger',
  'Paladin', 'Crusader', 'Templar', 'Squire', 'Duke', 'Baron', 'Count',
  'Wright', 'Mason', 'Baker', 'Miner', 'Trader', 'Merchant', 'Scout',
  'Captain', 'Admiral', 'Spark', 'Flame', 'Light', 'Quake', 'Whisper',
  'Roar', 'Howl', 'Song', 'Chime', 'Bell', 'Drum', 'Dancer', 'Jumper',
  'Glider', 'Flyer', 'Swimmer', 'Climber', 'Made', 'Forge', 'Craft', 'Works',
];

const DISPLAY_PREFIX = [
  'The', 'Mr', 'Mrs', 'Sir', 'Lord', 'King', 'Queen', 'Dr', 'Capt',
  'Lil', 'Big', 'Old', 'Young', 'Real', 'Fake', 'Pro', 'xX', 'xD',
  'Bang', 'Om', 'Tante', 'Kak', 'Dek',
];

const DECORATIONS = [
  { pre: '', suf: '' },
  { pre: '', suf: '' },
  { pre: '', suf: '_' },
  { pre: '_', suf: '' },
  { pre: '_', suf: '_' },
  { pre: 'xX', suf: 'Xx' },
  { pre: 'x', suf: 'x' },
  { pre: 'Its', suf: '' },
  { pre: 'Im', suf: '' },
  { pre: 'The', suf: '' },
  { pre: 'Real', suf: '' },
];

// ═══════════════════════════════════════════════════════════════════
// BIO POOLS
// ═══════════════════════════════════════════════════════════════════

// ── ENGLISH: vibes ────────────────────────────────────────────────
const BIO_EN_VIBES = [
  'just vibing', 'chill mode', 'lowkey here', 'somewhere in between',
  'here for the vibes', 'just passing through', 'silent observer',
  'no thoughts head empty', 'certified yapper', 'chronically online',
  'offline sometimes', 'low battery', 'touch grass enthusiast',
  'professional overthinker', 'midnight thoughts', '3am playlist',
  'coffee and games', 'music on repeat', 'always tired',
  'sleep schedule broken', 'still loading', 'buffer buffering',
  'loading personality', 'afk in real life', 'existing quietly',
  'living rent free', 'not here mentally', 'mentally on vacation',
  'vibe curator', 'mood specialist', 'professional lurker',
  'long time no see', 'back in action', 'return of the king',
  'was gone but back', 'still alive', 'barely functional',
];

// ── ENGLISH: aesthetic ────────────────────────────────────────────
const BIO_EN_AESTHETIC = [
  'aesthetic hunter', 'minimalist', 'monochrome', 'pastel dreams',
  'neon nights', 'cyber soul', 'vintage heart', 'modern mind',
  'dreaming in 8-bit', 'living in 4k', 'static noise', 'soft chaos',
  'quiet violence', 'gentle chaos', 'loud silence', 'warm static',
  'cathode ray dreams', 'analog feelings', 'digital garden',
  'retro soul', 'future nostalgia', 'slow living', 'sundown vibes',
  'art ho', 'color palette', 'shade collector', 'tone obsessed',
];

// ── ENGLISH: Roblox ───────────────────────────────────────────────
const BIO_EN_ROBLOX = [
  'condo explorer', 'condo collector', 'aesthetic condo hunter',
  'trade enjoyer', 'limited collector', 'avatar enthusiast',
  'og player', 'returning player', 'daily player', 'weekend warrior',
  'f2p but stylish', 'premium member', 'premium since 2020',
  'no drama just games', 'games over drama', 'builder by heart',
  'grinder by nature', 'simulator enjoyer', 'obby enthusiast',
  'parkour main', 'pvp enjoyer', 'rpg main', 'horror game enjoyer',
  'shooter main', 'tycoon builder', 'tower defense fan',
  'item hoarder', 'pet collector', 'limited hunter', 'roblox veteran',
  'since 2015', 'since 2016', 'since 2017', 'since 2018',
  'since 2019', 'since 2020', 'since 2021',
  'trading everything', 'fair trades only', 'no lowball offers',
  'dm for trades', 'open to offers', 'clean inventory',
  'messy inventory', 'inventory full', 'r6 purist', 'r15 main',
  'classic avatar', 'modern avatar', 'retro build',
];

// ── ENGLISH: mood ─────────────────────────────────────────────────
const BIO_EN_MOOD = [
  'not ok', 'kinda ok', 'doing fine', 'surviving',
  'vibing and crying', 'laughing through pain',
  'soft hearted', 'cold hearted', 'in my feels', 'out of my feels',
  'feelings on mute', 'emotional support gamer',
  'tired of everything', 'just tired', 'sleepy head',
  'quietly suffering', 'patiently waiting', 'silently screaming',
];

// ── INDONESIA: aktivitas ──────────────────────────────────────────
const BIO_ID_AKTIVITAS = [
  'sekedar lewat', 'cuma mampir', 'iseng aja', 'main santai',
  'santai aja', 'santai kok', 'chill aja', 'di sini aja',
  'masih di sini', 'lagi di sini', 'mampir dulu', 'singgah dulu',
  'lagi ngopi', 'ngopi dulu', 'kopi dulu', 'kopi susu dulu',
  'lagi makan', 'makan dulu', 'laper', 'lapar banget',
  'lagi belajar', 'belajar dulu', 'belum selesai', 'masih sibuk',
  'lagi kerja', 'kerja dulu', 'sibuk bentar', 'bentar ya',
  'sekolah dulu', 'kuliah dulu', 'pulang dulu', 'perjalanan pulang',
  'lagi ngegame', 'main dulu', 'mabar dulu',
  'lagi nonton', 'nonton dulu', 'lagi dengerin musik',
];

// ── INDONESIA: mood ───────────────────────────────────────────────
const BIO_ID_MOOD = [
  'lagi gabut', 'gabut aja', 'bosen', 'bosen banget',
  'lagi rebahan', 'rebahan aja', 'mager', 'malas gerak',
  'ngantuk', 'belum tidur', 'begadang lagi', 'tidur siang',
  'capek', 'lelah', 'butuh istirahat', 'haus',
  'seneng', 'bahagia', 'lagi seneng', 'hati senang',
  'sedih', 'galau', 'baper', 'biasa aja',
  'overthinking', 'kepikiran', 'mikir terus',
];

// ── INDONESIA: sifat ──────────────────────────────────────────────
const BIO_ID_SIFAT = [
  'anak rumahan', 'suka diem', 'pendiam', 'introvert',
  'extrovert pas butuh', 'kalem', 'santuy', 'tenang',
  'simpel', 'apa adanya', 'low profile', 'gak neko-neko',
  'sederhana', 'bersahaja', 'humble', 'rendah hati',
  'baik hati', 'ramah', 'sopan', 'gak banyak tingkah',
];

// ── INDONESIA: game ───────────────────────────────────────────────
const BIO_ID_GAME = [
  'main buat seneng', 'main santai aja', 'cuma hibur diri',
  'kolektor item', 'suka condo estetik', 'kolektor avatar',
  'cari temen main', 'open mabar', 'ayo main', 'mabar yuk',
  'main sendiri', 'solo player', 'main kalau ada waktu',
  'main buat healing', 'iseng main', 'coba-coba',
  'main simulator', 'main obby', 'main tycoon', 'main pvp',
  'suka grinding', 'grinder santai', 'suka trading',
  'trader santai', 'open trade', 'cari condo bagus',
  'hobi condo', 'pvp santai', 'no tryhard',
  'f2p sejati', 'gratis aja', 'belum pernah beli',
  'suka bikin avatar', 'sering ganti avatar',
];

// ── INDONESIA: sopan ──────────────────────────────────────────────
const BIO_ID_SOPAN = [
  'jangan lupa istirahat', 'jaga kesehatan', 'semangat ya',
  'have a nice day', 'hati-hati', 'selamat pagi', 'selamat siang',
  'selamat malam', 'semoga harimu baik', 'tetap semangat',
  'jangan lupa makan', 'jangan lupa minum', 'istirahat yang cukup',
  'semoga harimu menyenangkan', 'sehat selalu',
];

// ── INDONESIA: aesthetic ──────────────────────────────────────────
const BIO_ID_AESTHETIC = [
  'senja dan hujan', 'kopi dan senja', 'musik dan hujan',
  'malam yang tenang', 'pagi yang damai', 'suara hujan',
  'langit malam', 'awan sore', 'kota yang ramai', 'jendela kamar',
  'lampu kamar', 'playlist malam', 'lagu galau',
  'suasana senja', 'sore yang tenang', 'suara hujan di jendela',
  'sunyi malam', 'dini hari', 'fajar pertama', 'cahaya pagi',
];

// ── INDONESIA: minimalis ──────────────────────────────────────────
const BIO_ID_MINIMAL = [
  'masih mencari', 'masih belajar', 'masih baru', 'belum tau',
  'tidak tahu', 'entahlah', 'ya begitulah', 'gitu aja',
  'biasa aja', 'gini-gini aja', 'ya gitu deh', 'gak tau ya',
  'terserah', 'apa aja', 'yang penting happy',
];

// ── INDONESIA: pertemanan ─────────────────────────────────────────
const BIO_ID_PERTEMANAN = [
  'cari temen ngobrol', 'cari temen mabar', 'cari temen main',
  'open kenalan', 'boleh kenalan', 'ayo kenalan',
  'jangan sungkan', 'sapa aja', 'dm aja', 'chat aja',
  'open chat', 'open dm', 'sering online',
  'suka ngobrol', 'suka bercanda', 'suka ketawa',
];

// ── HOBBY / INTEREST ──────────────────────────────────────────────
const BIO_HOBBY = [
  'anime watcher', 'manga reader', 'manhwa enjoyer', 'kdrama fan',
  'movie buff', 'series binger', 'music lover', 'playlist maker',
  'bedroom dj', 'drawing', 'painting', 'writing', 'reading',
  'photography', 'editing', 'designing', 'gaming', 'coding',
  'football fan', 'basketball fan', 'badminton player',
  'fitness', 'gym rat', 'running', 'swimming',
  'cooking', 'baking', 'coffee enthusiast', 'tea drinker',
];

// ── Combined ──────────────────────────────────────────────────────
const BIO_STARTS = [
  ...BIO_EN_VIBES,
  ...BIO_EN_AESTHETIC,
  ...BIO_EN_ROBLOX,
  ...BIO_EN_MOOD,
  ...BIO_ID_AKTIVITAS,
  ...BIO_ID_MOOD,
  ...BIO_ID_SIFAT,
  ...BIO_ID_GAME,
  ...BIO_ID_SOPAN,
  ...BIO_ID_AESTHETIC,
  ...BIO_ID_MINIMAL,
  ...BIO_ID_PERTEMANAN,
  ...BIO_HOBBY,
];

// ── Emoji ─────────────────────────────────────────────────────────
const BIO_EMOJI = [
  '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '✦', '✧', '∘', '◇', '◆', '✿', '❀', '❁', '❃', '❋', '✺', '✹',
  '🌙', '⭐', '✨', '🌌', '🪐', '☄️', '🌠', '💫', '🌟', '🌝',
  '🌸', '🌺', '🌻', '🌹', '🌷', '🌼', '🍃', '🌿', '🍀', '🌱',
  '🌊', '☀️', '⛅', '🌧️', '🌨️', '❄️', '🌪️', '🌈', '⚡',
  '☕', '🍵', '🧋', '🎧', '🎐', '🏮', '🕯️', '📚', '📖', '✏️',
  '🎮', '🕹️', '🎯', '👾', '🎲', '🎰', '🃏',
  '🖤', '🤍', '💜', '💙', '💚', '🧡', '❤️', '💖', '💝', '💕',
  '💎', '💠', '🔮', '🎨', '🎭', '🎬', '📷', '🖥️',
  '😎', '🥶', '😴', '💤', '👀', '🙃', '🌚',
];

// ── Status ────────────────────────────────────────────────────────
const STATUS_TEXT = [
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  'brb', 'brb food', 'in a game', 'in lobby', 'in queue',
  'afk', 'afk briefly', 'chilling', 'trading', 'grinding',
  'sleeping', 'at school', 'at work', 'eating', 'music on',
  'on my phone', 'on pc', 'watching yt', 'bored', 'hyped',
  'ready', 'not ready', 'one more game', 'last round',
  'brb mandi', 'brb makan', 'brb tidur', 'brb sekolah',
  'brb kuliah', 'brb kerja', 'brb sholat', 'brb ngopi',
  'lagi mabar', 'lagi main', 'lagi grinding',
  'afk dulu', 'afk bentar', 'afk sebentar',
  'otw', 'sebentar', 'bentar lagi',
  'santai aja', 'chill aja', 'gabut', 'lagi gabut',
  'rebahan', 'lagi rebahan', 'kopi dulu', 'makan dulu',
  'main dulu', 'nongkrong', 'lagi sibuk', 'bentar ya',
  'sedang sibuk', 'dalam perjalanan', 'di jalan',
];

// ═══════════════════════════════════════════════════════════════════
// HELPER
// ═══════════════════════════════════════════════════════════════════

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function int(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ═══════════════════════════════════════════════════════════════════
// ANTI-DUPLIKAT TRACKERS
// ═══════════════════════════════════════════════════════════════════

const recentUsernames = new Set();
const MAX_RECENT_USERNAMES = 5000;

function generateUsername() {
  for (let attempt = 0; attempt < 50; attempt++) {
    const first = pick(FIRST_PARTS);
    const second = pick(SECOND_PARTS);
    const num = int(1, 999999);
    const deco = pick(DECORATIONS);
    const username = `${deco.pre}${first}${deco.suf}${second}${num}`;

    if (!recentUsernames.has(username)) {
      recentUsernames.add(username);
      if (recentUsernames.size > MAX_RECENT_USERNAMES) {
        const firstVal = recentUsernames.values().next().value;
        recentUsernames.delete(firstVal);
      }
      return username;
    }
  }
  return `User${Date.now()}${int(10000, 99999)}`;
}

const recentBios = new Set();
const MAX_RECENT_BIOS = 5000;

function generateBio() {
  // 35% chance gak punya bio sama sekali
  if (Math.random() < 0.35) return null;

  for (let attempt = 0; attempt < 40; attempt++) {
    const roll = Math.random();
    let bio;

    if (roll < 0.5) {
      bio = `${pick(BIO_STARTS)} ${pick(BIO_EMOJI)}`.trim();
    } else if (roll < 0.85) {
      bio = pick(BIO_STARTS);
    } else {
      const a = pick(BIO_STARTS);
      const b = pick(BIO_STARTS);
      const emoji = pick(BIO_EMOJI);
      const parts = [a, b].filter(Boolean);
      bio = parts.join(' · ');
      if (emoji) bio += ` ${emoji}`;
    }

    if (bio && !recentBios.has(bio)) {
      recentBios.add(bio);
      if (recentBios.size > MAX_RECENT_BIOS) {
        const firstVal = recentBios.values().next().value;
        recentBios.delete(firstVal);
      }
      return bio;
    }
  }
  return pick(BIO_STARTS);
}

function gaussian(min, max) {
  const avg = (Math.random() + Math.random()) / 2;
  return Math.floor(min + avg * (max - min));
}

const AVATAR_STYLES = [
  'bottts', 'bottts', 'bottts',
  'adventurer', 'adventurer', 'adventurer',
  'fun-emoji', 'icons', 'shapes', 'thumbs',
  'identicon', 'initials', 'rings', 'glass',
];

function generateAvatar(username) {
  const style = pick(AVATAR_STYLES);
  const seed = encodeURIComponent(username);
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&size=128`;
}

// ═══════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════

export function makeFakeProfile() {
  const username = generateUsername();

  const displayName = Math.random() < 0.3
    ? `${pick(DISPLAY_PREFIX)}${username.split(/[_x]/)[0].replace(/\d+$/, '') || username}`
    : username;

  const avatar = generateAvatar(username);

  const joinTs = int(
    new Date('2014-01-01').getTime(),
    new Date('2025-06-30').getTime()
  );

  const friends     = gaussian(5, 800);
  const followers   = gaussian(10, 25000);
  const following   = gaussian(5, 1200);
  const placeVisits = gaussian(100, 250000);

  const isPremium  = Math.random() < 0.15;
  const isVerified = Math.random() < 0.02;
  const isOnline   = Math.random() < 0.7;

  const bio = generateBio();
  const status = isOnline ? pick(STATUS_TEXT) : '';

  const ageYears = ((Date.now() - joinTs) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);

  const userId = int(100_000_000, 9_999_999_999);

  return {
    username,
    displayName,
    avatar,
    userId,
    bio,
    status,
    joinTs,
    ageYears,
    friends,
    followers,
    following,
    placeVisits,
    isPremium,
    isVerified,
    isOnline,
  };
}

// ── Format bio: STATUS DI BARIS BARU ──
export function formatBio(profile) {
  const lines = [];
  if (profile.bio) lines.push(profile.bio);
  if (profile.status) lines.push(`*${profile.status}*`);
  return lines.join('\n') || '*no bio*';
}

export function badges(profile) {
  const list = [];
  if (profile.isVerified) list.push('✅');
  if (profile.isPremium)  list.push('👑');
  if (profile.isOnline)   list.push('🟢');
  else                    list.push('⚫');
  return list.join(' ');
}
