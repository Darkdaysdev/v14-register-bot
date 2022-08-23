const a = require('../settings.js');
const Discord = require('discord.js');
const client = global.client
module.exports = message => {    

if (!message.content.startsWith(a.bot.botPrefix) || message.author.bot) return;
const cooldowns = client.cooldowns
const args = message.content.slice(a.bot.botPrefix.length).split(/ +/);
const commandName = args.shift().toLowerCase();
let embed = new Discord.EmbedBuilder().setColor('#DD0909').setTimestamp().setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })}).setFooter({ text: `${a.embed}` })
const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

if (!command) return;

if (command.guildOnly && message.channel.type !== 'GUILD_TEXT') {
    return message.reply({ content: "Yetkim Bulunmamakta" }).then(x => setTimeout(() => x.delete(), 5000))
}

if (command.args && !args.length) {
    let reply = `Yanlış Kullanım, ${message.author}!`;

    if (command.usage) {
        reply += `\nDoğru Kullanım: \`${a.bot.botPrefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send({ content: reply }).then(x => setTimeout(() => x.delete(), 5000))

}

if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;

if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply({ content: `Bu komutu kullanmak için ${timeLeft.toFixed(1)} saniye bekleyin.`, allowedMentions: { repliedUser: false }}).then(x => setTimeout(() => x.delete(), 5000))
    }
}

timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
try {
    command.execute(message, args, client, embed);
} catch (error) {
    console.error(error);
    message.reply('Komutu çalıştırırken hata ile karşılaştım geliştiricime ulaşın.').then(x => setTimeout(() => x.delete(), 5000))
}



}
module.exports.event = {
    name: "messageCreate"
}