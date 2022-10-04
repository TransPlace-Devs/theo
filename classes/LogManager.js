const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    channelLink,
    codeBlock,
    EmbedBuilder,
    hyperlink,
    quote,
    time,
    TimestampStyles,
    userMention,
} = require('discord.js');

/**
 * Your one-stop shop for logging
 */
class LogManager {
    // fields
    client;

    logChannelId;

    logChannel;

    static reasons = {
        verify: {
            verifierArchived: 'Thread archived - verifier used command',
            applicantLeft: 'Thread archived - user left server',
        },

        noReasonGiven: '',
    };

    /**
     * Constructor for LogHandler. ticketsChannelId is optional and should have a default set. client is not.
     * @param {Client} client The Discord client
     * @param {Snowflake} logChannelId The ID of the channel to write logs to
     */
    constructor(client, logChannelId = process.env.LOGS) {
        this.client = client;
        this.logChannelId = logChannelId;
        this.logChannel = this.client.channels.cache.get(this.logChannelId);

        if (!this.client) {
            throw new Error('LogManager has no client!');
        }
        if (!this.logChannel) {
            throw new Error(`Channel not found for the given log channel ID ${this.logChannelId}`);
        }
    }

    /**
     * The options used to log ticket archival
     * @typedef {Object} LogTicketArchiveOptions
     * @property {ThreadChannel} [ticket] The ticket thread that was archived
     * @property {string} [reason] The reason for archival
     * @property {User} [user] The user who the ticket belonged to
     * @property {Snowflake} [userId] The id of user who the ticket belonged to. Used only if no user is given. Good to
     *     use if it is possible that user may not exist
     * @property {Collection <Snowflake, ThreadChannel>} [userTickets] All tickets belonging to this user
     * @property {User} [verifier] The verifier who performed the action
     */

    /**
     * Logs the relevant information when a verification ticket is archived.
     * @param {LogTicketArchiveOptions} info The information to use to make the log. See typedef below for information
     */
    logTicketArchive(info) {
        const {
            ticket, reason, user, userId, userTickets, verifier,
        } = info;

        // make embed with thread info
        const embed = new EmbedBuilder()
            .setAuthor({
                name: 'Ticket Closed',
            })
            .setTimestamp()
            .setFooter({
                text: this.client.user.tag,
                iconURL: this.client.user.avatarURL(),
            });

        // set reason
        if (reason) {
            embed.setDescription(`${reason}`);
        }

        // add user info or only user id info if there is no user info
        if (user) {
            embed.addFields({
                name: 'User Information', value: `${user.tag}\n${user}`,
            });
        } else if (userId) { // don't double dip
            embed.addFields({
                name: 'User Information', value: `${userMention(userId)}`,
            });
        } else {
            embed.addFields({ name: 'User Information', value: 'Unavailable' });
        }

        // display all ticket threads by this user with date of creation
        if (userTickets) {
            let entries = userTickets;

            // sort threads in order of creation, from most recent to least
            entries.sort((left, right) => right.createdTimestamp - left.createdTimestamp);
            entries = userTickets.map((thread) => {
                const link = hyperlink('[Link]', channelLink(thread.id, thread.guild.id));
                const timestamp = time(thread.createdAt, TimestampStyles.ShortDate);

                return quote(`${link} on ${timestamp}`); // will look like 'Link on 9/29/2022'
            });
            embed.addFields(
                { name: 'All tickets by this user:', value: entries.join('\n') },
            );
        }

        // add verifier information if this was the result of verifier action
        if (verifier) {
            embed.addFields(
                { name: 'Verifier', value: `${verifier.tag}\n${verifier}` },
            );
        }

        // make id's field
        let idString = '';
        if (user) {
            idString += `User = ${user.id}\n`;
        } else if (userId) { // don't double dip
            idString += `User = ${userId}\n`;
        }
        if (ticket) {
            idString += `Thread = ${ticket.id}\n`;
        }
        if (verifier) {
            idString += `Verifier = ${verifier.id}\n`;
        }
        if (idString.length > 0) { // check if anything had been added to the default string
            embed.addFields(
                { name: 'ID\'s', value: codeBlock('ini', idString) },
            );
        }

        // button to go to the ticket in question
        let threadButton = null;
        if (ticket) {
            threadButton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel('View Thread')
                    .setURL(channelLink(ticket.id, ticket.guildId))
                    .setStyle(ButtonStyle.Link),
            );
        }

        // send the log
        this.logChannel.send({ embeds: [embed], components: [threadButton] });
    }
}

module.exports = LogManager;
