const { SlashCommandBuilder } = require('discord.js')
const { getUser } = require('../../services/Users')
const { encrypt } = require('../../utils/encryption')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loginkick')
        .setDescription('Connect your kick account to get the Kick Subscriber role.')
        .setDMPermission(false)
        .addSubcommand((command) => command.setName('get').setDescription('Gets the account you are linked to.'))
        .addSubcommand((command) => command.setName('set').setDescription('Connects or renews your account.')),
    async execute(interaction) {
        const { member, options, client, guildId } = interaction
        const { _group, _subcommand, _hoistedOptions } = options

        switch (_subcommand) {
            case 'get':
                const user = await getUser(member.user.id)
                if (!user) await interaction.reply({ content: 'Your kick account has not been linked yet.', ephemeral: true })
                else {
                    let content = `## Your kick account\r\n\`\`${user.kickSlug}\`\`\r\n`
                    await interaction.reply({ content, ephemeral: true })
                }

                break
            case 'set':
                global.interactions[interaction.id] = {
                    interaction,
                    interval: null
                }
                let content = `## Discord Kick integration\r\n\t- First, go to [${process.env.KICK_BOT_NAME}](https://kick.com/${
                    process.env.KICK_BOT_NAME
                }) page.\r\n- Send this code to chat: \`\`\`${encrypt(`${member.user.id}:${interaction.id}`)}\`\`\``
                await interaction.reply({ content: `${content}\r\n\r\nYou have 30 seconds to use the code...`, ephemeral: true })
                let count = 29
                global.interactions[interaction.id].interval = setInterval(async () => {
                    await interaction.editReply({ content: `${content}\r\n\r\nYou have ${count} seconds to use the code...`, ephemeral: true })
                    count -= 1
                    if (count === 0) {
                        await interaction.editReply({
                            content: content + `\r\n\r\nYour Kick account could not be linked within the given time.`,
                            ephemeral: true
                        })
                        clearInterval(global.interactions[interaction.id].interval)
                        delete global.interactions[interaction.id]
                    }
                }, 1000)
                break
        }
    }
}
