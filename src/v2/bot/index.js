const commands = require('./commands')
const utils = require('./utils')
const events = require('./events')

module.exports = (client) => {
    commands(client)
    utils(client)
    events(client)
}
