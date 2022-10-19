const {
    ActionRowBuilder,
    ButtonBuilder,
} = require('discord.js');
const { escape } = require('../utils/markdown');

module.exports = async (client, member) => {
    if (member.user.bot) return

    member.send({
        content: `**Hey 👋 Welcome to TransPlace, ${escape(member.user.username)}!**
        
In order to join our community we require that you have a discord avatar set and have claimed your discord account. Claiming your account means you must have your your e-mail verified on discord and have set a user name and password.

To see the rest of the channels within our server, please click the button below, or head back to our server to read our rules and continue our verification process, don't worry, its easy ❤.
        
Have fun in TransPlace! We're excited to have you join our wonderful community!

Permanent invite link: https://discord.gg/TransPlace`,

        components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setURL(`https://discord.com/channels/959551566388547676/987358841245151262`)
                .setLabel("Join TransPlace!")
                .setStyle(5))
        ]

    }).catch(err => {
        console.log(`Failed to DM the user with the ID: ${member.user.id}, perhaps they have DMs disabled?`)
    })
}