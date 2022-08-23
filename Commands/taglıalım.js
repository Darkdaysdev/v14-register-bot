const a = require("../settings.js");
const Discord = require("discord.js");
const isimler = require("../Models/names");
const regstats = require("../Models/registerStats");
module.exports = {
    name: 'taglıalım',
    description: 'sunucuda taglı alımı açıp kapatır',
    aliases: ['taglıalım', 'taglialim'],
    usage: `taglıalım Aç/Kapat`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client, embed) {
if(!message.member.permissions.has('ADMINISTRATOR')) {
    message.reply(`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`).then(x => setTimeout(() => x.delete(), 5000))
    return }
    
let data = await regstats.findOne({ guildID: message.guild.id })
    if(!data) new regstats({guildID: message.guild.id, tagMode: false}).save();

const buttonlar = new Discord.ActionRowBuilder()
   .addComponents(
   new Discord.ButtonBuilder()
					.setCustomId('aç')
					.setLabel('Aç')
					.setStyle(Discord.ButtonStyle.Success),
    new Discord.ButtonBuilder()
					.setCustomId('kapat')
					.setLabel('Kapat')
					.setStyle(Discord.ButtonStyle.Danger),
     );
let mesaj = await message.reply({content: `Bu komut sunucu içerisinde taglı alımı açıp kapatmanıza yarar.\n\`\`\`diff\n- Taglı alım modu şuan (${data && data.tagMode === true ? `Açık` : `Kapalı`})\n\`\`\``,  components: [buttonlar] })
    var filter = (button) => button.user.id === message.author.id;
    const collector = mesaj.createMessageComponentCollector({ filter, time: 60000 })

    collector.on("collect", async(button) => {
        if(button.customId === "aç") {
            buttonlar.components[0].setDisabled(true)
            buttonlar.components[1].setDisabled(true)
            mesaj.edit({ components: [buttonlar] })
            mesaj.edit(`Taglı alım modu başarıyla aktif edildi! Kayıtlı olup tagı olmayan kullanıcılar kayıtsıza atılacak. (Boost, Vip üyeler hariç)`)
            data.tagMode = true;
            data.save();
        } else if(button.customId === "kapat") {
            buttonlar.components[0].setDisabled(true)
            buttonlar.components[1].setDisabled(true)
            mesaj.edit({ components: [buttonlar] })
            mesaj.edit(`Taglı alım modu başarıyla kapatıldı!`)
          data.tagMode = false;
          data.save();
            }            
    })  

    collector.on("end", async(button) => {
        buttonlar.components[0].setDisabled(true)
        buttonlar.components[1].setDisabled(true)
        
        mesaj.edit({ components: [buttonlar] })
    })
}
}