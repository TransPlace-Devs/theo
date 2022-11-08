const {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    formatEmoji,
} = require('discord.js');
const { idFromChannel } = require('../utils/verifyTicketUtils.js');

exports.run = async (client, interaction, member) => {

    if (interaction.user.id != idFromChannel(interaction.channel.name)) return interaction.reply({
        content: "You are not allowed to use this command, this can only be used by the thread owner.",
        ephemeral: true
    });

    const messages = await interaction.channel.messages.fetch()

    if (!messages) return

    if (messages.size == 1) return interaction.reply({
        content: `You have not sent any messages in this channel yet, please answer the questions in the message above before clicking "Finished Answering!" or ask a question before clicking "I Need Help Please."
Thank you ❤️`,
        ephemeral: true
    })

    await interaction.update({
        components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder({})
                .setCustomId(`VERIFIER_ACTIONS`)
                .setLabel("Verifier Actions (Staff Only)")
                .setStyle(4),
            ).addComponents(
                new ButtonBuilder({})
                .setCustomId(`MENTION_VERIFIERS|1`)
                .setLabel("I Need Help Please.")
                .setStyle(2)
                .setDisabled(true),
            ).addComponents(
                new ButtonBuilder({})
                .setCustomId(`MENTION_VERIFIERS|2`)
                .setLabel("Finished Answering!")
                .setStyle(3)
                .setDisabled(true),
            )
        ]
    })

    const oneDay = 1000 * 60 * 60 * 24;
    const oneHour = 1000 * 60 * 60
    const diffInTime = Date.now() - interaction.user.createdAt;
    const diffInTimeJoined = Date.now() - interaction.member.joinedTimestamp;

    let helpMessage = "Please verify the user"
    if(interaction.customId.split("|")[1] == "1") helpMessage = "Please help the user"

    const logEmbed = new EmbedBuilder()
        .setAuthor({
            name: interaction.user.username + "#" + interaction.user.discriminator,
            iconURL: interaction.user.avatarURL({
                forceStatic: false
            })
        })
        .setDescription(`<@&${process.env.BETA_VERIFIED}> ${helpMessage} ${interaction.user.tag}`)
        .setTimestamp()
        .setFooter({
            text: client.user.username + "#" + client.user.discriminator,
            iconURL: client.user.avatarURL()
        })
        .addFields([{
                name: "Joined At",
                value: `<t:${Math.round(interaction.member.joinedTimestamp/1000)}:F> (${Math.floor(diffInTimeJoined / oneDay)} days, ${Math.floor(diffInTimeJoined / oneHour)} hours ago)`
            },
            {
                name: "Created At",
                value: `<t:${Math.round(new Date(interaction.user.createdAt).getTime()/1000)}:F> (${Math.floor(diffInTime / oneDay)} days, ${Math.floor(diffInTime / oneHour)} hours old)`
            },
        ])

    await interaction.channel.send({
        content: `<@&${process.env.BETA_VERIFIED}>`,
        embeds: [logEmbed],
        allowedMentions: {
            roles: [process.env.BETA_VERIFIED]
        }
    })

    const maxHeartId = '968321960557809674'; // id of emoji :max_heart: from TransPlace
    await interaction.followUp({
        content: `Verifiers have been pinged. Please wait for them to respond ${formatEmoji(maxHeartId)}`, // formatEmoji will return :_: if the bot does not have access to :max_heart: from TransPlace
        ephemeral: true
    });

}

exports.data = {}