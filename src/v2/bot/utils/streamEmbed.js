const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'stream-embed',
    execute(title, profile_pic, category, viewers, thumbnail, botName) {
        const response = new EmbedBuilder()
            .setColor(0x53fc18)
            .setTitle(title)
            .setURL(`https://kick.com/${process.env.KICK_CHANNEL_NAME}`)
            .setAuthor({ name: `${process.env.KICK_CHANNEL_NAME} is now live on Kick!`, iconURL: profile_pic })
            .addFields(
                { name: 'Category', value: category, inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: 'Viewers', value: viewers, inline: true }
            )
            .setImage(thumbnail)
            .setTimestamp()
            .setFooter({ text: botName })

        return response
    }
}
