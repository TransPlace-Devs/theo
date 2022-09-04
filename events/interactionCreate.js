module.exports = async (client, interaction) => {

    if (interaction.isButton()) {
        const command = interaction.customId.split("|")[0]
        const cmd = client.handlers.get(command)
        if (!cmd) return;
        else cmd.run(client, interaction, interaction.member);
    }
    if (interaction.type == 2) {
        const command = interaction.options._subcommand
        const cmd = client.slash.get(command)
        if (!cmd) return;
        else cmd.run(client, interaction, interaction.member);
    }



}