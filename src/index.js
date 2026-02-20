require("dotenv").config();
const http = require("http");
const { Client, GatewayIntentBits } = require("discord.js");
const { startScheduler, sendReminder } = require("./scheduler");

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
  startTestServer(client);
});

function startTestServer(client) {
  const port = process.env.PORT || 8080;

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || "/", `http://localhost`);
    if (url.pathname === "/test-send" && req.method === "GET") {
      try {
        await sendReminder(client, "morning");
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Test message sent!");
      } catch (err) {
        console.error("Test send failed:", err);
        res.writeHead(500);
        res.end("Failed: " + err.message);
      }
      return;
    }
    res.writeHead(404);
    res.end("Not Found");
  });

  server.listen(port, () => {
    console.log(`Test server: GET /test-send (port ${port})`);
  });
}

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error(
    "DISCORD_TOKEN is not set in .env file. Please add your bot token."
  );
  process.exit(1);
}

client.login(token).catch((err) => {
  console.error("Failed to login:", err);
  process.exit(1);
});
