# Discord Message Broadcaster
This project allows a discord bot to broadcast text channel messages as JSON over a public API.

[Try out the demo](https://discord-broadcast.herokuapp.com/)

## To run for development:
1. Make a bot and generate its token following https://discordjs.guide/preparations/setting-up-a-bot-application.html
2. Add bot to a server following https://discordjs.guide/preparations/adding-your-bot-to-servers.html
3. In discord developer portal under Bot tab, tick all the intents under Privileged Gateway Intents
4. create ".env" file with: `token=YOUR_BOT_TOKEN`
5. set `textChannelId` in index.js to a textchannel in your bot's server
6. `npm i` in terminal
7. `node index.js` to run bot

## For production:
This project is setup to be hosted on Heroku. Simply create a new app through the Heroku dashboard, add the token under Settings -> Config Vars as `key:token value:YOUR_BOT_TOKEN`, and deploy this code!