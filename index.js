const {
    Client,
    Intents
} = require('discord.js')
require('dotenv').config()
let textChannelId = "903383096446038026"
let token = process.env.token

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
});

client.once('ready', async () => {
    console.log('bot is ready!');
    startAPI();
});
client.login(token);

async function getMessages() {
    const channel = client.channels.cache.get(textChannelId);
    //to get more than 100 => https://stackoverflow.com/questions/55153125/fetch-more-than-100-messages
    let messages = await channel.messages.fetch({
        limit: 100
    })
    reformattedMessages = []
    messages.each(message => {
        let newMessage = {content: message.content, createdTimestamp: message.createdTimestamp, displayName: message.author.username}
        newMessage["avatarURL"] = message.author.displayAvatarURL()
        newMessage["attachmentURLs"] = []
        message.attachments.each(attachment => {
            newMessage["attachmentURLs"].push(attachment.url)
        })
        reformattedMessages.push(newMessage)
    })
    return reformattedMessages
}

function startAPI() {
    const express = require('express')
    const app = express()
    const port = process.env.PORT || 3000

    app.get('/', async function (req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let messages = await getMessages()
        res.json(messages)
    })

    app.listen(port, () => {
        console.log(`API listening at http://localhost:${port}`)
    })
}