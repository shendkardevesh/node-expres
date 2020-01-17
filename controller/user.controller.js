let UserModel = require('../model/user.model');
let logger = require('tracer').colorConsole();
const jwt = require('jsonwebtoken');
const config = require('../config/constant');

module.exports.save = async function(data) {
  try {
    logger.info(data);
    let {userName, password, email} = data;
    let userData = {userName, password, email};
    let userObject = new UserModel(userData);
    let response = await userObject.save();
    logger.info('user saved successfully: ', response);
    return response;
  } catch (err) {
    console.log('error get called : ', err._message);
    console.log('error get called : ', err.errors.email.message);
    let errorMessage = [];
    for(var i in err.errors) {
      // console.log(i);
      // let errobj = {
      //   message: err.errors[i].message,
      //   error: err.errors[i].name
      // };
      errorMessage.push(err.errors[i].message);
    }
    throw new Error(errorMessage);
    // return err;
  }
};

module.exports.login = async function(data) {
  try {
    let {userName, password} = data;
    let user = await UserModel.findOne({userName: userName});
    logger.info('user find', user);
    // let userObject = new UserModel(user);
    let passwordmatch = await user.comparePassword(password);
    logger.info('password matched', passwordmatch);
    if (!passwordmatch) {
      throw new Error('invalid Credentials!');
    }
    logger.trace(config.secretOrKey);
    const token = jwt.sign({_id: user._id, timeStamp: Date.now()}, config.secretOrKey, { expiresIn: '1h' });
    logger.log(token);
    return {
      _id: user._id,
      userName,
      token
    }
  } catch (err) {
    return err;
  }
};
