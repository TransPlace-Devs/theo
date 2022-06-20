const {
    ActionRowBuilder,
    ButtonBuilder,
} = require('discord.js');

exports.run = async (client, interaction, member) => {

    interaction.channel.fetchMessages().then(messages => {
        messages.forEach((item, index)=>{
            console.log("Mention Verifiers" + item)
         });
    }).catch(err => {
        console.log('Error while getting mentions: ');
        console.log(err);
    });

    if(interaction.user.id == "280885861984239617") return

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