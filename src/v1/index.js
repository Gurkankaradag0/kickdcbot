const { Client, GatewayIntentBits, ActivityType } = require('discord.js')

require('./config')()
const loaders = require('./loaders')

const readyEvent = require('./events/ready')
const messageCreateEvent = require('./events/messageCreate')
const subscribeChecker = require('./utils/subscribeChecker')

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages],
    presence: {
        activities: [
            {
                name: 'https://github.com/Gurkankaradag0/kickdcbot',
                type: ActivityType.Custom
            }
        ]
    }
})

;(async () => {
    await loaders()

    client.once('ready', (client) => readyEvent(client))
    client.on('messageCreate', (message) => messageCreateEvent(message))

    setInterval(async () => {
        await subscribeChecker(client)
    }, 10 * 60 * 1000) // 10 min

    await client.login(process.env.CLIENT_TOKEN)
})()
