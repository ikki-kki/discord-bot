/**
 * 테스트용: 봇 연결 후 즉시 아침 점검 메시지 1회 전송 후 종료
 * 사용법: node src/test-send.js
 */
require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { sendReminder } = require("./scheduler");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", async () => {
  console.log(`Bot is ready! Sending test morning reminder...`);
  try {
    await sendReminder(client, "morning");
    console.log("Test message sent successfully!");
  } catch (err) {
    console.error("Failed to send test message:", err);
  } finally {
    client.destroy();
    process.exit(0);
  }
});

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error("DISCORD_TOKEN is not set in .env file.");
  process.exit(1);
}

client.login(token).catch((err) => {
  console.error("Failed to login:", err);
  process.exit(1);
});
