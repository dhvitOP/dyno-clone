const config = require('../../config.js');
const express = require('express');
const authClient = require('../modules/auth-client');
const sessions = require('../modules/sessions');

const router = express.Router();
const { client } = require("../../xp.js");
router.get('/invite', (req, res) =>
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&redirect_uri=${encodeURIComponent(config.dashboardURL + "/auth")}&scope=bot`));

router.get('/login', (req, res) =>
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&redirect_uri=${encodeURIComponent(config.dashboardURL + "/auth")}&response_type=code&scope=identify%20guilds`));

router.get('/auth-guild', async (req, res) => {
  try {
    const key = res.cookies.get('key');
    await sessions.update(key);
  } finally {
    res.redirect('/dashboard');
  }
});

router.get('/auth', async (req, res) => {
  try {
    const code = req.query.code;
    const key = await authClient.getAccess(code);

    res.cookies.set('key', key);
    res.redirect('/dashboard');
  } catch {
    res.redirect('/');
  }
});

router.get('/logout', (req, res) => {
  res.cookies.set('key', '');

  res.redirect('/');
});

module.exports = router;
