const a = require("../settings.js");
const Discord = require("discord.js");
module.exports = {
    name: 'say',
    description: 'sunucu verilerini atar',
    aliases: ['say'],
    usage: `say`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client, embed) {
if(!a.roles.registerStaff.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) {
    message.reply(`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
    const mapping = {
       "0":  "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
};
  "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});
  let top = message.guild.memberCount;
  let sunucu = 
      `${top}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
    let tagges = message.guild.members.cache.filter(s => a.guild.tags.some(a => s.user.tag.toLowerCase().includes(a))).size
    let tag = 
      `${tagges}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
    let ses = message.guild.members.cache.filter(s => s.voice.channel).size
    let s = 
      `${ses}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
    let boost = message.guild.premiumSubscriptionCount;
    let b = 
      `${boost}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
    let boostlevel = message.guild.premiumTier
 let online = message.guild.members.cache.filter(member => member.presence && (member.presence.status != "offline")).size
    let o = 
      `${online}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
  message.channel.send({
        embeds: [embed
.setDescription(`
Seste toplam **${s}** kullanıcı bulunmakta.
Sunucumuzda toplam **${b}** takviye bulunmakta. (**${boostlevel} seviye**)
Tagımızda toplam **${tag}** kullanıcı bulunmakta.
Sunucumuzda toplam **${sunucu}** kullanıcı bulunmakta **(${o})** aktif.
`)            
.setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
]
    })
    }
  }