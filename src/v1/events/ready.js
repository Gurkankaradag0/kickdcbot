const { createSettings, getSettings } = require('../services/Settings')

const ensureRoleExists = async (client) => {
    const guilds = client.guilds.cache.map((guild) => guild)

    guilds.forEach(async (guild) => {
        const settings = await getSettings()
        let role = null

        if (settings !== null) {
            role = guild.roles.cache.find((r) => r.id === settings.rid)
        }

        if (!role) {
            try {
                role = await guild.roles.create({
                    name: process.env.CLIENT_ROLE_NAME,
                    color: '#53fc18',
                    reason: 'Special role required by bot'
                })
                await createSettings({ gid: guild.id, rid: role.id })
                console.log(`Created role "${process.env.CLIENT_ROLE_NAME}" in guild "${guild.name}".`)
            } catch (err) {
                console.log(`Error creating role in guild "${guild.name}":`, err.message)
            }
        }
    })
}

module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}!`)
    ensureRoleExists(client)
}
