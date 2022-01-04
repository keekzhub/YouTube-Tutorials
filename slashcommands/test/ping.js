const { CommandInteraction, Client, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ping',
  description: 'Displays the bots ping',
  run: async (client, interaction, args) => {
    await interaction.followUp({ content: "pong" })
  }
}
