const { createToken } = require('../utils/auth');
const User = require("../models/User");

exports.registerUser = (req, res) => {
  if (
    !req.body.email ||
    !req.body.fullName ||
    !req.body.phone ||
    !req.body.password
  ) {
    return res.status(400).json({ msg: 'Invalid data' });
  }
  const incomingUser = {
    email : req.body.email,
    fullName : req.body.fullName,
    phone : req.body.phone ,
    password : req.body.password,
    isNumberVerified : false,
    isEmailVerified : false,
    frontId : 'test',
    backId : 'test',
    role: 'user',
    isIdSubmitted : false
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }

    if (user) {
      return res.status(400).json({ msg: 'The user already exists' });
    }

    let newUser = User(incomingUser);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(user);
    });
  });
};

exports.changePassword = (req,res) => {
  if (
    !req.body.email ||
    !req.body.pass
  ) {
    console.log(req.body);
    return res.status(400).json({ msg: 'Invalid data' });
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    user.password = req.body.pass;
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(user);
    });
  });
}

exports.loginUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ msg: 'You need to send email/number and password' });
  }

  if (req.body.email.includes('@')) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
  
      if (!user) {
        return res.status(400).json({ msg: 'The user does not exist' });
      }
  
      user.comparePassword(req.body.password, (err, isMatch) => {
        console.log(user);
        if (isMatch && !err) {
          return res.status(200).json({
            token: createToken(user),
          });
        } else {
          return res
            .status(400)
            .json({ msg: "The email and password don't match." });
        }
      });
    });
  } else {
    User.findOne({ phone: req.body.email }, (err, user) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
  
      if (!user) {
        return res.status(400).json({ msg: 'The user does not exist' });
      }
  
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          return res.status(200).json({
            token: createToken(user),
          });
        } else {
          return res
            .status(400)
            .json({ msg: "The phone and password don't match." });
        }
      });
    });
  }
};

exports.getUserByEmail = (req, res) => {
  if (!req.query.email) {
    return res.status(400).send({ msg: 'You need to send email' });
  }

  User.findOne({ email: req.query.email }, (err, user) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }

    if (!user) {
      return res.status(400).json({ msg: 'The user does not exist' });
    }
    return res.status(200).json({
      user: user,
    });
  });

};

