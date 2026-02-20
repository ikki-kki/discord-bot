require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { startScheduler } = require("./scheduler");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Bot is ready! Logged in as ${client.user.tag}`);
  startScheduler(client);
});

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error("DISCORD_TOKEN is not set in .env file. Please add your bot token.");
  process.exit(1);
}

client.login(token).catch((err) => {
  console.error("Failed to login:", err);
  process.exit(1);
});
