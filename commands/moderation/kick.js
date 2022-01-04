const { MessageEmbed } = require('discord.js')
const logSchema = require('../../models/logs')

module.exports = {
  name: 'kick',
  UserPerms: ['KICK_MEMBERS'],
  BotPerms: ['KICK_MEMBERS'],
  run: async (client, message, args, Discord) => {
    let reason = args.slice(1).join(' ')

    const user = message.mentions.members.first() || message.guild.members.cache.find(a => a.id == args[0])

    if(!reason) reason = 'No reason given.'

    if (!args[0]) return message.reply({ content: 'please mention a user to kick!'})

    const embed = new MessageEmbed()
    .setTitle(`Successfully kicked ${user.user.username}`)
    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    .setFooter('Kicked by: ' + message.author.username)
    .setTimestamp()

    await user.kick({
      days: 0,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send({ embeds: [embed]}))
    message.delete().catch(err => console.log(err)) // this part is optional, if you want the command to be deleted after the embed is sent.
    const data = await logSchema.findOne({ Guild: user.guild.id })
    if (!data) return

    const logChannel = client.channels.cache.get(data.Channel)

    const embed1 = new MessageEmbed()
    .setTitle('Member kicked!')
    .setDescription(`${user} was kicked!\nReason: ${reason}`)
    .setTimestamp()
    .setColor('RED')

    logChannel.send({embeds: [embed1]})

  }
}
