const { webkit } = require('playwright')
const Pusher = require('pusher-js')
const { decrypt } = require('../utils/encryption')
const { insert } = require('../services/Users')

global.chatRoom = null
global.pusher = new Pusher('32cbd69e4b950bf97679', {
    cluster: 'us2'
})

const connectChatRoom = async () => {
    const browser = await webkit.launch({ headless: true })
    const context = await browser.newContext({ ignoreHTTPSErrors: true })
    const page = await context.newPage()

    await page.goto(`https://kick.com/api/v1/channels/${process.env.KICK_BOT_NAME}`)
    const body = await page.evaluate(() => JSON.parse(document.body.innerText))

    console.log('Connected channel:', body.chatroom?.id, `(${process.env.KICK_BOT_NAME})`)

    global.chatRoom = global.pusher.subscribe(`chatrooms.${body.chatroom?.id}.v2`)
    global.chatRoom.bind('App\\Events\\ChatMessageEvent', async (data) => {
        if (data.type === 'message') {
            let decryptedContent = ''
            try {
                decryptedContent = decrypt(data.content)
            } catch (err) {
                console.log(`[${new Date()}] Decrpt error:`, err.message)
                decryptedContent = ''
            }
            if (decryptedContent) {
                const _user = await insert({ ...data, discordId: decryptedContent })
                console.log(`[${new Date()}] Created user:`, JSON.stringify(_user, null, 4))
            }
        }
    })

    await browser.close()
}

module.exports = {
    connectChatRoom
}
