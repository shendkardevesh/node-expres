const mongoose = require('mongoose');
const bycrpt = require('bcrypt');

let userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function(next) {
  var user = this;
  bycrpt.hash(user.password, 10)
    .then((hashedPassword) => {
      user.password = hashedPassword;
      next();
    })
}, function(err) {
  next(err);
});

userSchema.methods.comparePassword = async function(passwordEnter) {
  try {
    console.log(this.password);
    let match = await bycrpt.compare(passwordEnter, this.password);
    return match
  } catch (err) {
    return err;
  }
}

module.exports = mongoose.model('user', userSchema);