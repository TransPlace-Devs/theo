// const {
//     ActionRowBuilder,
//     ButtonBuilder,
// } = require('discord.js');

const {
    ContextMenuCommandBuilder,
    ApplicationCommandType
} = require('discord.js');

module.exports = async (client) => {
    console.log("Bot started!");
    // client.updateSlashCommands(process.env.GUILD);

    // client.channels.cache.get("987358841245151262").send({
    //     "embeds": [{
    //             "color": 7302584,
    //             "image": {
    //                 "url": "https://i.imgur.com/gzTtYiQ.png"
    //             }
    //         },

    //         {
    //             "title": "Rules",
    //             "description": "1. **Keep on-topic in all channels.** We understand conversations naturally drift; however, if they do not self-correct after a while, a mod may step in to help do so.\n\n2. **No age-restricted or obscene content.** Our community remains appropriate for anyone over the age of 13, any content deemed unfit for this is disallowed. This includes text, images or links. [Read More](https://canary.discord.com/channels/959551566388547676/987831168755961976/987831169783562300)\n\n3. **No shocking or overly violent/gory content.** If something straddles the line, ask a mod, CW, or don’t post it at all.\n\n4. **No spam or self-promotion.** (server invites, advertisements. etc.) Unless given explicit permission from a staff member. This includes DMing fellow members.\n\n5. **Treat everyone with respect.** Absolutely no harassment, witch hunting, sexism, racism or hate speech will be tolerated. [Read More](https://canary.discord.com/channels/959551566388547676/987831379456839730/987831380429914142)\n\n6. **Keep in mind effective conflict resolution and interpersonal skills.** [Read More](https://canary.discord.com/channels/959551566388547676/987831703345176606/987831705425551430)\n\n7. **Hate has no home here.** No hate speech, slurs, homophobia or transphobia is allowed under **ANY** circumstances. (Even in \"joking\" scenarios.) [Read More](https://canary.discord.com/channels/959551566388547676/987831957230583869/987831958988030002)\n\n8. **Please keep all conversations in English.** Short phrases or jokes in another language are allowed, but we cannot effectively moderate non-English extensive discussions.\n\n**By joining this server you agree to the following guidelines**\n[Discord ToS](https://discord.com/terms)\n[Discord Community Guidelines](https://discord.com/guidelines)",
    //             "color": 7302584,
    //             "image": {
    //                 "url": "https://i.imgur.com/CBbbw0d.png"
    //             }
    //         },
    //         {
    //             "title": "Notes / Report to staff",
    //             "description": "1. Please be the bigger person—if you see someone trying to start a fight, don't fight back; DM staff. Similarly, if you see anything that may cause issues or someone possibly willingly causing them, don’t try to argue them into submission. *Don’t feed the trolls, nor your own trauma responses*.\n\n2. If you see something against the rules or something that makes you feel unsafe, let staff know. We want this space to be as inclusive and safe as possible. \n\n**To do this:**\n`Right-Click A Message > Apps > Report Message`\n\n> This directly reports the message to our server staff for us to best handle the situation as fast as possible <3 \n\n*(This does not report the message to discord, just our server staff)*\n\n3. Similarly, if you are unsure if something is allowed, feel free to ask.",
    //             "color": 7302584,
    //             "image": {
    //                 "url": "https://cdn.discordapp.com/attachments/987358841245151262/987842342406983710/report.gif"
    //             }
    //         },
    //         {
    //             "title": ":red_circle: IMPORTANT :red_circle:",
    //             "description": "We are not mental health professionals. As much as we would like to be able to render assistance in every way possible, we as staff do not have the capacity or the professional qualifications to render proper assistance with mental health issues, nor are we able to give professional advice. Because of this, we do not have any vent/advice channels. We ask that you seek out appropriate help if you are experiencing a crisis and not depend on this server as an emotional crutch. Please avoid topics that are very heavy emotionally loaded. Thank you for understanding :heart:",
    //             "color": 7302584,
    //             "image": {
    //                 "url": "https://i.imgur.com/CBbbw0d.png"
    //             }
    //         },
    //         {
    //             "title": "Getting Verified",
    //             "description": "To become verified please hit the button below :arrow_down:\nBy clicking this button you agree to follow the rules listed above.\nThank you, and have fun in our community :purple_heart:",
    //             "color": 7302584,
    //             "image": {
    //                 "url": "https://i.imgur.com/CBbbw0d.png"
    //             }
    //         }
    //     ],
    //     components: [new ActionRowBuilder().addComponents(
    //         new ButtonBuilder()
    //         .setURL(`https://canary.discord.com/channels/959551566388547676/987358841245151262/987842342247608410`)
    //         .setLabel("Scroll To Top!")
    //         .setStyle(5)).addComponents(
    //         new ButtonBuilder()
    //         .setCustomId(`START_VERIFICATION`)
    //         .setLabel("Start Verification")
    //         .setStyle(3))]
    // })

    let commands = [{
            name: "theo",
            description: `Theo's command`,
            options: [{
                name: "old",
                description: "Check the old verification of a user",
                type: 1,
                options: [{
                    name: "query",
                    description: "What is the query you would like to use?",
                    type: 3,
                    required: true,
                }]
            }]
        },
        new ContextMenuCommandBuilder()
        .setName('Edit Message')
        .setType(ApplicationCommandType.Message)
        .setDefaultMemberPermissions(null),
        new ContextMenuCommandBuilder()
        .setName('Delete Message')
        .setType(ApplicationCommandType.Message)
        .setDefaultMemberPermissions(null)
    ]

    commands.forEach(async command => {
        await client.guilds.cache.get(process.env.GUILD).commands.create(command)
    })

}