const {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder
} = require('discord.js');

exports.run = async (client, interaction, member) => {

    // Check if the current member is a verifier
    if (member.roles.cache.has(process.env.VERIFIED_ROLE)) return interaction.reply({
        content: "You've already been verified silly",
        ephemeral: true
    });

    let threads = interaction.channel.threads

    const existingThread = threads.cache.find(x => {
        let splitUp = x.name.split(" | ")
        if (splitUp.length != 2) return false
        else if (splitUp[1] == interaction.user.id) return splitUp[1]
    })

    if (existingThread) {
        if (existingThread.archived) {
            existingThread.setArchived(false, "Unarchive by user")
            existingThread.send({
                content: `<@${interaction.user.id}> Your thread has been reopened, please make sure the above questions are filled out correctly then hit the \`Mention Verifiers\` button below.`,
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder({})
                        .setCustomId(`VERIFY_USER`)
                        .setLabel("Verify User (Staff Only)")
                        .setStyle(4),
                    ).addComponents(
                        new ButtonBuilder({})
                        .setCustomId(`MENTION_VERIFIERS`)
                        .setLabel("I Need Help Please.")
                        .setStyle(2),
                    ).addComponents(
                        new ButtonBuilder({})
                        .setCustomId(`MENTION_VERIFIERS`)
                        .setLabel("Finished Answering!")
                        .setStyle(3),
                    )
                ]
            })
            return interaction.reply({
                content: "You already have a archived thread open, this thread has been re-opened.",
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                        .setURL(`https://canary.discord.com/channels/959551566388547676/${existingThread.id}`)
                        .setLabel("View Thread")
                        .setStyle(5),
                    )
                ],
                ephemeral: true
            })
        } else {
            existingThread.send({
                content: `<@${interaction.user.id}>`
            }).then(msg => msg.delete())
            return interaction.reply({
                content: "You already have a thread open",
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                        .setURL(`https://canary.discord.com/channels/959551566388547676/${existingThread.id}`)
                        .setLabel("View Thread")
                        .setStyle(5),
                    )
                ],
                ephemeral: true
            })
        }
    } else {
        let newThread = await threads.create({
            invitable: false,
            name: `${interaction.user.tag} | ${interaction.user.id}`,
            autoArchiveDuration: 4320,
            reason: 'Thread for verifying a user',
            type: 12,
        });

        const url = `https://canary.discord.com/channels/959551566388547676/${newThread.id}`

        newThread.send({
            content: `<@${interaction.user.id}>`,
            embeds: [{
                title: 'Verification Ticket for ' + interaction.user.username + "#" + interaction.user.discriminator,
                description: `Hi! Thank you for your patience with the verification process. As a part of the verification process, we ask that you answer the following questions. Do note that there are no right or wrong to answers these questions, but please try and give thorough / detailed responses. 
    
***Please keep in mind that 1-5 word / simple answers will oftentimes require more questions to have you verified, please try and give thoughtful / detailed responses to be verified quicker, no need to stress however if you cannot think of anything else to put, on behalf of our verification team thank you.*** :heart:

\`\`\`markdown
1. Do you agree to the server rules and to respect the Discord Community Guidelines & Discord ToS?

2. Do you identify as transgender; and/or any other part of the LGBTQ+ community? (Please be specific in your answer)

3. Do you have any friends who are already a part of our Discord? (If yes, please send their username)

4. What’s your main goal / motivation in joining the TransPlace Discord?

5. If you could change one thing about the dynamic of the LGBTQ+ community, what would it be? 

6. What is gatekeeping in relation to the trans community?

# If you have any social media that contains relevant post history related to the LGBTQ+ community, please link it to your discord account or send the account name or URL. 

*(We may use this to help fast track your verification, but linking/sharing any accounts is not required)\`\`\`
***If you need any help or after you have answered all of the questions, please click the "Mention Verifiers" button below which will add our verifier staff to your thread.***`,
                footer: {
                    text: "After answering these questions, a member of the Verification Team may reach out if the answers to the above questions are incomplete or too vague. Thank you again for your patience and we can’t wait for you to join the TransPlace Discord."
                }
            }],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder({})
                    .setCustomId(`VERIFY_USER`)
                    .setLabel("Verify User (Staff Only)")
                    .setStyle(4),
                ).addComponents(
                    new ButtonBuilder({})
                    .setCustomId(`MENTION_VERIFIERS`)
                    .setLabel("Mention Verifiers")
                    .setStyle(3),
                )
            ]
        });

        interaction.reply({
            content: "Created a ticket for you to verify your account",
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setURL(url)
                    .setLabel("View Thread")
                    .setStyle(5),
                )
            ],
            ephemeral: true
        })

        // Add a log for the newly created thread

        const oneDay = 1000 * 60 * 60 * 24;
        const oneHour = 1000 * 60 * 60
        const diffInTime = Date.now() - interaction.user.createdAt;
        const diffInTimeJoined = Date.now() - interaction.member.joinedTimestamp;


        const logEmbed = new EmbedBuilder()
            .setAuthor({
                name: interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL({
                    forceStatic: false
                })
            })
            .setDescription('A new verification ticket has been created for ' + interaction.user.username + "#" + interaction.user.discriminator)
            .setTimestamp()
            .setFooter({
                text: client.user.username + "#" + client.user.discriminator,
                iconURL: client.user.avatarURL()
            })
            .addFields([{
                    name: 'User Information',
                    value: `${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id}) <@${interaction.user.id}>`
                },
                {
                    name: "Joined At",
                    value: `<t:${Math.round(interaction.member.joinedTimestamp/1000)}:F> (${Math.floor(diffInTimeJoined / oneDay)} days, ${Math.floor(diffInTimeJoined / oneHour)} hours ago)`
                },
                {
                    name: "Created At",
                    value: `<t:${Math.round(new Date(interaction.user.createdAt).getTime()/1000)}:F> (${Math.floor(diffInTime / oneDay)} days, ${Math.floor(diffInTime / oneHour)} hours old)`
                },
                {
                    name: 'ID\'s',
                    value: `\`\`\`ini\nUser = ${interaction.user.id}\nThread = ${newThread.id}\`\`\``
                }
            ])


        let logMessage = await client.channels.cache.get(process.env.LOGS).send({
            embeds: [logEmbed],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder({})
                    .setURL(url)
                    .setLabel("View Thread")
                    .setStyle(5),
                )
            ]
        })

        logMessage.startThread({
            name: `${interaction.user.tag} Private Verifier Discussion Thread`,
            autoArchiveDuration: 4320,
            reason: 'Thread for verifier talks when verifying a user',
        })
    }

}

exports.data = {}