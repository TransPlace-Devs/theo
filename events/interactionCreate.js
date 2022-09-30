module.exports = async (client, interaction) => {

    if (interaction.type == 2) {
        const command = interaction.commandName.split(" ")[0].toLowerCase();
        const cmd = client.handlers.get(command)
        if (!cmd) return;
        else cmd.run(client, interaction, interaction.targetMessage);
    }
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
    if (interaction.type == 5) {
        const modalId = interaction.customId.split("|")[0]
        const options = interaction.components
        const modal = client.handlers.get(modalId)
        if (!modal) return;
        else modal.run(client, interaction, options);
    }




}