const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

//send message to log when online
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.guilds.forEach((guild) => {
		guild.channels.forEach((channel) => {
      if (channel.type==="text") {channel.fetchMessages()
        .then(messages => console.log(`Received ${messages.size} messages in ${channel.name} of server ${guild.name}`))
        .catch(console.error);
    }})
	})
});

 //Message code
client.on("message", message => {
	if (message.author.bot) return;
  // This is where we'll put our code.
  if (message.content.indexOf(config.prefix) !== 0) return;

  var args = message.content.slice(config.prefix.length).trim().split(" ");
  var command = args.shift().toLowerCase();

  switch (command) {
  	case "help" :
  	 message.channel.send('Por el momento puedo realizar las siguientes funciones: \n -Citar un mensaje al que se reaccione con :speech_balloon: \n -Mostrar esta ayuda con el comando help.');
  	 break;
    case "roll" :
      switch (args.length) {
        case 0:
          message.channel.send(roll(1,6,1));
          break;
        case 1:
          message.channel.send(roll(1,args[0],1));
          break;
        case 2:
          message.channel.send(roll(1,args[0],args[1]));
          break;
        case 3:
          message.channel.send(roll(args[2],args[0],args[1]));
          break;
        default:
          message.channel.send('Numero de argumentos inválido.');
    }
    break;
  }
});

//Reaction code
client.on("messageReactionAdd", (reaction, user) => {
	if (reaction.emoji.identifier===config.quote){
    var month;
    month=reaction.message.createdAt.getMonth()+1;
		reaction.message.channel.send(user.toString() + ' ha citado el mensaje de ' + reaction.message.author.toString() + ' :\n' + reaction.message.cleanContent + '```\n Enviado el '+reaction.message.createdAt.getDay()+'-'+month+'-'+reaction.message.createdAt.getFullYear()+' a las '+reaction.message.createdAt.getHours()+':'+reaction.message.createdAt.getMinutes()+'```');
	}
});

//Rolling dice
function roll(min, max, dice){
  var result;
  if (dice===1){
    result=Math.floor(Math.random() * (max+1 - min)) + min;
    return ('He tirado un dado y ha salido '+result);
  }
  else
  {
    var i;
    for (i = 0; i < dice; i++) { 
      result[i]=Math.floor(Math.random() * (max+1 - min)) + min;
      return ('He tirado '+dice+' dados y ha salido: '+result.toString())
    }
  }
}

client.login(process.env.BOT_TOKEN);