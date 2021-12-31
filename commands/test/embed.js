const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'embed',
  description: 'Creates an embed',
  run: async (client, message, args, Discord) => {
    const embed = new MessageEmbed()
    .setTitle('This is an embed')
    .setAuthor('Author:', 'link to a photo')
    .setDescription('This is the embed description')
    .addFields({
      name: 'Field 1', value: 'hey there'
    },
    {
      name: '\u200b', value: '\u200b'
    },
    { 
      name: 'Field 2', value; 'the embed is now spaced out',
    })
    .setThumbnail('thumbnail url')
    .setColor('RED')
    
    message.channel.send({ embeds: [embed] })
