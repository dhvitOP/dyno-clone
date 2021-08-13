const users = require('../data/users');

module.exports = new class {
  cooldowns = [];

  async handleMessage(msg) {
    if (this.inCooldown(msg.author.id)) return;

    const minLength = 5;
    if (msg.content.length < minLength) return;

    const savedUser = await users.get(msg.author.id);
    savedUser.coins += 5;
    await savedUser.save();

    this.handleCooldown(msg.author.id);
  }

  handleCooldown(userId) {
    this.cooldowns.push(userId);

    setTimeout(() => {
      const index = this.cooldowns.indexOf(userId);
      this.cooldowns.splice(index, 1);
    }, 60 * 1000);
  }

  inCooldown(userId) {
    return this.cooldowns.includes(userId);
  }

  async getRank(userId, guildId) {
    return (await users.getInGuild(guildId))
      .sort((a, b) => (a.coins < b.coins) ? 1 : -1)
      .findIndex(u => u.id === userId) + 1;
  }
}
