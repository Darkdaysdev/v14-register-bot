const a = require("../settings.js");
const Discord = require("discord.js");
const isimler = require("../Models/names");
const regstats = require("../Models/registerStats");
module.exports = {
    name: 'teyitler',
    description: 'sunucunun teyitlerini gösterir',
    aliases: ['teyitler'],
    usage: `teyit-top`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client, embed) {
if(!a.roles.registerStaff.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) {
    message.reply(`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
let registerTop = await regstats.find({ guildID: message.guild.id }).sort({ top: -1 });

      if (!registerTop.length) 
      {
      message.reply("Herhangi bir kayıt verisi bulunamadı!").then(x=>x.delete({timeout:5000})) 
      return }
      registerTop = registerTop.filter((x) => message.guild.members.cache.has(x.userID)).splice(0, 30);
      message.reply({embeds: [embed.setDescription((`**${message.guild} Sunucusunun Toplam Kayıt Bilgileri: **\n${registerTop.map((x, i) => `\`${i + 1}.\` <@${x.userID}> - Erkek ${x.erkek} Kız ${x.kız} Toplam ${x.top}`).join('\n')}`))]})
}
}