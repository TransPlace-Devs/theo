module.exports = async (client, interaction) => {

    if (!interaction.isButton()) return;

    let command = interaction.customId.split("|")[0]

    const cmd = client.handlers.get(command)
    if (!cmd) return;
    else cmd.run(client, interaction, interaction.member);

}