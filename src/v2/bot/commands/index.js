const { Collection } = require('discord.js')

const streamRoom = require('./streamRoom')
const loginKick = require('./loginKick')

module.exports = async (client) => {
    client.commands = new Collection()

    const commands = [streamRoom, loginKick]

    commands.forEach((command) => client.commands.set(command.data.name, command))
}
