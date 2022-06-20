const {
    ActionRowBuilder,
    ButtonBuilder,
} = require('discord.js');

exports.run = async (client, interaction, member) => {

    const messages = await interaction.channel.messages.fetch()
    if(interaction.user.id == "280885861984239617") {
        console.log(messages.size)
        return
    }

    interaction.update({
        components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder({})
                .setCustomId(`VERIFY_USER`)
                .setLabel("Verify User (Staff Only)")
                .setStyle(4),
            ).addComponents(
                new ButtonBuilder({})
                .setCustomId(`MENTION_VERIFIERS`)
                .setLabel("Mention Verifiers")
                .setDisabled(true)
                .setStyle(2),
            )
        ]
    })

    interaction.channel.send({
        content: `<@&${process.env.BETA_VERIFIED}> Please verify the user ${interaction.user.tag}`,
        allowedMentions: {
            roles: [process.env.BETA_VERIFIED]
        }
    })

}

exports.data = {}