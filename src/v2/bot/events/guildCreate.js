const { Events } = require('discord.js')
const registerCommands = require('../../utils/registerCommands')

module.exports = (client) => {
    client.once(Events.GuildCreate, (guild) => {
        registerCommands(guild)
    })
}
