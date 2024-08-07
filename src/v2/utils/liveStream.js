const { webkit } = require('playwright')
const { getSettings, updateLastStream } = require('../services/Settings')

const liveStream = async (client) => {
    console.log(`[${new Date()}] liveStream start.`)
    const browser = await webkit.launch({ headless: true })
    const context = await browser.newContext({ ignoreHTTPSErrors: true })
    const page = await context.newPage()

    try {
        await page.goto(`https://kick.com/api/v1/channels/${process.env.KICK_CHANNEL_NAME}`)
        const body = await page.evaluate(() => JSON.parse(document.body.innerText))

        if (body.livestream) {
            if (body.livestream.is_live) {
                const settings = await getSettings()
                const { session_title: title, categories, viewer_count, thumbnail, start_time } = body.livestream
                const { profile_pic } = body.user
                if (!settings.lastStream || settings.lastStream !== start_time) {
                    if (settings.streamRoom) {
                        try {
                            const guild = await client.guilds.fetch(settings.gid)
                            const channel = await guild.channels.fetch(settings.streamRoom)

                            channel.send({
                                content: settings.streamRoomContent,
                                embeds: [
                                    client.utils.get('stream-embed')(
                                        title,
                                        profile_pic,
                                        categories[0].name,
                                        viewer_count.toString(),
                                        thumbnail.url,
                                        client.user.tag
                                    )
                                ]
                            })
                            await updateLastStream(start_time)
                        } catch (err) {
                            console.log(`[${new Date()}] An error occurred while sharing the announcement: `, err.message, err)
                        }
                    } else {
                        console.log(`[${new Date()}] The announcement channel not defined.`)
                    }
                } else {
                    console.log(`[${new Date()}] The announcement has already been shared.`)
                }
            } else {
                console.log(`[${new Date()}] User not liveStream.`)
            }
        } else {
            console.log(`[${new Date()}] User not liveStream.`)
        }
    } catch (err) {
        console.log(`[${new Date()}] User not found: `, err.message)
    }

    await browser.close()
    console.log(`[${new Date()}] liveStream end.`)
}

module.exports = liveStream
