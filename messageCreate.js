const client = require('../index')
const { Collection } = require('discord.js')

const prefix = process.env['prefix']
const { Collection, Discord, MessageEmbed } = require('discord.js')
const ms = require('ms')

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild) return;

  if (!message.content.startsWith(prefix)) return

  const [cmd, ...args] = message.content
  .slice(prefix.length)
  .trim()
  .split(" ")
  let command = client.commands.get(cmd)

  if (!command) command = client.commands.get(client.aliases.get(cmd))
  if (command) {
    if (!message.member.permissions.has(command.UserPerms || [])) return message.reply({ content: `you need ${command.UserPerms} permission to use this command!`})

    if (!message.guild.me.permissions.has(command.BotPerms || [])) return message.reply({ content: `I need ${command.BotPerms || []} to run this command!`})
    } command.run(client, message, args, Discord)
  }
 })
client.snipes = new Map();
client.on('messageDelete', async function (message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null // this is it for the regular snipe comamnd
  })
})
client.esnipes = new Collection()
client.on('messageUpdate', async (oldMes, newMes) => {
  let esnipes = client.esnipes.get(oldMes.channel.id) || [];
  if (esnipes.length > 5) esnipes = esnipes.slice(0, 4)
  esnipes.unshift({
    msg: oldMes,
    newc: newMes,
    author: oldMes.author
  })
  client.esnipes.set(oldMes.channel.id, esnipes)
})
