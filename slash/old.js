const {
    google
} = require('googleapis');
const fs = require('fs');

exports.run = async (client, interaction, member) => {
    let userID = interaction.options.getString('query')

    interaction.deferReply({
        ephemeral: true
    });

    const auth = new google.auth.GoogleAuth({
        keyFile: './creds/drive.json',
        scopes: [
            'https://www.googleapis.com/auth/drive.readonly',
        ]
    });

    const driveService = google.drive({
        version: 'v3',
        auth
    });

    try {
        let response = await driveService.files.list({
            maxResults: 1,
            q: `mimeType=\'text/plain\' and name contains '${userID}'`,
        });

        const file = await driveService.files.get({
            fileId: response.data.files[0].id,
            alt: 'media'
        });

        await interaction.editReply({
            content: `***Found File With Name:***\`\`\`"${response.data.files[0].name}"\`\`\``,
            files: [{
                attachment: Buffer.from(file.data, 'utf8'),
                name: `${response.data.files[0].name.match(/\(([^)]+)\)/)[1]} verification log.txt`
            }],
        });
    } catch {
        interaction.editReply('404 File not found')
    }

}

exports.data = {}