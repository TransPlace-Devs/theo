module.exports = client => client.updateSlashCommands = async (guildID) => client.guilds.cache.get(guildID).commands.create({
    name: "theo",
    description: "Theo Verification Commands",
    defaultPermission: false,
    options: [{
        name: "claim",
        description: "Claims the current thread as your own and does not allow another member to verify a user",
        type: 1,
    }, {
        name: "unclaim",
        description: "Unclaim the current thread (if you own it) allowing another member to verify a user",
        type: 1,
    }, {
        name: "check",
        description: "Checks who owns the current thread",
        type: 1,
    }, {
        name: "overwrite",
        description: "Unclaim a claimed thread by force, allowing another member to verify a user",
        type: 1,
    }]
})