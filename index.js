const fs = require("fs");
const Discord = require('discord.js');


const client = new Discord.Client({
    intents: ['Guilds', 'GuildMembers'],
    rest: {
        version: '10'
    },
});

require("dotenv").config()

client.handlers = new Discord.Collection();
client.slash = new Discord.Collection();

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir("./handlers/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        let handlerName = f.split(".")[0];
        let pull = require(`./handlers/${handlerName}`);
        client.handlers.set(handlerName, pull);
    });
});

fs.readdir("./slash/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        let handlerName = f.split(".")[0];
        let pull = require(`./slash/${handlerName}`);
        client.slash.set(handlerName, pull);
    });
});

client.login(process.env.TOKEN);