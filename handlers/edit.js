const {
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
} = require('discord.js');

exports.run = async (client, interaction, options) => {

    if (options.embeds.length > 0) {
        return interaction.reply({
            content: "You cannot edit an embed.",
            ephemeral: true
        })
    } 

    const modal = new ModalBuilder()
        .setCustomId(`THEO_EDIT|${options.id}`)
        .setTitle(`What should the message be edited to?`)
        .addComponents([
            new ActionRowBuilder().addComponents([
                new TextInputBuilder()
                .setCustomId("message")
                .setRequired(true)
                .setMinLength(1)
                .setMaxLength(1999)
                .setLabel('New Message')
                .setStyle(2)
                .setPlaceholder('New Message Here.'),
            ]),
        ], );


    await interaction.showModal(modal);
}
