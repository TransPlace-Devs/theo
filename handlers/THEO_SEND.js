exports.run = async (client, interaction, options) => {

    function escapeMarkdown(text) {
        var unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1');
        var escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1');
        return escaped;
    }

    interaction.reply({
        content: "Message sent as in the current channel\nIf you would like to edit or delete this message, right click the message and choose \`Apps > Edit Message\` or \`Apps > Delete Message\` respectively.",
        ephemeral: true
    })

    return interaction.channel.send({
        content: escapeMarkdown(options[0].components[0].value),
    })

}