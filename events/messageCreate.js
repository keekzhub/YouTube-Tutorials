const client = require('../index')

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
