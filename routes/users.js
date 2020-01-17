var express = require('express');
var router = express.Router();
const logger = require('tracer').colorConsole();
let userCtrl = require('../controller/user.controller');
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async function(req, res, next) {
  try {
    logger.info(req.body);
    let result = await userCtrl.save(req.body);
    res.jsonp(result);
  } catch (err) {
    console.log('error in route:', err.message);
    // console.log(typeof err);
    // return err;
    // err.message.forEach(element => {
    //   console.log(element);
    // });
    res.status(400).send(err.message);
    // next(err);
  }
});

router.post('/login', async function(req, res) {
  try {
    let {userName, password} = req.body;
    if (userName == '' && password == '') {
      return res.status(404).json({err: 'invalid credentials'});
    }
    let result = await userCtrl.login({userName, password});
    logger.info('login result', result);
    res.json(result);
  } catch(err) {
    return err;
  }
});

router.get('/login/facebook', passport.authenticate('facebook', {session: false}));

router.get('/login/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login/facebook', session: false }), async function(req, res) {
  try {
    logger.info('callback');
  } catch(err) {
    return err;
  }
});

router.get('/list', passport.authenticate('jwt', {session: false}), async function(req, res) {
  try {
    logger.debug('authenticated');
  } catch(err) {
    return err;
  }
});

module.exports = router;
