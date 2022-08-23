const Discord = require("discord.js")
const fs = require("fs");
const moment = require('moment');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = (global.client = new Client({
	intents: [98303, 
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
    ]
}))
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection()
const mongoose = require('mongoose');
const a = require("./settings.js");
mongoose.connect(a.bot.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(m => setTimeout(() => { console.log('Database bağlandı!') }, 3000)).catch(err => setTimeout(() => { console.log('Database bağlanamadı!!') }, 3000));
//Bot login
client.login(a.bot.botToken).then(m => setTimeout(() => { console.log('bot bağlandı!') }, 3000)).catch(err => { console.log('Bota giriş yapılırken başarısız olundu!!') })

//Command Handler
fs.readdir("./Commands/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./Commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(props.name, {
      name: props,
      ...props,
    });
console.log(`${client.commands.size} komut yüklendi.`);
});
});
  //Event Handler
const eventFiles = fs.readdirSync('./Events');
eventFiles.forEach(files => {
  const prop = require(`./Events/${files}`)
  if (!prop.event) return
  client.on(prop.event.name, prop);
});
console.log(`${eventFiles.length} event yüklendi.`);

 
//Tag alana rol
client.on('userUpdate', async (old, nev) => {
  let guild = await (client.guilds.cache.get(a.guild.guildID))
  let uye = guild.members.cache.get(old.id)
let tagges = guild.members.cache.filter(s => a.guild.tags.some(a => s.user.tag.toLowerCase().includes(a))).size
  let tagrol = guild.roles.cache.get(a.roles.tagRole);
  let log = guild.channels.cache.get(a.channels.tagLog)
  if (old.username != nev.username || old.tag != nev.tag || old.discriminator != nev.discriminator) {

    if (a.guild.tags.some(tag => nev.tag.toLowerCase().includes(tag))) {
      if (!uye.roles.cache.has(tagrol.id)) {
        uye.roles.add(tagrol.id).catch(e => { });
        uye.setNickname(uye.displayName.replace(a.guild.defaultTag, a.guild.tag)).catch(e => { });
        if (log) log.send({ embeds: [new Discord.EmbedBuilder().setDescription(`
${uye}, Adlı Üye Ailemize Katıldı.

\`\`\`fix
❯ İsim Değişikliği: ${old.tag} => ${nev.tag}
\`\`\`
`)] })
      } else {
        uye.setNickname(uye.displayName.replace(a.guild.defaultTag, a.guild.tag)).catch(e => { });
      }
} else {
      if (!uye.roles.cache.has(tagrol.id)) {
        uye.setNickname(uye.displayName.replace(a.guild.tag, a.guild.defaultTag)).catch(e => { });
      } else {
        uye.roles.remove(uye.roles.cache.filter(s => s.position >= tagrol.position)).catch(e => { });
        uye.setNickname(uye.displayName.replace(a.guild.tag, a.guild.defaultTag)).catch(e => { });
        if (log) log.send({ embeds: [new Discord.EmbedBuilder().setDescription(`
${uye}, Adlı Üye Tagımızı Bıraktı.
\`\`\`fix
❯ İsim Değişikliği: ${old.tag} => ${nev.tag}
\`\`\`
`)] })
}
    }
  }
});
client.on('messageCreate', message =>{
let taglar = ['tag','TAG','Tag',,`!tag`,`!Tag`,`!TAG`,`.tag`,`.Tag`,`.TAG`]
  if(message.author.bot) return
  if(taglar.some(r=>message.content.toLowerCase() ===r )){
    message.reply(`**${a.guild.tags}**`) 
  }
   })


