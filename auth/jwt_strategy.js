const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJwt = require('passport-jwt');
const logger  = require('tracer').colorConsole();

let extractJwt = passportJwt.ExtractJwt;
let jwtStrategy = passportJwt.Strategy;

let options = {
  secretOrKey: 'key_for_success',
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
};

// module.exports = async function() {
//   return 
// }

module.exports = new jwtStrategy(options, async function(jwt_payload, done) {
  try {
    logger.info('passed jwt payload: ', jwt_payload);
    let {_id} = jwt_payload;
    
    return done(null, 'passed');
  } catch(err) {
    return err;
  }
});
