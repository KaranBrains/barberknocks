const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AddressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
});

const ClientSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailOtp :{
    type: String,
  },
  phoneOtp :{
    type: String,
  },
  isNumberVerified: {
    type: Boolean,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
  },
  address: [AddressSchema]
});

ClientSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

ClientSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

ClientSchema.virtual('_password')
  .set(function (_password) {
    this.password = _password;
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return;
      else {
        bcrypt.hash(this.password, salt, function (err, hash) {
          if (err) return;
          else {
            this.password = hash;
          }
        });
      }
    });
  })
  .get(function () {
    return this.password;
  });

module.exports = mongoose.model('Users', ClientSchema);
