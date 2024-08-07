const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'embed',
    execute(description, color = 0, title = '') {
        const response = new EmbedBuilder({
            description,
            color,
            title
        })

        return response
    }
}
