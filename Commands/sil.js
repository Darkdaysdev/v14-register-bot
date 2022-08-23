const a = require("../settings.js");
const Discord = require("discord.js");
module.exports = {
    name: 'sil',
    description: 'belirttiğiniz kadar mesaj siler',
    aliases: ['sil'],
    usage: `sil`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client, embed) {
if(!message.member.permissions.has('ADMINISTRATOR')) {
    message.reply(`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
    const temizle = args[0]
  if(!temizle) return message.reply("Lütfen bir miktar belirt!").then(x => setTimeout(() => x.delete(), 5000))
  message.channel.bulkDelete(temizle).catch(err => message.reply("Bir hata oluştu.")).then(x => setTimeout(() => x.delete(), 5000))
  
  return message.channel.send(`Başarıyla **${temizle}** mesaj çöp kutusuna atıldı.`).then(x => setTimeout(() => x.delete(), 5000))
}
   }