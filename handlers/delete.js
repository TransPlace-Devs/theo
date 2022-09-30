exports.run = async (client, interaction, options) => {

    if (options.embeds.length > 0) {
        return interaction.reply({
            content: "You cannot delete an embed.",
            ephemeral: true
        })
    } else {
        options.delete()
        interaction.reply({
            content: "Message deleted.",
            ephemeral: true
        })
    }
}