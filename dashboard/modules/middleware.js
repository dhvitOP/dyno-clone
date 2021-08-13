const sessions = require('./sessions');
const { sendError } = require('./api-utils');
const bot = require('../../xp');
const musicHandler = require('../../handlers/music-handler');

module.exports.updateGuilds = async (req, res, next) => {
  try {
    const key = res.cookies.get('key')
      || req.get('Authorization');
    if (key) {
      const { guilds } = await sessions.get(key);
      res.locals.guilds = guilds;
    }
  } finally {
    return next();
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const key = res.cookies.get('key')
       req.get('Authorization');
    if (key) {
      const { authUser } = await sessions.get(key);
      res.locals.user = authUser;
    }
  } finally {
    return next();
  }
};

module.exports.updateMusicPlayer = async (req, res, next) => {
  try {
    const requestor = bot.guilds.cache
      .get(req.params.id).members.cache.get(res.locals.user.id)
      
    if (!requestor)
      throw new TypeError('You shall not pass.');
    
    res.locals.requestor = requestor;
    res.locals.player = function(options){
      musicHandler.get({
      guildId: req.params.id,
      voiceChannel: !requestor.voice ? null : requestor.voice.channel,
      userxd : requestor,
      track: options.songname,
      res: res
    });
    }
    res.locals.player.play = function(options){
        

      musicHandler.play({
      guildId: req.params.id,
      voiceChannel: !requestor.voice ? null : requestor.voice.channel,
      track: options.songname,
      userxd : requestor,
      res: res
    });
    }
      
     res.locals.player.isPaused = function(){
      let queue = bot.queue.get(req.params.id);
      if(queue.playing !== false)
      {
        return false;
      }
      else {
        return true;
      }
    
    }
    res.locals.player.shuffle = function()
    {
      let queue = bot.queue.get(req.params.id);
      
        let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    bot.queue.set(req.params.id, queue);
    }
    res.locals.player.settings = function(){
      let queue = bot.queue.get(req.params.id);
      return queue;
    }
    
    res.locals.player.skip = function(){
      let queue = bot.queue.get(req.params.id);
      queue.connection.dispatcher.end('Okie skipped!')
    }
     res.locals.player.settings.volume = function(options){
      let queue = bot.queue.get(req.params.id);
      queue.connection.dispatcher.setVolumeLogarithmic(options.rate);
    }
    res.locals.player.end = function(){
      let queue = bot.queue.get(req.params.id);
      queue.songs = []
      queue.connection.dispatcher.end("done");
    }
    res.locals.player.queue = function(){
      let queue = bot.queue.get(req.params.id);
      return queue.songs;
    }
    res.locals.player.pause = function(){
      let queue = bot.queue.get(req.params.id);
      queue.connection.dispatcher.pause();
    }
    res.locals.player.resume = function(){
      let queue = bot.queue.get(req.params.id);
      queue.connection.dispatcher.resume();
    }
    res.locals.player.stop = function(){
      let queue = bot.queue.get(req.params.id);
      queue.connection.dispatcher.end("done");
    }
    return next();    
  } catch (error) {
    
    sendError(res, { message: error.message });
  }
};

module.exports.validateGuild = async (req, res, next) => {
  res.locals.guild = res.locals.guilds.find(g => g.id === req.params.id);
  return (res.locals.guild)
    ? next()
    : res.render('errors/404');
};

module.exports.validateUser = async (req, res, next) => {
  return (res.locals.user)
    ? next()
    : res.render('errors/401');
};