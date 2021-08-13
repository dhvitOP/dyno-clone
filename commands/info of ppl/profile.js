
const users = require('../../data/users');
const economy = require('../../modules/economy');
const canvacord = require('canvacord');

module.exports = {
  name: "profile",
  aliases: ['pr', 'infopr'],
  description: "Shows all available bot commands.",
  execute: async (client, message, args) => {
    var userId = message.mentions.users.first();
    if(!userId)
    {
      var userId = message.author.id;
    }
    const user = message.guild.members.cache.get(userId).user;
    if (!user)
      message.channel.send("not Accepted invalid user");

    const savedUser = await users.get(userId);
    const rank = await economy.getRank(userId, message.guild.id);

    const buffer = await new canvacord.Rank()
      .setAvatar(user.displayAvatarURL({ format: 'png' }))
      .setBackground('IMAGE', 'https://cdn.pixabay.com/photo/2019/04/30/10/47/background-4168284_960_720.jpg')
      .setCurrentXP(savedUser.coins)
      .setDiscriminator(user.discriminator)
      .setLevel(0, ' ', false)
      .setProgressBar('#C5B358', 'COLOR', false)
      .setProgressBarTrack('#000000')
      .setRank(rank, '#    ', true)
      .setRequiredXP(1_000_000)
      .setUsername(user.username)
      .build();

    await message.channel.send({
      files: [{
        attachment: buffer,
        name: 'profile.png'
      }]
    });
  }
}
module.exports.help = {
    name: "profile",
    description: "Display a user profile",
    usage: "profile <mention>",
    type: "Economy"  
}