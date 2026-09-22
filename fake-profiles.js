// =====================================================================
// FAKE USER PROFILE GENERATOR
// Semua data synthetic — nggak nyentuh Roblox API atau user real.
// =====================================================================

const FIRST_PARTS = [
  'Shadow', 'Nova', 'Ghost', 'Pixel', 'Sky', 'Dark', 'Cosmic', 'Iron',
  'Neon', 'Thunder', 'Crimson', 'Silent', 'Mystic', 'Blaze', 'Frost',
  'Void', 'Turbo', 'Wild', 'Knight', 'Zero', 'Rogue', 'Storm', 'Silver',
  'Nitro', 'Quick', 'Epic', 'Alpha', 'Omega', 'Prime', 'Lunar', 'Solar',
  'Mega', 'Ultra', 'Hyper', 'Cyber', 'Astro', 'Aqua', 'Terra', 'Pyro',
];

const SECOND_PARTS = [
  'Hunter', 'Knight', 'Rider', 'Wizard', 'Blade', 'Phoenix', 'Wolf',
  'Fist', 'Samurai', 'Bolt', 'Fox', 'Storm', 'Raven', 'Runner', 'Byte',
  'Walker', 'Ace', 'Card', 'Owl', 'Cool', 'Pilot', 'Breaker', 'Arrow',
  'Kid', 'Sniper', 'Ninja', 'Pirate', 'Mage', 'Titan', 'Giant', 'Reaper',
  'Master', 'Warrior', 'Legend', 'Hero', 'Champion', 'Slayer', 'Drake',
];

const DISPLAY_PREFIX = [
  'The', 'Mr', 'Mrs', 'Sir', 'Lord', 'King', 'Queen', 'Dr', 'Capt',
];

const BIO_LINES = [
  'just here to chill 🎮',
  'condo hunter 🏠',
  'dm me for trades',
  'og player since 2017',
  'add me for free robux (jk)',
  'professional afk-er',
  'chill vibes only ✌️',
  'building my dream condo',
  'grinding 24/7 💪',
  'streamer sometimes',
  'expert obby player',
  'looking for friends',
  'do NOT copy my avatar',
  'not a bot i promise',
  '🏳️‍🌈 he/him',
  'she/her 💕',
  'they/them',
  'add me: same username',
  'daily player',
  'weekend warrior',
  'sleep is for the weak',
  'no drama pls',
  'if u see me say hi',
  'yes i buy robux',
  'nah i dont sell',
  'come to my condo!',
  '4.5 years on roblox',
  'back from a long break',
  'my alt is same name',
  'premium user 👑',
];

const STATUS_TEXT = [
  '', '', '',
  'brb',
  'in a game',
  'afk',
  'chilling',
  'trading',
  'grinding',
  'sleeping',
  'at school',
  'eating',
  'music on',
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function int(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function makeFakeProfile() {
  const first = pick(FIRST_PARTS);
  const second = pick(SECOND_PARTS);
  const num = int(1, 9999);
  const sep = Math.random() < 0.3 ? '_' : '';
  const username = `${first}${sep}${second}${num}`;

  const displayName = Math.random() < 0.3
    ? `${pick(DISPLAY_PREFIX)}${first}`
    : username;

  const avatarStyle = Math.random() < 0.6 ? 'bottts' : 'adventurer';
  const avatar = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${encodeURIComponent(username)}&size=128`;

  const joinTs = int(
    new Date('2015-01-01').getTime(),
    new Date('2024-12-31').getTime()
  );

  const friends     = int(5, 200);
  const followers   = int(10, 5000);
  const following   = int(5, 300);
  const placeVisits = int(100, 50000);

  const isPremium  = Math.random() < 0.15;
  const isVerified = Math.random() < 0.02;
  const isOnline   = Math.random() < 0.7;

  const bio = pick(BIO_LINES);
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

export function formatBio(profile) {
  const parts = [];
  if (profile.bio) parts.push(profile.bio);
  if (profile.status) parts.push(`*${profile.status}*`);
  return parts.join(' · ') || '*no bio*';
}

export function badges(profile) {
  const list = [];
  if (profile.isVerified) list.push('✅');
  if (profile.isPremium)  list.push('👑');
  if (profile.isOnline)   list.push('🟢');
  else                    list.push('⚫');
  return list.join(' ');
}
