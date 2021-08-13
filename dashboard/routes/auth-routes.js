const config = require('../../config.js');
const express = require('express');
const authClient = require('../modules/auth-client');
const sessions = require('../modules/sessions');

const router = express.Router();

router.get('/invite', (req, res) =>
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=874338511464046622&permissions=0&redirect_uri=https%3A%2F%2Fdyno-clone.dhvitop.repl.co%2Fauth&scope=bot`));

router.get('/login', (req, res) =>
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=874338511464046622&redirect_uri=https%3A%2F%2Fdyno-clone.dhvitop.repl.co%2Fauth&response_type=code&scope=identify%20guilds`));

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