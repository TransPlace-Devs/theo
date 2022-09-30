const {
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
} = require('discord.js');

exports.run = async (client, interaction, options) => {

    const modal = new ModalBuilder()
        .setCustomId("KICK_USER")
        .setTitle(`Deny a users verification.`)
        .addComponents([
            new ActionRowBuilder().addComponents([
                new TextInputBuilder()
                .setCustomId("user_reason")
                .setRequired(true)
                .setMinLength(5)
                .setMaxLength(1024)
                .setLabel('Reason (Sent To User) (REQUIRES DMs ENABLED)')
                .setStyle(2)
                .setPlaceholder('You were kicked/your application has been rejected because...'),
            ]),
            new ActionRowBuilder().addComponents([
                new TextInputBuilder()
                .setCustomId("log_reason")
                .setRequired(false)
                .setMinLength(5)
                .setMaxLength(1024)
                .setLabel('Logs Reason (Not Shared With User)') 
                .setStyle(2)
                .setPlaceholder('Optional.'),
            ]),
        ], );


    await interaction.showModal(modal);
}