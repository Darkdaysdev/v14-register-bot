const a = require("../settings.js");
const Discord = require("discord.js");
module.exports = {
    name: 'yaz',
    description: 'bota yazı yazdırırsın',
    aliases: ['yaz'],
    usage: `yaz`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client) {
  if (!message.guild) return 
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.').then(x => setTimeout(() => x.delete(), 5000))
message.channel.send(mesaj)
}
}
