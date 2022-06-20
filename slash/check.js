exports.run = async (client, interaction, member) => {
    interaction.channel.fetchMessages().then(messages => {
        messages.forEach((item, index)=>{
            console.log(item)
         });
    }).catch(err => {
        console.log('Error while getting mentions: ');
        console.log(err);
    });
}

exports.data = {}