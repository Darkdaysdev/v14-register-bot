const a = require("../settings.js");
const Discord = require("discord.js");
const isimler = require("../Models/names");
const regstats = require("../Models/registerStats");
module.exports = {
    name: 'isimler',
    description: 'kullanıcının isimlerini görüntülersiniz',
    aliases: ['isimler'],
    usage: `isimler @Kullanıcı/İD`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client, embed) {
if(!a.roles.registerStaff.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) {
    message.reply(`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const data = await isimler.findOne({ guildID: message.guild.id, userID: member.user.id });
     message.reply({embeds: [embed.setDescription(`
<@${member.user.id}> kişisinin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu.

${data ? data.names.splice(0, 5).map((x, i) => `\`${i+1}. ${x.name}\` (${x.rol}) (<@${x.yetkili}>) [ <t:${Math.floor(x.date / 1000)}> ]`).join("\n") : "Daha önce kayıt olmamış."}`)]})
    
    }
  }