const {
    ActionRowBuilder,
    ButtonBuilder,
} = require('discord.js');

module.exports = async (client, member) => {
    if (member.user.bot) return

    // Check if they have a thread open, and if so close it.

    const existingThread = member.guild.channel.threads.cache.find(x => {
        if (splitUp[1] == member.user.id) return splitUp[1]
    })

    if (existingThread && !existingThread.archived) existingThread.setArchived(true, "User left guild, auto archived thread.")

}