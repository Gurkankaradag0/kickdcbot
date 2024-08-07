const { Collection } = require('discord.js')

const embed = require('./embed')
const emoji = require('./emoji')
const streamEmbed = require('./streamEmbed')

module.exports = (client) => {
    client.utils = new Collection()

    const utils = [embed, emoji, streamEmbed]

    utils.forEach((util) => client.utils.set(util.name, util.execute))
}
