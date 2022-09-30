const {
    ActionRowBuilder,
    EmbedBuilder,
    ButtonBuilder
} = require('discord.js');

exports.run = async (client, interaction, options) => {
    let threadName = interaction.channel.name.split(" | ")
    if (threadName.length != 2) return

    let guildMember = await interaction.guild.members.fetch(threadName[1]);
    if (!guildMember) return interaction.reply({
        content: "Member is no longer apart of guild.",
        ephemeral: true
    })

    function escapeMarkdown(text) {
        var unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1'); // unescape any "backslashed" character
        var escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1'); // escape *, _, `, ~, \
        return escaped;
    }

    const user_reason = escapeMarkdown(options[0].components[0].value)
    const logs_reason = escapeMarkdown(options[1].components[0].value)

    let unable = false

    // DM The user with the reason
    guildMember.send({
        content: `Your verification has been denied from **${interaction.guild.name}** for the following reason:\n\`\`\`${user_reason}\`\`\``,
    }).catch(() => unable = true)

    guildMember.kick("Member was kicked during verification")

    const logEmbed = new EmbedBuilder()
        .setAuthor({
            name: guildMember.user.username + "#" + guildMember.user.discriminator,
            iconURL: guildMember.user.avatarURL({
                forceStatic: false
            })
        })
        .setTitle('The user ' + guildMember.user.username + "#" + guildMember.user.discriminator + ' has been kicked from the server.')
        .setDescription(`Reason ${unable ? "(Unable to Send to User)" : "(Sent to User)"}: \`\`\`${user_reason}\`\`\`\nLogs Reason (Not Shared):\`\`\`${logs_reason}\`\`\``)
        .setTimestamp()
        .setFooter({
            text: client.user.username + "#" + client.user.discriminator,
            iconURL: client.user.avatarURL()
        })
        .addFields([{
                name: 'User Information',
                value: `${guildMember.user.username}#${guildMember.user.discriminator} (${guildMember.user.id}) <@${guildMember.user.id}>`
            },
            {
                name: 'Verifier Information',
                value: `${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id}) <@${interaction.user.id}>`
            },
            {
                name: 'ID\'s',
                value: `\`\`\`ini\nVerifier = ${interaction.user.id}\nUser = ${interaction.user.id}\nThread = ${interaction.channel.id}\`\`\``
            }
        ])

    await client.channels.cache.get(process.env.KICK_LOGS).send({
        embeds: [logEmbed],
        components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setURL(`https://canary.discord.com/channels/959551566388547676/${interaction.channel.id}`)
                .setLabel("View Thread")
                .setStyle(5),
            )
        ],
    })

    return interaction.reply({
        content: "Kicked " + guildMember.user.username + "#" + guildMember.user.discriminator + " from the server.",
        ephemeral: true
    })

}