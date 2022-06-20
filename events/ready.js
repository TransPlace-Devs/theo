module.exports = async (client) => {
    console.log("Bot started!");
    updateSlashCommands(process.env.GUILD);
}