const guildCreate = require('./guildCreate')
const interactionCreate = require('./interactionCreate')
const ready = require('./ready')

module.exports = (client) => {
    const events = [ready, guildCreate, interactionCreate]
    events.forEach((event) => event(client))
}
