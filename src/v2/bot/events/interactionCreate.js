const { Events } = require('discord.js')

module.exports = (client) => {
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) return

        if (client.commands.has(interaction.commandName)) {
            const command = client.commands.get(interaction.commandName)
            await command.execute(interaction)
        }
    })
}
