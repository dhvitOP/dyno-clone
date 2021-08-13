const express = require('express');
const {readdirSync} = require("fs");
const bot = require('../../xp');
const users = require('../../data/users');
const commands = new Map();
    readdirSync('./commands/').forEach(dir => {
    
        const commandsxd = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commandsxd){
            let pull = require(`../../commands/${dir}/${file}`);
           
            if(pull){
                commands.set(pull.name, pull);
                
           
        }
    }
    });

const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.get('/commands', (req, res) => res.render('commands', {
  subtitle: 'Commands',
  categories: [
    { name: 'Auto Mod', icon: 'fas fa-gavel' },
    { name: 'Economy', icon: 'fas fa-coins' }, 
    { name: 'General', icon: 'fas fa-star' },
    { name: 'Music', icon: 'fas fa-music' }
  ],
  commands: Array.from(commands.values()),
  commandsString: JSON.stringify(Array.from(commands.values()))
}));

router.get('/leaderboard/:id', async (req, res) => {
  const guildxd = bot.guilds.cache.get(req.params.id);
  if (!guildxd)
    return res.render('errors/404');

  const savedUsers = (await users.getInGuild(req.params.id))
    .sort((a, b) => (a.coins < b.coins) ? 1 : -1)
    .slice(0, 100);

  res.render('dashboard/leaderboard', { guildxd, savedUsers });
});

module.exports = router;
