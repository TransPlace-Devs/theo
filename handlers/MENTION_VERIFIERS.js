const {
    ActionRowBuilder,
    ButtonBuilder,
} = require('discord.js');

exports.run = async (client, interaction, member) => {

    const messages = await interaction.channel.messages.fetch()
    
    if(messages) return

    if(messages.size == 1) return interaction.reply({
        content: "You have not sent any messages in this channel yet, please answer the questions in the message above before clicking \"Mention Verifiers.\"\nIf after reading the message above you have any questions, please send your question then hit the \"Mention Verifiers\" button again.\nThank you :heart:",
        ephemeral: true
    })

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