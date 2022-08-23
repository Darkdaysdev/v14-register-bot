const a = require("../settings.js");
const Discord = require("discord.js");
const isimler = require("../Models/names");
module.exports = {
    name: 'kb',
    description: 'kullanıcı bilgilerini gösterir',
    aliases: ['kb', 'info'],
    usage: `kb`,
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
  async execute(message, args, client, embed) {
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let durum = member.presence?.status.replace("dnd", "Rahatsız Etmeyin").replace("idle", "Boşta").replace("online", "Aktif").replace("offline", "Çevrimdışı")
  let s = member.presence?.activities[0];
   let aktivite;
  if (s) {
        aktivite = `${s.name ? s.name : s.state ? s.state : ""}`
        } else {
        aktivite = "Yok"
    }
    let nameData = await isimler.findOne({ guildID: message.guild.id, userID: member.id });
  let avatar = member.displayAvatarURL({ dynamic: true, size: 4096 });
      const row = new Discord.ActionRowBuilder()
			.addComponents(
				new Discord.ButtonBuilder()
				.setCustomId('a')
        .setLabel('Avatar Adresi')
        .setStyle(Discord.ButtonStyle.Danger),
        new Discord.ButtonBuilder()
				.setCustomId('b')
        .setLabel('Banner Adresi')
        .setStyle(Discord.ButtonStyle.Danger),
			);
           
    message.channel.send({
        embeds: [embed.setDescription(`
**❯ __Kullanıcı Bilgisi__**
\`❯ ID:\` ${member.id}
\`❯ Profil:\` ${member}
\`❯ Durum:\` **${aktivite} | ${durum || "⚫"}**
\`❯ Oluşturulma tarihi:\` <t:${Math.floor(member.user.createdTimestamp / 1000)}:F> 

**❯ __Üyelik Bilgisi__**
\`❯ Takma Adı:\` ${member.displayName ? member.displayName : member.user.username}
\`❯ Katılma Tarihi:\` <t:${Math.floor(member.joinedTimestamp / 1000)}:R> 
\`❯ Katılım Sırası:\` ${(message.guild.members.cache.filter(a => a.joinedTimestamp <= message.member.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}
\`❯ Rolleri:\` ${member.roles.cache.size > 5 ? "Listelenemedi!" : `${member.roles.cache.filter(s => s.name != "@everyone").map(s => `${s}`).join(',')} (${member.roles.cache.size - 1})`}
\`❯ İsim geçmişi:\`  **${nameData ? `${nameData.names.length}` : "0"}** ${nameData ? nameData.names.splice(0, 1).map((x, i) => `\`${x.name}\` (<@${x.yetkili}>) [ <t:${Math.floor(x.date / 1000)}> ]`).join("\n") : ""}
`)], components: [row]
    }).then(async function(mesaj){
 mesaj.createMessageComponentCollector(user => user.clicker.user.id == message.author.id).on(`collect`, async(button) => {         
            if(button.customId === "a") {
if(button.user.id !== message.author.id) return button.reply({content: `<@${button.user.id}> Bu Sistem Sizin İçin Ayarlanmamış!`, ephemeral: true })
 button.reply({content: `${avatar}`, ephemeral: true})
              }
 if(button.customId === "b") {
if(button.user.id !== message.author.id) return button.reply({content: `<@${button.user.id}> Bu Sistem Sizin İçin Ayarlanmamış!`, ephemeral: true })
 client.users.fetch(member.id, {cache: true, force: true}).then(x => button.reply({content: `${x.bannerURL({dynamic: true, size: 4096 })}`, ephemeral: true})
           )}})})
  }
   }