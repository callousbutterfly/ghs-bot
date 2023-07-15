import { Client, Collection } from "discord.js";
import dotenv from "dotenv";
import slashcommands from "./handlers/slashcommands.js";
import events from "./handlers/events.js";

dotenv.config();

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

let bot = {
    client,
    prefix: "/",
    owners: process.env.ADMINS,
};

client.slashcommands = new Collection();
client.loadSlashCommands = (bot, reload) => slashcommands(bot, reload);
client.loadSlashCommands(bot, false);

client.events = new Collection();
client.loadEvents = (bot, reload) => events(bot, reload);
client.loadEvents(bot, false);

client.on("ready", async () => {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) return console.error("Target guild not found");

    await guild.commands.set([...client.slashcommands.values()]);
});

client.login(OTk1ODUzOTY2MzA0ODgyNzEw.GAFc04.coOFvC_wmt0AHR7MaYUINWXSwDuc95rcinPidU);

export default bot;
