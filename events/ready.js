module.exports = async (client) => {
    console.log("Bot started!");
    client.updateSlashCommands(process.env.GUILD);
}