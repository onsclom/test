// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
]});

// When the client is ready, run this code (only once)
client.once('ready', async () => {
	console.log('Ready!');
    await getMessages();
    startAPI();
});

client.on("messageCreate", async (message) => {
    //this code is executed every time you get a message! yay
    console.log(message)
})

client.login(token);

async function getMessages() {
    const channel = client.channels.cache.get("903383096446038026");
    let messages = await channel.messages.fetch({ limit: 100 })
    console.log(`Received ${messages.size} messages`);
    return messages
}

function startAPI() {
    const express = require('express')
    const app = express()
    const port = process.env.PORT || 3000

    app.get('/', async function (req, res) {
        let messages = await getMessages()
        res.json(messages)
    })
       
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}