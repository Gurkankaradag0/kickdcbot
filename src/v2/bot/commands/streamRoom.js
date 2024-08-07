const { SlashCommandBuilder } = require('discord.js')
const { getSettings, updateStreamRoom } = require('../../services/Settings')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('streamroom')
        .setDescription('Create a broadcast announcement channel for the Kick platform.')
        .setDefaultMemberPermissions('0')
        .setDMPermission(false)
        .addSubcommand((command) => command.setName('get').setDescription('Gets the chat channel where the announcement will be shared.'))
        .addSubcommand((command) =>
            command
                .setName('set')
                .setDescription('Edit your chat channel.')
                .addChannelOption((option) =>
                    option.setName('channel').setDescription('Enter the chat channel where the announcement will be shared.').setRequired(true)
                )
                .addStringOption((option) => option.setName('content').setDescription('Create a post for the announcement.').setRequired(true))
        ),
    async execute(interaction) {
        const { member, options, client, guildId } = interaction
        const { _group, _subcommand, _hoistedOptions } = options

        if (!member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: 'You do not have sufficient permissions to use this command.', ephemeral: true })
        }

        switch (_subcommand) {
            case 'get':
                const settings = await getSettings()
                if (!settings.streamRoom) await interaction.reply({ content: 'Announcement channel is not defined.', ephemeral: true })
                else {
                    let content = `## Announcement channel\r\n<#${settings.streamRoom}>\r\n`
                    await interaction.reply({ content, ephemeral: true })
                }

                break
            case 'set':
                const hoistedOptions = {}
                _hoistedOptions.forEach((hOpt) => {
                    hoistedOptions[hOpt.name] = hOpt.value
                })

                const added = await updateStreamRoom(hoistedOptions.channel, hoistedOptions.content)
                if (added) await interaction.reply({ content: 'Chat channel has been edited successfully.', ephemeral: true })
                else await interaction.reply({ content: 'Editing failed.', ephemeral: true })

                break
        }
    }
}
