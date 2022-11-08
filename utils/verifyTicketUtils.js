
/**
 * Parses the id of the user who created the verification ticket from the channel name of a verification ticket
 * @param {string} channelName The channel name
 * @returns {string} The id of the user who created the verification ticket that the channel name refers to
 */
function idFromChannel(channelName) {
    return channelName.match(/\d{17,20}$/)[0];
    //                        |  |     |  |__ the first match (should only ever be one)
    //                        |  |     |__ end of line
    //                        |  |__ 17-20 digits: long story short it's the conceivable valid snowflake range
    //                        |__ digit (i.e. [0-9])
}

module.exports = {
    idFromChannel
};