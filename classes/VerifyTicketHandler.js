/**
 * Handler to aggregate functions relating to accessing threads and information about them relevant to verification
 * tickets in TransPlace. Can have one and only one ticket channel.
 */
class VerifyTicketHandler {
    // fields
    client;

    ticketChannelId;

    ticketChannel;

    /**
     * Creates a TicketHandler for a given channel, taken from the TICKET_CHANNEL environment variable if none is given.
     * ticketsChannelId is optional and should have a default set. client is not.
     * @param {Client} client The Discord client
     * @param {Snowflake} ticketChannelId The ID of the channel that contains all of the tickets to do operations on.
     *     Must be a channel the client has access to.
     */
    constructor(client, ticketChannelId = process.env.TICKET_CHANNEL) {
        this.client = client;
        this.ticketChannelId = ticketChannelId;
        this.ticketChannel = this.client.channels.cache.get(this.ticketChannelId);

        if (!this.client) {
            throw new Error('VerifyTicketHandler has no client!');
        }
        if (!this.ticketChannel) {
            throw new Error(`Channel not found for the given ticket channel ID ${this.ticketChannelId}`);
        }
        if (this.ticketChannel.isThread()) {
            throw new Error('ID for ticket channel cannot be the ID of a thread!');
        }
    }

    /**
     * Retrieves up to 100 archived threads within the ticket channel, in order of archive time, most recent to least.
     * @param {number} limit The maximum number of threads to fetch. Must be 100 or less!
     * @returns {Promise <Collection <Snowflake, ThreadChannel>>} All archived threads within the ticket channel
     */
    async fetchArchivedThreads(limit = 100) {
        const data = await this.ticketChannel.threads.fetchArchived({ limit });
        return data.threads;
    }

    /**
     * Fetches all active threads belonging to the ticket channel.
     * @returns {Promise <Collection <Snowflake, ThreadChannel>>} All threads in the given BaseChannel
     */
    async fetchActiveThreads() {
        const data = await this.ticketChannel.threads.fetchActive();
        return data.threads;
    }

    /**
     * Combines this.fetchArchivedThreads() and this.fetchActiveThreads to retrieve all active threads of the ticket
     * channel as well as the 100 most recently archived archived threads
     * @returns {Promise <Collection <Snowflake, ThreadChannel>>} A combined collection with both active and archived
     *     threads
     */
    async fetchThreads() {
        const activeThreads = await this.fetchActiveThreads();
        const archivedThreads = await this.fetchArchivedThreads();
        return activeThreads.concat(archivedThreads);
    }

    /**
     * Finds all threads belonging to the given id's user within the threads given by this.fetchThreads(). Useful
     * because it is possible for users to create multiple tickets.
     * @param {Snowflake} userId The ID of the user who the tickets belong to
     * @returns {Promise <Collection <Snowflake, ThreadChannel>>} All threads that are tickets belonging to the given
     *     user
     */
    async findUserTickets(userId) {
        const threadsToCheck = await this.fetchThreads();
        return threadsToCheck.filter((thread) => this.userIdFromTicket(thread) === userId);
    }

    /**
     * Finds the most recent thread in the given collection of threads by searching for the one with the highest
     * timestamp
     * @param {FetchedThreads | Collection <Snowflake, ThreadChannel>} threads The threads to search
     * @returns {ThreadChannel} The thread with the highest timestamp
     */
    findMostRecentThread(threads) {
        const mostRecentTimestamp = Math.max(...threads.map((thread) => thread.createdTimestamp));
        const mostRecentThread = threads.find((thread) => thread.createdTimestamp === mostRecentTimestamp);

        return mostRecentThread;
    }

    /**
     * Checks if the given channel is a verification ticket thread. The conditions evaluated are if the channel is a
     * thread and the thread's parent is the tickets channel.
     * @param {BaseChannel} channel The channel to check
     * @returns {boolean} True if the given channel is a verification ticket thread, false if it is not
     */
    isVerificationTicket(channel) {
        return channel.isThread() && channel.parent === this.ticketChannel;
    }

    /**
     * Get the ID of the user who the given ticket belongs to. Assumes ticket titles have the user's id as the last
     * substring of the title that is preceded by a space
     * @param {ThreadChannel} ticket A thread that is a verification ticket
     * @returns {Snowflake} The ID of the user who the ticket belongs to
     */
    userIdFromTicket(ticket) {
        return ticket.name.split(' ').pop();
    }

    /**
     * Gets the User who the given ticket belongs to or null if the user is not in the same guild
     *
     * @param {ThreadChannel} ticket A verification ticket
     * @returns {?User} A User representing the user who created the ticket or null if not found
     */
    userFromTicket(ticket) {
        // get GuildMember from ticket name
        const userId = this.userIdFromTicket(ticket);
        const guildMember = ticket.guild.members.cache.find((member) => member.id === userId);

        // try to get user from GuildMember
        if (guildMember) {
            return guildMember.user;
        }
        return null;
    }

    /**
     * Fetches the thread from the ticket channel with the matching ID
     *
     * @param {Snowflake} ticketId The ID of the ticket
     * @return {Promise <?(ThreadChannel|FetchedThreads)>}
     */
    async ticketFromId(ticketId) {
        return this.ticketChannel.threads.fetch(ticketId);
    }
}

module.exports = VerifyTicketHandler;
