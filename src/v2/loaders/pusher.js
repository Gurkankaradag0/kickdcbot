const { webkit } = require('playwright')
const Pusher = require('pusher-js')
const { decrypt } = require('../utils/encryption')
const { getUser, insertUser, updateUser } = require('../services/Users')

global.chatRoom = null
global.pusher = new Pusher('32cbd69e4b950bf97679', {
    cluster: 'us2'
})
global.interactions = {}

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
                const [discordId, interactionId] = decryptedContent.split(':')
                if (global.interactions?.[interactionId]) {
                    clearInterval(global.interactions[interactionId].interval)
                    const user = await getUser(discordId)

                    let _user = null
                    try {
                        if (!user) {
                            _user = await insertUser({ ...data, discordId })
                        } else {
                            _user = await updateUser({ ...data, discordId })
                        }
                        console.log(`[${new Date()}] Created/Updated user:`, JSON.stringify(_user, null, 4))
                        await global.interactions[interactionId].interaction.editReply({
                            content: `Your Kick account (\`\`${_user.kickSlug}\`\`) has been linked successfully.`,
                            ephemeral: true
                        })
                        delete global.interactions[interactionId]
                    } catch (err) {
                        console.log(`[${new Date()}] Duplicated user:`, err.message)
                        await global.interactions[interactionId].interaction.editReply({
                            content: `This Kick account is already connected to a discord account.`,
                            ephemeral: true
                        })
                    }

                    delete global.interactions[interactionId]
                }
            }
        }
    })

    await browser.close()
}

module.exports = {
    connectChatRoom
}
