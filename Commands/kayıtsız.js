const a = require("../settings.js");
const Discord = require("discord.js");
const isimler = require("../Models/names");
const regstats = require("../Models/registerStats");
module.exports = {
    name: 'kayıtsız',
    description: 'kullanıcıyı kayıtsıza atarsınız',
    aliases: ['kayitsiz', 'kayıtsız'],
    usage: `kayitsiz @Kullanıcı/İD`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client, embed) {
if(!a.roles.registerStaff.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) {
    message.reply(`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
  let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    if (!member) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Bir kullanıcı belirtmelisin. `)] }).then(x => setTimeout(() => x.delete(), 5000))
    if (member.user.bot) return message.channel.send({ embeds: [embed.setDescription(`${message.member} kayıtsıza attığın kullanıcı bir bot olamaz!`)] }).then(x => setTimeout(() => x.delete(), 5000))
    if (member.user.id == message.member.id) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Kendini kayıtsıza atamazsın!`)] }).then(x => setTimeout(() => x.delete(), 5000))
    if (member.user.id == message.guild.ownerId) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Sunucu sahibini kayıtsıza atamazsın!`)] }).then(x => setTimeout(() => x.delete(), 5000))
    if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Bu kullanıcı sizden üst/aynı pozisyonda.`)] }).then(x => setTimeout(() => x.delete(), 5000))
    if (member.roles.cache.has(a.roles.boosterRole)) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Booster bir kullanıcıyı kayıtsıza atamazsın!`)] }).then(x => setTimeout(() => x.delete(), 5000))
    
    await member.roles.set([a.roles.unregisterRoles]).catch();
    await member.setNickname(a.guild.defaultName).catch();
    await message.channel.send({ embeds: [embed.setDescription(`${message.guild.emojis.cache.find(x => x.name == "green")} ${member}, Adlı kullanıcı başarıyla kayıtsıza atıldı!`)] })


}
}