const {
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
} = require('discord.js');

exports.run = async (client, interaction, options) => {

    const modal = new ModalBuilder()
        .setCustomId("THEO_SEND")
        .setTitle(`Send a Message as Theo!`)
        .addComponents([
            new ActionRowBuilder().addComponents([
                new TextInputBuilder()
                .setCustomId("message")
                .setRequired(true)
                .setMinLength(1)
                .setMaxLength(1999)
                .setLabel('Message')
                .setStyle(2)
                .setPlaceholder('Message to send here.'),
            ]),
        ], );


    await interaction.showModal(modal);
}
