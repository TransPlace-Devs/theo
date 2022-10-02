const { EmbedBuilder } = require('discord.js');
const LogManager = require('../classes/LogManager');
const VerifyTicketHandler = require('../classes/VerifyTicketHandler');

/**
 * Check if the member who left is unverified and has a ticket that needs closing, and if so, does ticket closing
 * operations and logs the action taken.
 * @param {Client} client The Discord client
 * @param {GuildMember} member The member who left the guild
 */
async function closeVerifyTicket(client, member) {
    // get user
    const { user } = member;
    const userId = user.id;

    // find the thread to archive
    const ticketHandler = new VerifyTicketHandler(client);
    const userTickets = await ticketHandler.findUserTickets(userId);
    if (userTickets.size === 0) { // user has no tickets, so no further actions are necessary
        return;
    }
    const ticketToArchive = ticketHandler.findMostRecentThread(userTickets);

    // send archive message in thread and archive the thread
    const embed = new EmbedBuilder().setTitle('User left - archiving thread');
    await ticketToArchive.send({ embeds: [embed] });
    await ticketToArchive.setArchived(true);

    // make log
    const logManager = new LogManager(client);
    logManager.logTicketArchive({
        ticket: ticketToArchive,
        reason: LogManager.reasons.verify.applicantLeft,
        user,
        userTickets,
    });
}

module.exports = async (client, member) => {
    // check if member may be an unverified user (not a bot and no roles except @everyone role)
    if (!member.user.bot && member.roles.cache.size === 1) {
        closeVerifyTicket(client, member);
    }
};