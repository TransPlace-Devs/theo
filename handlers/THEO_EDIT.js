exports.run = async (client, interaction, options) => {

    let messageId = interaction.customId.split("|")[1]

    function escapeMarkdown(text) {
        var unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1');
        var escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1');
        return escaped;
    }

    interaction.reply({
        content: "Message Edited.",
        ephemeral: true
    })


    interaction.channel.messages.fetch(messageId).then(message => {

        if(!message) return interaction.reply({
            content: "Message not found.",
            ephemeral: true
        })

        return message.edit({
            content: escapeMarkdown(options[0].components[0].value),
        })

    })

}