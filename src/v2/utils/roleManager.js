const addRole = async (member, role) => {
    try {
        await member.roles.add(role)
        console.log(`[${new Date()}] Assigned role "${role.name}" to user "${member.id}".`)
    } catch (err) {
        console.log(`[${new Date()}] Error assigning role to user "${member.id}":`, err.message)
    }
}

const removeRole = async (member, role) => {
    try {
        await member.roles.remove(role)
        console.log(`[${new Date()}] The role "${role.name}" was deleted from user "${member.id}".`)
    } catch (err) {
        console.log(`[${new Date()}] Error deleting role from user "${member.id}":`, err.message)
    }
}

const assignRoleToUser = async (guild, discordId, status, rid) => {
    const member = await guild.members.fetch(discordId)
    if (!member) return

    const role = guild.roles.cache.find((r) => r.id === rid)
    if (!role) return

    if (!member.roles.cache.has(role.id) && status === 'add') await addRole(member, role)

    if (member.roles.cache.has(role.id) && status === 'remove') await removeRole(member, role)
}

module.exports = { assignRoleToUser }
