const SavedGuild = require('./models/guild');

module.exports = new class {
  async get(id) {
    return await SavedGuild.findById(id)
      || await new SavedGuild({ _id: id }).save();
  }
}