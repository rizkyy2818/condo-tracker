import 'dotenv/config';
import { Client, GatewayIntentBits, Events, EmbedBuilder } from 'discord.js';
import {
  GAMES, fmt, bar, colorByLoad,
  randomGame, randomServer,
} from './config.js';
import { makeFakeProfile, formatBio, badges } from './fake-profiles.js';

// ── Client ─────────────────────────────────────────────────────
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

let logChannel = null;
let joinCount = 0;
const sessionStart = Date.now();

// ── Kirim 1 event join ke channel ──────────────────────────────
async function sendJoin() {
  if (!logChannel) return;

  const gIdx = randomGame();
  const game = GAMES[gIdx];
  const server = randomServer(gIdx);
  const profile = makeFakeProfile();

  // Increment fill server
  server.fill = Math.min(server.fill + 1, server.cap);
  server.pct = Math.round((server.fill / server.cap) * 100);

  joinCount++;

  const embed = new EmbedBuilder()
    .setColor(colorByLoad())
    .setAuthor({
      name: `${badges(profile)} ${profile.displayName}`,
      iconURL: profile.avatar,
    })
    .setTitle('🎮 New Join')
    .setDescription(`**@${profile.username}**\n${formatBio(profile)}`)
    .setThumbnail(profile.avatar)
    .addFields(
      { name: '🎯 Server',       value: `\`${server.name}\`\n\`${server.id}\``,         inline: true },
      { name: '🎮 Game',         value: `\`${game.title}\`\n*${game.genre}*`,           inline: true },
      { name: '📊 Slot',         value: `**${server.fill}/${server.cap}** (${server.pct}%)\n\`${bar(server.pct)}\``, inline: true },
      { name: '👥 Friends',      value: `\`${fmt(profile.friends)}\``,                   inline: true },
      { name: '👤 Followers',    value: `\`${fmt(profile.followers)}\``,                 inline: true },
      { name: '📅 Joined',       value: `\`${profile.ageYears}y ago\`\n<t:${Math.floor(profile.joinTs / 1000)}:D>`, inline: true },
      { name: '🆔 User ID',      value: `\`${profile.userId}\``,                         inline: true },
      { name: '⭐ Status',       value: profile.isPremium ? '`Premium`' : '`Free`',      inline: true },
      { name: '🏠 Place Visits', value: `\`${fmt(profile.placeVisits)}\``,               inline: true },
    )
    .setFooter({ text: `Join #${joinCount} · Condo Tracker` })
    .setTimestamp();

  try {
    await logChannel.send({ embeds: [embed] });
    console.log(
      `[JOIN #${joinCount}] @${profile.username} → ${game.title} / ${server.name} (${server.fill}/${server.cap})`
    );
  } catch (err) {
    console.error('[SEND] Gagal:', err.message);
  }
}

// ── Loop tak terbatas ──────────────────────────────────────────
function nextDelay() {
  const min = Number(process.env.MIN_DELAY ?? 5000);
  const max = Number(process.env.MAX_DELAY ?? 15000);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function loop() {
  setTimeout(async () => {
    await sendJoin();
    loop();
  }, nextDelay());
}

// ── Heartbeat stats tiap 1 jam ─────────────────────────────────
function startHeartbeat() {
  setInterval(async () => {
    if (!logChannel) return;

    const totalVisits = GAMES.reduce((a, g) => a + g.visits, 0);
    const totalLikes  = GAMES.reduce((a, g) => a + g.likes, 0);
    const totalActive = GAMES.reduce((a, g) => a + g.baseActive, 0);
    const uptimeMin = Math.floor((Date.now() - sessionStart) / 60000);

    const embed = new EmbedBuilder()
      .setColor(0x4b362a)
      .setTitle('📊 Live Stats')
      .addFields(
        { name: 'Total Visits',  value: `\`${fmt(totalVisits)}\``, inline: true },
        { name: 'Total Likes',   value: `\`${fmt(totalLikes)}\``,  inline: true },
        { name: 'Playing Now',   value: `\`${fmt(totalActive)}\``, inline: true },
        { name: 'Joins Tracked', value: `\`${joinCount}\``,        inline: true },
        { name: 'Games Live',    value: `\`${GAMES.length}\``,     inline: true },
        { name: 'Bot Uptime',    value: `\`${uptimeMin}m\``,       inline: true },
      )
      .setFooter({ text: 'Heartbeat · tiap 1 jam' })
      .setTimestamp();

    logChannel.send({ embeds: [embed] }).catch(() => {});
  }, 60 * 60 * 1000);
}

// ── Ready ──────────────────────────────────────────────────────
client.once(Events.ClientReady, async (c) => {
  console.log(`[BOT] Login sebagai ${c.user.tag}`);
  console.log(`[BOT] Uptime start: ${new Date().toISOString()}`);

  const chId = process.env.LOG_CHANNEL_ID;
  if (!chId) {
    console.error('[BOT] LOG_CHANNEL_ID belum di-set di Railway Variables');
    process.exit(1);
  }

  logChannel = await c.channels.fetch(chId).catch(() => null);
  if (!logChannel) {
    console.error('[BOT] Channel nggak ketemu:', chId);
    process.exit(1);
  }

  console.log(`[BOT] Log channel: #${logChannel.name}`);
  console.log(`[BOT] Join interval: ${process.env.MIN_DELAY}–${process.env.MAX_DELAY}ms`);

  loop();
  startHeartbeat();
});

// ── Error guard ────────────────────────────────────────────────
process.on('unhandledRejection', (err) => {
  console.error('[UNHANDLED]', err);
});
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT]', err);
});

client.login(process.env.DISCORD_TOKEN);
