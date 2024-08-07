module.exports = {
    name: 'emoji',
    async execute(client, emojiName) {
        return (await client.guilds.fetch(process.env.DISCORD_SERVER_ID)).emojis.cache.find((e) => e.name === emojiName) || '🎉'
    }
}
