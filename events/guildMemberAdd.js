const logs = require('../data/logs');
module.exports = async (client, guild, member) => {
  await logs.add(guild.id, 'joins');
}