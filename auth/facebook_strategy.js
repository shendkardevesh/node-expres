const passport = require('passport');
const passportFacebook = require('passport-facebook');
const logger = require('tracer').colorConsole();

let facebookStrategy = passportFacebook.Strategy;
let options = {
  clientID: '3093411694010257', // FACEBOOK_APP_ID,
  clientSecret: '62302d8188ac4013409cecf51f3c8bc1', // FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/users/login/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
};

module.exports = new facebookStrategy(options, async function(accessToken, refreshToken, profile, done) {
  try {
    logger.info('access token:' , accessToken);
    logger.info('refresh token:' , refreshToken);
    logger.info('profile :', profile);
    done(null, accessToken);
  } catch (err) {
    // return err;
    done(err, )
  }
});
