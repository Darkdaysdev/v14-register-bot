const ayar = require('../settings.js');
const regstats = require("../Models/registerStats");
const Discord = require('discord.js');
const client = global.client
const moment = require("moment");
require('moment-duration-format');
moment.locale("tr");
module.exports = member => {     
const tagModedata = regstats.findOne({ guildID: ayar.guild.guildID })
let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;       
if (ayar.guild.tags.some(s => member.user.username.includes(s) || member.user.discriminator.includes(s) || member.user.tag.includes(s))) member.roles.add(ayar.roles.tagRole).catch(e => { })
  let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7 * 24 * 60 * 60 * 1000;
if (ayar.guild.tags.some(s => member.user.username.includes(s) || member.user.discriminator.includes(s) || member.user.tag.includes(s))) {
      member.roles.add(ayar.roles.tagRole).catch(e => { console.log(e) });
    member.roles.add(ayar.roles.unregisterRoles).catch(e => { console.log(e) });
  client.channels.cache.get(ayar.channels.registerChannel).send(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${ayar.guild.tags} sembolü bulunuyor.`)
  }
  if (isMemberFake) {
    let olusturma = `(\`${moment.duration(Date.now() - member.user.createdTimestamp).locale('tr').format('Y [yıl], M [Ay], D [Gün]')}\`)`
      member.roles.set([ayar.roles.suspeciousRole]).catch(e => { console.log(e) });
   member.roles.set([ayar.roles.suspeciousRole]).catch(e => { console.log(e) });
    member.setNickname(ayar.guild.suspeciousName).catch(e => { console.log(e) });
  member.setNickname(ayar.guild.suspeciousName).catch(e => { console.log(e) });
  let channel = client.channels.cache.get(ayar.channels.registerChannel)
    member.roles.set([ayar.roles.suspeciousRole]).catch(e => { console.log(e) });
   member.setNickname(ayar.guild.suspeciousName).catch(e => { console.log(e) });
    if (channel) channel.send({
      content: `
${member}, Adlı kullanıcı sunucuya katıldı fakat hesabı yeni olduğu için şüpheli hesap rolünü verdim. <t:${Math.floor(member.user.createdTimestamp/ 1000)}:R>`
    });
    }
client.channels.cache.get(ayar.channels.registerChannel).send({
      content: `
Sunucumuz'a hoş geldin ${member}! Seninle birlikte sunucumuz **${member.guild.memberCount}** kişi oldu!
                
Hesabın <t:${Math.floor(member.user.createdTimestamp/ 1000)}> (<t:${Math.floor(member.user.createdTimestamp/ 1000)}:R>) tarihinde oluşturulmuş. ${guvenilirlik ? `❌` : `✅` }

Tagımızı **(\`${ayar.guild.tags}\`)** alarak bize destek olabilirsin. ${client.channels.cache.get(ayar.channels.rulesChannel)} kanalındaki kurallarımızı okuduğun varsayılarak kaydediliceksin.

Kayıt olmak için <#${ayar.channels.registerVoice}> kanalında bekleyebilirsin. Yetkililerimiz sizinle ilgilenicektir. ${tagModedata ? tagModedata.tagMode === true ? `(**Şuan da taglı alımdayız**)`:``:``} :tada::tada::tada:
 `
        })    
member.roles.add(ayar.roles.unregisterRoles).catch(e => { });
    member.setNickname(ayar.guild.defaultName).catch(e => { });
   member.setNickname(ayar.guild.defaultName).catch(e => { console.log(e) });
     member.roles.add(ayar.roles.unregisterRoles).catch(e => { console.log(e) });    
}
module.exports.event = {
    name: "guildMemberAdd"
}