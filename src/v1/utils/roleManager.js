const { getSettings } = require('../services/Settings')

const assignRoleToUser = async (client, discordId, status) => {
    const guilds = client.guilds.cache.map((guild) => guild)

    for (const guild of guilds) {
        const member = await guild.members.fetch(discordId)
        if (!member) continue

        const _guild = await getSettings()
        const role = guild.roles.cache.find((r) => r.id === _guild.rid)
        if (!role) continue

        if (!member.roles.cache.has(role.id) && status === 'add') {
            try {
                await member.roles.add(role)
                console.log(`[${new Date()}] Assigned role "${role.name}" to user "${discordId}".`)
            } catch (err) {
                console.log(`[${new Date()}] Error assigning role to user "${discordId}":`, err.message)
            }
        }

        if (member.roles.cache.has(role.id) && status === 'remove') {
            try {
                await member.roles.remove(role)
                console.log(`[${new Date()}] The role "${role.name}" was deleted from user "${discordId}".`)
            } catch (err) {
                console.log(`[${new Date()}] Error deleting role from user "${discordId}":`, err.message)
            }
        }
    }
}

module.exports = { assignRoleToUser }
