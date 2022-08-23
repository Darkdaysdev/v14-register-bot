const a = require("../settings.js");
const Discord = require("discord.js");
const taggeds = require("../Models/taggeds");
const Users = require("../Models/Users");
module.exports = {
    name: 'toptaglı',
    description: 'tagli verilerini atar',
    aliases: ['toptagli', 'toptaglı'],
    usage: `toptaglı`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client, embed) {
if(!a.roles.registerStaff.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) {
    message.reply(`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
Users.find().exec((err, data) => {
      data = data.filter(m => message.guild.members.cache.has(m.id));
      let topTagli = data.filter(x => x.Taglılar).sort((uye1, uye2) => {
        let uye2Toplam2 = 0;
        uye2Toplam2 = uye2.Taglılar.length
        let uye1Toplam2 = 0;
        uye1Toplam2 = uye1.Taglılar.length
      return uye2Toplam2-uye1Toplam2;
    }).slice(0, 20).map((m, index) => {
        let uyeToplam2 = 0;
        uyeToplam2 = m.Taglılar.length
        return `\`${index == 0 ? `👑` : `${index+1}.`}\` ${message.guild.members.cache.get(m.id).toString()} toplam taglıları \`${uyeToplam2} üye\` ${m.id == message.member.id ? `**(Siz)**` : ``}`;
    }).join('\n');
 message.channel.send({embeds: [embed
.setDescription(`**Sunucunun Toplam Tag Aldırma Bilgileri:** \n${topTagli ? `${topTagli}` : `Sunucu da taglı bilgileri bulunamadı.`}`)
 .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})]})
           })    
    }
  }