const a = require("../settings.js");
const Discord = require("discord.js");
const isimler = require("../Models/names");
const regstats = require("../Models/registerStats");
const { Modal, TextInputComponent, showModal } = require('discord-modals')
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const client = global.client
module.exports = {
    name: 'kayit',
    description: 'kullanıcıyı kayıt edersin',
    aliases: ['k', 'e', 'kayit', 'kayıt'],
    usage: `kayit @Kullanıcı/İD İsim/Yaş`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client, embed) {
const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("e")
            .setLabel("Erkek")
            .setEmoji("997571808343642123")
            .setStyle(Discord.ButtonStyle.Primary),
            new Discord.ButtonBuilder()
            .setCustomId("k")
            .setLabel("Kadın")
            .setEmoji("997571781785292921")
            .setStyle(Discord.ButtonStyle.Primary),
            new Discord.ButtonBuilder()
            .setCustomId("i")
            .setLabel("İptal")
            .setEmoji("982975532457152582")
            .setStyle(Discord.ButtonStyle.Danger)
             );
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!a.roles.registerStaff.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) {
    message.reply(`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
    let setName;
    if(!uye) 
    {
    message.reply(`\`.kayit <@DarkDays/ID>\``).then(x => setTimeout(() => x.delete(), 5000))
      return }
    if(message.author.id === uye.id) 
    {
    message.reply(`Kendini kayıt edemezsin.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
    if(!uye.manageable) 
    {
    message.reply(`Böyle birisini kayıt edemiyorum.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) 
    {
     message.reply(`Senden yüksekte olan birisini kayıt edemezsin.`).then(x => setTimeout(() => x.delete(), 5000))
     return }
    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });
    if (data && data.tagMode === true) {
    if(!a.guild.tags.some(t => !uye.user.username.includes(t) && uye.user.discriminator.includes(t) && !uye.roles.cache.get(a.roles.boosterRole) && !uye.roles.cache.get(a.roles.vipRole) && (x => uye.roles.cache.get(x)))) return message.reply({embeds: [embed.setDescription(`${uye.toString()} isimli üyenin kullanıcı adında tagımız (\`${a.guild.tags}\`) ve <@&${a.roles.boosterRole}>, <@&${a.roles.vipRole}> Rolleri olmadığı için isim değiştirmekden başka kayıt işlemi yapamazsınız.`)]}).then(x => setTimeout(() => x.delete(), 5000))
    }                 
  const datas = await regstats.findOne({ guildID: message.guild.id, userID: message.author.id });
  let m = await message.reply({embeds: [embed.setDescription(`
${uye.toString()} Bu üye daha önce bu isimlerle kayıt olmuş.
    
${message.guild.emojis.cache.find(x => x.name == "red")} Kişinin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu.
${data ? data.names.splice(0, 3).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol}) (<@${x.yetkili}>) [ <t:${Math.floor(x.date / 1000)}> ]`).join("\n") : ``}    

${message.guild.emojis.cache.find(x => x.name == "uyari")} Kişinin önceki isimlerine \`.isimler @DarkDays/ID\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir `)
.setAuthor({name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true })})
.setFooter({text: `• Erkek Kayıt: ${datas ? datas.erkek : 0} • Kız Kayıt: ${datas ? datas.kız : 0} • Toplam kayıt: ${datas ? datas.top : 0}`}).setTimestamp()], components: [row]})
client.on('interactionCreate', async interaction => {
const modal = new ModalBuilder()
            .setCustomId('er')
            .setTitle('Kayıt Forumu');
            const isim = new TextInputBuilder()
            .setCustomId('isim')
          .setLabel("İsim")
          .setStyle(TextInputStyle.Short);
        const yas = new TextInputBuilder()
            .setCustomId('yas')
            .setLabel("Yaş")
          .setStyle(TextInputStyle.Short);
        const firstActionRow = new ActionRowBuilder().addComponents(isim);
        const secondActionRow = new ActionRowBuilder().addComponents(yas);
modal.addComponents(firstActionRow, secondActionRow);
if(interaction.isButton()) {
if(interaction.customId === "e") {	
  await interaction.showModal(modal).catch(e => { console.log(e) });   
  }
    }  
     if (interaction.customId === 'er') {
    const isim = interaction.fields.getTextInputValue('isim');
	const yas = interaction.fields.getTextInputValue('yas');
 if(!isim & !yas)
      { setName = `${uye.user.username.includes(a.guild.tags) ? a.guild.tags : (a.guild.defaultTag ? a.guild.defaultTag : (a.guild.tag || ""))} ${isim}`;
      } else { setName = `${uye.user.username.includes(a.guild.tags) ? a.guild.tags : (a.guild.defaultTag ? a.guild.defaultTag : (a.guild.tag || ""))} ${isim} | ${yas}`;
    }      
  await interaction.reply({embeds: [embed.setDescription(`
${uye.toString()} üyesinin ismi başarıyla \`${(setName)}\` olarak değiştirildi. Bu üye daha önce bu isimlerle kayıt olmuş.
    
${message.guild.emojis.cache.find(x => x.name == "red")} Kişinin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu.
${data ? data.names.splice(0, 3).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol}) (<@${x.yetkili}>) [ <t:${Math.floor(x.date / 1000)}> ]`).join("\n") : ``}    
${message.guild.emojis.cache.find(x => x.name == "uyari")} Kişinin önceki isimlerine \`.isimler @DarkDays/ID\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir `)
.setAuthor({name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true })})
.setFooter({text: `• Erkek Kayıt ${datas ? datas.erkek : 0} • Kız Kayıt ${datas ? datas.kız : 0} • Toplam kayıt: ${datas ? datas.top : 0}`}).setTimestamp()]}).catch(e => { console.log(e) });   
await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id, rol: a.roles.manRoles.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
await uye.roles.add(a.roles.manRoles).catch(e => { console.log(e) });   
await uye.roles.remove(a.roles.unregisterRoles).catch(e => { console.log(e) });   
await uye.setNickname(setName).catch(e => { console.log(e) });   
       m.delete().catch(e => { console.log(e) });   
     }
  })
