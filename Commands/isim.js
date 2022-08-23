const a = require("../settings.js");
const Discord = require("discord.js");
const isimler = require("../Models/names");
const regstats = require("../Models/registerStats");
module.exports = {
    name: 'isim',
    description: 'kullanıcının ismini değişirsin',
    aliases: ['isim', 'i', 'name'],
    usage: `isim @Kullanıcı/İD İsim/Yaş`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client, embed) {
let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!a.roles.registerStaff.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) {
    message.reply(`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
    if(!uye) 
    {
    message.reply(`\`.isim <@DarkDays/ID> <Isim> <Yaş>\``).then(x => setTimeout(() => x.delete(), 5000))
      return }
    if(message.author.id === uye.id) 
    {
    message.reply(`Kendi ismini değişemezsin.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
    if(!uye.manageable) 
    {
    message.reply(`Böyle birisini ismini değişemiyorum.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
   message.reply(`Senden yüksekte olan birisinin ismini değişemezsin.`).then(x => setTimeout(() => x.delete(), 5000))
     return }
    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yas = args.filter(arg => !isNaN(arg))[0] || "";
   if(!isim & yas) 
    {
    message.reply(`\`.isim <@DarkDays/ID> <Isim> <Yaş>\``).then(x => setTimeout(() => x.delete(), 5000))
       return }
  if(!yas)
      { setName = `${uye.user.username.includes(a.guild.tags) ? a.guild.tags : (a.guild.defaultTag ? a.guild.defaultTag : (a.guild.tag || ""))} ${isim}`;
      } else { setName = `${uye.user.username.includes(a.guild.tags) ? a.guild.tags : (a.guild.defaultTag ? a.guild.defaultTag : (a.guild.tag || ""))} ${isim} | ${yas}`;
    }
    message.reply({embeds: [embed.setDescription(`
${uye.toString()} üyenin ismi "${setName}" olarak değiştirildi, bu üye daha önce bu isimlerle kayıt olmuş.

${message.guild.emojis.cache.find(x => x.name == "red")} üyesinin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu
${data ? data.names.splice(0, 3).map((x, i) => `\`${i+1}. ${x.name}\` (${x.rol}) (<@${x.yetkili}>) [ <t:${Math.floor(x.date / 1000)}> ]`).join("\n") : "Daha önce kayıt olmamış."}

${message.guild.emojis.cache.find(x => x.name == "uyari")} Üyenin önceki isimlerine .isimler @DarkDays/ID komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.
`)
.setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})]})
uye.setNickname(setName)
await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: setName, yetkili: message.author.id,  rol: "İsim Değiştirme", date: Date.now() } } }, { upsert: true });

    }
  }