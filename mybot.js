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
  	case "help":
    switch (args.length){
      case 0:
      message.channel.send('Por el momento puedo realizar las siguientes funciones: \n -Citar un mensaje al que se reaccione con :speech_balloon: \n -Tirar un dado con el comando roll \n -Mostrar ayuda detallada escribiendo JMB! help comando');
      break;
      default:
      switch (args[0]){
        case "help":
        message.channel.send('Muestra la ayuda del bot.');
        break;
        case "roll":
        message.channel.send('Tiro un dado configurable: __JMB! roll X Y Z__ significa lanzar un dado con valores entre X y Z, Y veces. Todos los parámetros son opcionales, por defecto lanzaré un dado de 6 caras tradicional.');
        break;
        default:
        message.channel.send('No sé qué comando es ese.');
      }
    }
  	 break;
    case "roll" :
      switch (args.length) {
        case 0:
          message.channel.send(roll(1,6,1));
          break;
        case 1:
          message.channel.send(roll(1,parseInt(args[0],10),1));
          break;
        case 2:
          message.channel.send(roll(1,parseInt(args[0],10),parseInt(args[1],10)));
          break;
        case 3:
          message.channel.send(roll(parseInt(args[2],10),parseInt(args[0],10),parseInt(args[1],10)));
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
    var hour
    month=reaction.message.createdAt.getMonth()+1;
    hour=reaction.message.createdAt.getHours()+2;
		reaction.message.channel.send(user.toString() + ' ha citado el mensaje de ' + reaction.message.author.toString() + ' :\n' + reaction.message.cleanContent + '```\n Enviado el '+reaction.message.createdAt.getDate()+'-'+month+'-'+reaction.message.createdAt.getFullYear()+' a las '+hour+' horas y '+reaction.message.createdAt.getMinutes()+' minutos.```');
	}
});

//Rolling dice
function roll(min, max, dice){
  var result=[];
  var caras=max-min+1;
  if (dice===1){
    result[0]=Math.floor(Math.random() * (caras)) + min;
    return ('He tirado un dado de '+caras+' caras numeradas a partir de '+min+' y ha salido '+result.toString());
  }
  else
  {
    var i;
    for (i = 0; i < dice; i++) { 
      result[i]=Math.floor(Math.random() * (caras)) + min;
    }
    return ('He tirado '+dice+' dados de '+caras+' caras numeradas a partir de '+min+' y ha salido: '+result.toString());
  }
}

client.login(process.env.BOT_TOKEN);