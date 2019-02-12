const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

//send message to log when online
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.guilds.forEach((guild) => {
		guild.channels.forEach((channel) => {
			channel.fetchMessages({ limit: 50 })
		})
	})
});

/* Message code
client.on("message", message => {
	if (message.author.bot) return;
  // This is where we'll put our code.
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
  	case "ping" :
  	message.channel.send('Pong!');
  	break;
  	case "blah" :
  	message.channel.send('Meh.');
  	break;
  }
});
*/
//Reaction code
client.on("messageReactionAdd", (reaction, user) => {
	if (reaction.emoji.identifier===config.quote){
		reaction.message.channel.send(user.toString() + ' ha citado el mensaje de ' + reaction.message.author.toString() + ' :\n ```' + reaction.message.cleanContent + '```');
	}
});

client.login(process.env.BOT_TOKEN);