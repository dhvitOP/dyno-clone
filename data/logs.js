const SavedLog = require('./models/log');

module.exports = new class {
  async get(id) {
    return await SavedLog.findById(id)
      || await new SavedLog({ _id: id }).save();
  }

  async add(id, property) {
    const savedLog = await this.get(id);

    const day = new Date().getDay();
    const loggedLastWeek = savedLog[property][day] > 0;
    (loggedLastWeek)
      ? savedLog[property][day] = 0
      : savedLog[property][day - 1]++;

    await savedLog.updateOne(savedLog);
  }
}
