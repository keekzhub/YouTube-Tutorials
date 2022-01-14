const { Collection, Client } = require('discord.js')
const client = new Client({ intents: 32767 })
const server = require('./server.js')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://zox:Cminami.12@database.xcmtd.mongodb.net/zox?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true}).then(console.log('connected to the database'))

const prefix = process.env['prefix']

const token = process.env['token']


module.exports = client;

client.commands = new Collection()
client.aliases = new Collection()
client.slashcommands = new Collection()

require('./handler')(client)


client.login(token)
