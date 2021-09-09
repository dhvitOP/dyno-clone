const { model } = require('mongoose');
const config = require("../../config.js");
class GeneralModule {
  prefix = config.prefix;
  blacklistedChannelIds = [];
}

module.exports = model('guild', {
  _id: String,
  general: { type: Object, default: new GeneralModule() }
});
