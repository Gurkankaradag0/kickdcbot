const { Client, GatewayIntentBits, ActivityType } = require('discord.js')

require('./config')()
const loaders = require('./loaders')
const bot = require('./bot')

const subscribeChecker = require('./utils/subscribeChecker')
const liveStream = require('./utils/liveStream')

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
    bot(client)

    await client.login(process.env.CLIENT_TOKEN)

    try {
        await subscribeChecker(client)
        await liveStream(client)
    } catch (err) {
        console.log(`[${new Date()}] First loading error: `, err.message)
    }

    setInterval(async () => {
        try {
            await subscribeChecker(client)
            await liveStream(client)
        } catch (err) {
            console.log(`[${new Date()}] Interval error: `, err.message)
        }
    }, 10 * 60 * 1000) // 10 min
})()
