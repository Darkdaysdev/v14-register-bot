const a = require("../settings.js");
const Discord = require("discord.js");
const taggeds = require("../Models/taggeds");
const Users = require("../Models/Users");
module.exports = {
    name: 'tagaldır',
    description: 'tag aldırırsınız',
    aliases: ['tagaldır', 'tag-aldır'],
    usage: `tagaldır`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client, embed) {
if(!a.roles.registerStaff.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) {
    message.reply(`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.reply({content: "Bir üye belirtmelisin!"}).then(x => setTimeout(() => x.delete(), 5000)) 
    return }
     if(!a.guild.tags.some(s => member.user.username.includes(s) || member.user.discriminator.includes(s) || member.user.tag.includes(s))) {
  {  
    message.reply({embeds: [embed.setDescription(`${member.toString()} isimli üyenin kullanıcı adında tagımız (\`Riâ - Ria - ? - 2018\`) olmadığı için tag aldıramazsınız.`)]}).then(x => setTimeout(() => x.delete(), 5000))
    return }}
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (taggedData && taggedData.taggeds.includes(member.user.id)) 
    {
    message.reply({content: "Bu üyeye zaten daha önce tag aldırmışsın!"}).then(x => setTimeout(() => x.delete(), 5000))  
    return }
   const buttonlar = new Discord.ActionRowBuilder()
   .addComponents(
   new Discord.ButtonBuilder()
					.setCustomId('evet')
					.setLabel('Onayla')
					.setStyle(Discord.ButtonStyle.Success),
   new Discord.ButtonBuilder()
					.setCustomId('hayir')
					.setLabel('İptal')
					.setStyle(Discord.ButtonStyle.Danger),
     );
   message.channel.send({components: [buttonlar], content: `${member}, ${message.author} Kişisi Sana Tag Aldırmak İstiyor Kabul Ediyor Musun?` })
     .then(async function(mesaj){
 mesaj.createMessageComponentCollector(user => user.clicker.user.id == member.id).on(`collect`, async(button) => {
    
  if(button.user.id !== member.id) return button.reply({content: `<@${button.user.id}> Bu Sistem Sizin İçin Ayarlanmamış!`, ephemeral: true})
  if(button.customId == "evet") {
  await taggeds.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { taggeds: member.user.id } }, { upsert: true });
 await Users.updateOne({ id: message.author.id }, { $set: { "Taglandı": true, "Taglayan": message.author.id } }, { upsert: true }).exec();
await Users.updateOne({ id: message.author.id }, { $push: { "Taglılar": { id: message.author.id, Tarih: Date.now() } } }, { upsert: true }).exec();
message.channel.send({content: `${message.author}, ${member} Tag Aldırma İsteğini Onayladı! ✅`})
client.channels.cache.get(a.channels.tagliLog).send({content: `${message.author} \`(${message.author.id}\` kişisi ${member} \`(${member.id})\` kişisini taglıya aldı!`})
          mesaj.delete()
  }
   
 if(button.user.id !== member.id) return button.reply({content: `${message.author}Bu Sistem Sizin İçin Ayarlanmamış!`, ephemeral: true})
  if(button.customId == "hayir") {
message.channel.send({content: `${message.author}, ${member} Tag Aldırma İsteğini Reddetti!`})
mesaj.delete()
  }
 })
   }
   )    
}
   }