const Discord = require("discord.js");
const { Message } = require("discord.js");
const fs = require("fs");

module.exports = async (client, message) => {
    
    client.user.setActivity(`Your Commands!!! | .help FOr My Commands | Also Watching ${client.guilds.cache.size} Servers`, { type : "WATCHING" });
   
     /* client.ws.on('INTERACTION_CREATE', async (interaction) => {
   client.slash.commandsrun(interaction, client);
  
    })   */       
             
             
 

   
}