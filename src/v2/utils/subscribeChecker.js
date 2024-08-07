const { webkit } = require('playwright')
const { getUsers } = require('../services/Users')
const { assignRoleToUser } = require('./roleManager')
const { getSettings } = require('../services/Settings')

const subscribeChecker = async (client) => {
    console.log(`[${new Date()}] subscribeChecker start.`)
    const users = await getUsers()
    const browser = await webkit.launch({ headless: true })
    const context = await browser.newContext({ ignoreHTTPSErrors: true })
    const page = await context.newPage()

    for (const user of users) {
        const settings = await getSettings()
        if (settings?.gid) {
            const _isSubscriber = await isSubscriber(page, user.kickSlug)
            await assignRoleToUser(await client.guilds.fetch(settings.gid), user.discordId, _isSubscriber ? 'add' : 'remove', settings.rid)
        }
    }

    await browser.close()
    console.log(`[${new Date()}] subscribeChecker end.`)
}

const isSubscriber = async (page, kickSlug) => {
    try {
        await page.goto(`https://kick.com/api/v2/channels/${process.env.KICK_CHANNEL_NAME}/users/${kickSlug}`)
        const body = await page.evaluate(() => JSON.parse(document.body.innerText))

        if (Array.isArray(body?.badges)) {
            return body.badges.some((b) => b.type === 'subscriber')
        }
        return false
    } catch (err) {
        console.log(`[${new Date()}] User not found: `, err.message)
        return false
    }
}

module.exports = subscribeChecker
