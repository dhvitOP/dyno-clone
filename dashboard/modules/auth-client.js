const OAuthClient = require('disco-oauth');
const config = require('../../config.js');

const client = new OAuthClient(config.bid, config.secret);
client.setRedirect(`${config.dashboardURL}/auth`);
client.setScopes('identify', 'guilds');

module.exports = client;