const logs = require('../../data/logs');

module.exports = new class {
  async change(id, change) {
    const log = await logs.get(id);
    log.changes.push(change);
    await log.save();
  }
}
