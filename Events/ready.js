const Discord = require("discord.js");
const a = require('../settings.js');
const client = global.client
module.exports = async () => {
    let guild = client.guilds.cache.get(a.guild.guildID);
    if (!guild) return;
    setInterval(() => {
      const oynuyor = a.bot.botStatus;
      const index = Math.floor(Math.random() * (oynuyor.length));

      client.user.setPresence({
            activities: [
                {
                    name: `${oynuyor[index]}`,
                     }
            ],
        status: "idle",
        });
    }, 10000);
};
module.exports.event = {
    name: "ready"
}