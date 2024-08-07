const { REST, Routes } = require('discord.js')

module.exports = async (guild) => {
    const { client } = guild
    const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN)
    const body = client.commands.map((command) => command.data)

    try {
        await rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body })
    } catch (e) {
        console.log(e)
    }
}
