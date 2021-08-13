const ytdl = require('ytdl-core-discord');
var scrapeYt = require("scrape-yt");
const bot = require("../xp");
const { sendError } = require('../dashboard/modules/api-utils');
module.exports = new class {
  
  async play(options, res)
  {
     if(!options.voiceChannel)
    {
      return;
    }

     const channel = options.voiceChannel;
      const server = bot.queue.get(options.guildId);
    let video = await scrapeYt.search(options.track);
    let result = video[0];

    const song = {
        id: result.id,
        title: result.title,
        duration: result.duration,
        thumbnail: result.thumbnail,
        upload: result.uploadDate,
        views: result.viewCount,
        requester: options.userxd,
        channel: result.channel.name,
        channelurl: result.channel.url
      };
      var date = new Date(0);
    date.setSeconds(song.duration); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);

       if (server) {
        server.songs.push(song);
       
         sendError(res, { message: `${song.title} Added To Queue` });
    }

       const queueConstruct = {
        voiceChannel: channel,
        voiceChannelxd: channel,
        connection: null,
     
        songs: [],
        volume: 2,
        playing: true
    };
     bot.queue.set(options.guildId, queueConstruct);
    queueConstruct.songs.push(song);
    const play = async song => {
        const queue = bot.queue.get(options.guildId);
        if (!song) {
            queue.voiceChannel.leave();
            bot.queue.delete(options.guildId);
             sendError(res, { message: `No Songs in Queue so Leaving the Voice Channel` });
            return;
        }

 
       const dispatcher = queue.connection.play(await ytdl(`https://youtube.com/watch?v=${song.id}`, {
            filter: format => ['251'],
            highWaterMark: 1 << 25
        }), {
            type: 'opus'
        })
            .on('finish', () => {
                queue.songs.shift();
                play(queue.songs[0]);
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(queue.volume / 5);
        sendError(res, { message: `Now Playing ${song.title}` });
    
    };

    try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        
     
        play(queueConstruct.songs[0]);
    } catch (error) {
        console.log(error);
        bot.queue.delete(options.guildId);
        await channel.leave();
     sendError(res, { message: "I Could Not Join Voice Channel" });
    }


   
}

  async get(options, res) {
    if(!options.voiceChannel)
    {
      return;
    }

     const channel = options.voiceChannel;
      const server = bot.queue.get(options.guildId);
    let video = await scrapeYt.search(options.track);
    let result = video[0];

    const song = {
        id: result.id,
        title: result.title,
        duration: result.duration,
        thumbnail: result.thumbnail,
        upload: result.uploadDate,
        views: result.viewCount,
        requester: message.author,
        channel: result.channel.name,
        channelurl: result.channel.url
      };
      var date = new Date(0);
    date.setSeconds(song.duration); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);

     

       const queueConstruct = {
        
        voiceChannelxd: channel,
        connection: null,
        songs: [],
        volume: 2,
        playing: true
    };
   bot.queue.set(options.guildId, queueConstruct);
    queueConstruct.songs.push(song);
      const dispatcher = queue.connection.play(await ytdl(`https://youtube.com/watch?v=${song.id}`, {
            filter: format => ['251'],
            highWaterMark: 1 << 25
        }), {
            type: 'opus'
        })
            .on('finish', () => {
                queue.songs.shift();
                play(queue.songs[0]);
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(0.75);
        sendError(res, { message: `Now Playing ${song.title}` });
    


    try {
        const connection = await channel.join();
        queueConstruct.connection = connection;
        play(queueConstruct.songs[0]);
    } catch (error) {
        
        bot.queue.delete(options.guildId);
        await channel.leave();
     sendError(res, { message: "I Could Not Join Voice Channel" });
    }


    const play = async song => {
        const queue = bot.queue.get(options.guildId);
        if (!song) {
            queue.voiceChannelxd.leave();
            bot.queue.delete(options.guildId);
            sendError(res, { message: "No Songs in Queue so Leaving Voice Channel" });
            
        }
  }
}
}
