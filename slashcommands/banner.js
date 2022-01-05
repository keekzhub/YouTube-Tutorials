const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const token = process.env['token']
module.exports = {
  name: 'banner', 
  description: 'Get someones banener',
  options: [{
      name: 'member',
      description: 'The persons whose banner you would like to see',
      type: 'USER',
      required: 'false'
    ]},
    run: async (client, message, args, Discord) => {
    const { user } = interaction.options.get('member')
  
    axios.get(`https://discord.com/api/users/${user.id}`,
              {
      headers: {
          Authorization: `Bot ${token}`, // make sure you include token at the top of your file
      },
    }).then((res) => {
        const { banner, accent_color } = res.data
        
        if (banner) {
            const extension = banner.startsWith("a_") ? ".gif" : ".png"
            const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`
            
            const embed = new MessageEmbed()
            .setTitle(`${user.tag}'s Banner`)
            .setImage(url)
            .setColor(accent_color || '#ff0000')
            
            interaction.followUp({ embeds: [embed] })
        } else {
          if (accent_color) {
            const embed2 = new MessageEmbed()
            .setDescription(`${user.tag} does not have a banner, here is their accent color.`)
            .setColor(accent_color)
            
            interaction.followUp({ embeds: [embed2]
             } else {
               interaction.followUp(`${user.tag} does not have a banner or accent color. `)
                }
             }
          })
       }
     }
