const express = require('express');
const { sendError } = require('../modules/api-utils');

const router = express.Router({ mergeParams: true });

router.get('/play', async (req, res) => {
  try {
    let test = !res.locals.requestor.voice ? false : true;
        if(test === false)
        {

        
       sendError(res, { message: "You Should be Connected to Any Voice Channel on The Selected Guild" });
        }
    const track = await res.locals.player.play({songname : req.query.q, userxd: res.locals.requestor});
  res.json({ message: `${track}`});
  } catch (error) {
    console.log(error);
    sendError(res, error);
  }
});

router.get('/stop', async (req, res) => {
  try {
    res.locals.player.end();

    res.json({ code: 200, message: 'Success!' });
  } catch (error) {
      console.log(error);
    sendError(res, error);
  }
});

router.get('/toggle', async (req, res) => {
  try {
    
    if(res.locals.player.isPaused === true)
    {
  
      res.locals.player.resume();
    }
    else {
      res.locals.player.pause();
    }
    
  

    res.json({ message: 'Success' });
  } catch (error) {
      console.log(error);
    sendError(res, error);
  }
});

router.get('/volume', async (req, res) => {
  try {
     res.locals.player.settings.volume({rate:req.query.v});

    res.json({ message: 'Success' });
  } catch (error) {
      console.log(error);
    sendError(res, error);
  }
});

router.get('/seek', async (req, res) => {
  try {
   
     let queue = res.locals.player.settings;
      queue.connection.dispatcher.end('Okie skipped!')
    
    res.json({ message: 'Success' });
  } catch (error) {
      console.log(error);
    sendError(res, error);
  }
});

router.get('/list', async (req, res) => {
  try {
    res.json({ message: `${res.locals.player.queue}`});
  } catch (error) {
      console.log(error);
    sendError(res, error);
  }
});

router.get('/remove', async (req, res) => {
  try {
    const index = +req.query.i;
    let queue = res.locals.player.settings;
    queue.connection.dispatcher.stop('Okie skipped!')

    res.json({ message: 'Success' });
  } catch (error) {
      console.log(error);
    sendError(res, error);
  }
});

router.get('/shuffle', async (req, res) => {
  try {
    res.locals.player.shuffle();

    res.json({ message: `${res.locals.player.settings.songs}` });
  } catch (error) {
      console.log(error);
    sendError(res, error);
  }
});

router.get('/skip', async (req, res) => {
  try {
    await res.locals.player.skip();

    res.json({ message: `${res.locals.player.settings.songs}` });
  } catch (error) {
      console.log(error);
    sendError(res, error);
  }
});

module.exports = router;
