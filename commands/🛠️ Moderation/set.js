
const guilds = require('../../data/guilds');


module.exports = {
  name: "set",
  aliases: ["prefix", "set-prefix", "prefix-set"],
  execute: async(client, message, args) => {
  
  
    let value = args[0];
    const savedGuild = await guilds.get(message.guild.id);

    if (!value)
      return message.channel.send(`Prefix is \`${savedGuild.general.prefix}\``);

    savedGuild.general.prefix = value;
    await savedGuild.updateOne(savedGuild);

    return message.channel.send(`Prefix is now \`${value}\``);


  
  }
}
  module.exports.help = {
  name: "set",
  description: "This will set the config",
  usage: "set",
  type: "Moderation" 
}