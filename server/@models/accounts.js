const
  mongoose = require('mongoose'),
  crypto = require('crypto');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpired: {
    type: Date,
  },
  email: {
    type: String,
  },
  lastLogin: Date,
  salt: String,
}, {
  collection: 'Accounts',
  timestamps: true, // added createdAt and updatedAt automatically
});

schema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.passwordHash = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });


schema.methods = {
  authenticate(plainText) {
    if (!plainText) return false;
    return this.encryptPassword(plainText) === this.passwordHash;
  },
  encryptPassword(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
  makeSalt() {
    return Math.round((new Date().valueOf() * Math.random())).toString();
  },
};

schema.path('passwordHash').validate(function () {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

module.exports = mongoose.model('Accounts', schema);