client.on('interactionCreate', async interaction => {
const modals = new ModalBuilder()
            .setCustomId('ki')
            .setTitle('Kayıt Forumu');
            const isim = new TextInputBuilder()
            .setCustomId('isim')
          .setLabel("İsim")
          .setStyle(TextInputStyle.Short);
        const yas = new TextInputBuilder()
            .setCustomId('yas')
            .setLabel("Yaş")
          .setStyle(TextInputStyle.Short);
        const firstActionRow = new ActionRowBuilder().addComponents(isim);
        const secondActionRow = new ActionRowBuilder().addComponents(yas);
modals.addComponents(firstActionRow, secondActionRow);    
if(interaction.isButton()) {
if(interaction.customId === "k") {	
  await interaction.showModal(modals).catch(e => { console.log(e) });   
  }
    } 
 if (interaction.customId === 'ki') {
    const isim = interaction.fields.getTextInputValue('isim');
	const yas = interaction.fields.getTextInputValue('yas');
 if(!isim & !yas)
      { setName = `${uye.user.username.includes(a.guild.tags) ? a.guild.tags : (a.guild.defaultTag ? a.guild.defaultTag : (a.guild.tag || ""))} ${isim}`;
      } else { setName = `${uye.user.username.includes(a.guild.tags) ? a.guild.tags : (a.guild.defaultTag ? a.guild.defaultTag : (a.guild.tag || ""))} ${isim} | ${yas}`;
    }      
  await interaction.reply({embeds: [embed.setDescription(`
${uye.toString()} üyesinin ismi başarıyla \`${(setName)}\` olarak değiştirildi. Bu üye daha önce bu isimlerle kayıt olmuş.
    
${message.guild.emojis.cache.find(x => x.name == "red")} Kişinin toplamda **${data ? `${data.names.length}` : "0"}** isim kayıtı bulundu.
${data ? data.names.splice(0, 3).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol}) (<@${x.yetkili}>) [ <t:${Math.floor(x.date / 1000)}> ]`).join("\n") : ``}    
${message.guild.emojis.cache.find(x => x.name == "uyari")} Kişinin önceki isimlerine \`.isimler @DarkDays/ID\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir `)
.setAuthor({name: uye.displayName, iconURL: uye.user.displayAvatarURL({ dynamic: true })})
.setFooter({text: `• Kız Kayıt ${datas ? datas.kız : 0} • Erkek Kayıt ${datas ? datas.erkek : 0} • Toplam kayıt: ${datas ? datas.top : 0}`}).setTimestamp()]}).catch(e => { console.log(e) });   
await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: uye.user.id }, { $push: { names: { name: uye.displayName, yetkili: message.author.id, rol: a.roles.womanRoles.map(x => `<@&${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, kız: 1, kız24: 1, kız7: 1, kız14: 1, }, }, { upsert: true });
await uye.roles.add(a.roles.womanRoles).catch(e => { console.log(e) });   
await uye.roles.remove(a.roles.unregisterRoles).catch(e => { console.log(e) });   
await uye.setNickname(setName).catch(e => { console.log(e) });   
       m.delete().catch(e => { console.log(e) });   
     }
if(interaction.customId === "i") {	
uye.setNickname(`• İsim | Yaş`).catch(e => { console.log(e) });   
await uye.roles.set([a.roles.unregisterRoles]).catch(e => { console.log(e) });   
m.delete().catch(e => { console.log(e) });   
}
})
  }}
 