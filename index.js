const Discord = require('discord.js')
const client = new Discord.Client({ intents: 32767 })

const preifx = process.env['prefix']
const token = process.env['token']

module.exports = client;

client.commands = new Collection()
client.aliases = new Collection()

require('./handler')(client)

client.on('ready, () => {
          console.log('i am online')
})
client.on('messageCreate, async (message) => {
if (message.content === '+ping') {
  message.reply({ content: 'pong!' })
}
})
client.login(token)
