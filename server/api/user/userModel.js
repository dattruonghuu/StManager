const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },

  stripeCustomerId: {
    type: String
  },

  //we should hash password before saving it in Database
  //dont store the password as plain text
  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  phoneNumber: {
    type: String,
    unique: true,
    required: true
  },

  age: {
    type: String,
    required: true
  },

  school: {
    type: String,
    required: true
  },
});

UserSchema.plugin(uniqueValidator, { message: '{PATH}' });

//middleware that will run before a document is created
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = this.encryptPassword(this.password);
  next();
});

UserSchema.methods = {

  //check the passwords on signin
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },

  //hashpassword
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return '';
    } else {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  },
};

module.exports = mongoose.model('user', UserSchema);