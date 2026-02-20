const cron = require("node-cron");
const { buildMessage } = require("./templates");

const CHANNEL_ID = process.env.CHANNEL_ID;
const ROLE_ID = process.env.ROLE_ID;

/**
 * 점검 리마인더 메시지 전송
 * @param {import("discord.js").Client} client - Discord 클라이언트
 * @param {string} type - 'morning' | 'midday' | 'evening'
 */
async function sendReminder(client, type) {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    const roleMention = `<@&${ROLE_ID}>`;
    const content = buildMessage(type, roleMention);

    await channel.send(content);
    console.log(
      `[${new Date().toISOString()}] Sent ${type} reminder to channel ${CHANNEL_ID}`
    );
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Failed to send ${type} reminder:`,
      error
    );
    throw error;
  }
}

/**
 * 스케줄러 시작 (KST 기준)
 * - 아침 점검: 10:00
 * - 점심 점검: 15:00
 * - 저녁 점검: 00:00 (자정)
 * @param {import("discord.js").Client} client - Discord 클라이언트
 */
function startScheduler(client) {
  cron.schedule(
    "0 10 * * *",
    () => sendReminder(client, "morning").catch(() => {}),
    {
      timezone: "Asia/Seoul",
    }
  );

  cron.schedule(
    "0 15 * * *",
    () => sendReminder(client, "midday").catch(() => {}),
    {
      timezone: "Asia/Seoul",
    }
  );

  cron.schedule(
    "0 0 * * *",
    () => sendReminder(client, "evening").catch(() => {}),
    {
      timezone: "Asia/Seoul",
    }
  );

  console.log(
    "Scheduler started: morning 10:00, midday 15:00, evening 00:00 (KST)"
  );
}

module.exports = { startScheduler, sendReminder };
