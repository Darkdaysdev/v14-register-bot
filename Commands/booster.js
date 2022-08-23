const a = require("../settings.js");
const Discord = require("discord.js");
module.exports = {
    name: 'booster',
    description: 'boosterlar icin isim degisme',
    aliases: ['b', 'booster', 'firstclass', 'firstclas'],
    usage: `booster`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client, embed) {
if(!message.member.roles.cache.has(a.roles.boosterRole)) {
    message.reply(`Bu Komutu Kullanabilmek İçin Booster Olmalısın!`).then(x => setTimeout(() => x.delete(), 5000))
    return }
    let yasaklar = ["discord.gg/", ".gg/", "discord.gg", "https://discord.gg/"];
    let ism = args.slice(0).join(' ');
    if (ism.length > 32) return message.channel.send({ embeds: [embed.setDescription(`İsmin **32** Karakterden uzun olamaz!`)] }).then(x => setTimeout(() => x.delete(), 5000))
    if (yasaklar.some(s => ism.includes(s))) return message.delete().catch(e => { })
    let name;
    if (a.guild.tags.some(tag => message.author.tag.includes(tag))) {
        name = `• ${ism}`
    } else {
        name = `• ${ism}`
    }
    message.member.setNickname(name).catch(e => { });
    message.channel.send({ embeds: [embed.setDescription(`${message.author}, Yeni ismin **${name}** :partying_face:`)] }).then(x => setTimeout(() => x.delete(), 50000))

    }
   }