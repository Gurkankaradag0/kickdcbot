const { isExists } = require('../services/Users')
const { encrypt } = require('../utils/encryption')

module.exports = async (message) => {
    if (message.author.bot) return

    if (message.content.toLowerCase() === 'login kick') {
        const userExists = await isExists({ discordId: message.author.id })
        if (userExists) {
            message.author.send(`Already integrated`)
        } else {
            message.author.send(
                `# Discord kick integration\r\n\t- First, go to [${process.env.KICK_BOT_NAME}](https://kick.com/${
                    process.env.KICK_BOT_NAME
                }) page.\r\n- Send this code to chat: \`\`\`${encrypt(message.author.id)}\`\`\``
            )
        }
    }
}
