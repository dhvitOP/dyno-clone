const { model } = require('mongoose');

module.exports = model('log', {
  _id: String,
  changes: { type: Array, default: [] },
  messages: { type: Array, default: [0,0,0,0,0,0,0] },
  commands: { type: Array, default: [0,0,0,0,0,0,0] },
  leaves: { type: Array, default: [0,0,0,0,0,0,0] },
  joins: { type: Array, default: [0,0,0,0,0,0,0] },
  punishments: { type: Array, default: [0,0,0,0,0,0,0] }
});
