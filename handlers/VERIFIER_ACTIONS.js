const {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder
} = require('discord.js');

exports.run = async (client, interaction, member) => {

    // Check if the current member is a verifier
    if (!member.roles.cache.has(process.env.VERIFIERS)) return interaction.reply({
        content: "You are not a verifier",
        ephemeral: true
    })


    const ACTIONS = new EmbedBuilder()
        .setDescription("Which action would you like to take?")
        .setFooter({
            text: client.user.username + "#" + client.user.discriminator,
            iconURL: client.user.avatarURL()
        })

    await interaction.reply({
        embeds: [ACTIONS],
        components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder({})
                .setCustomId(`VERIFY_USER`)
                .setLabel("Verify User")
                .setStyle(3),
            ).addComponents(
                new ButtonBuilder({})
                .setCustomId(`KICK_USER_MODAL`)
                .setLabel("Kick the User")
                .setStyle(4),
            ).addComponents(
                new ButtonBuilder({})
                .setCustomId(`THEO_SEND_MODAL`)
                .setLabel("Send a Message as Theo")
                .setStyle(2),
            )
        ],
        ephemeral: true
    })
}

exports.data = {}