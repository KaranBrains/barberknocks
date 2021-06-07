require('dotenv').config();
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } = process.env;
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const { createToken } = require('../utils/auth');
const User = require("../models/User");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.emailOtpSend = (req, res) => {
  if (!req.query.email) {
    return res.status(400).send({ msg: 'You need to send email' });
  }

  // generate a 6 digit random otp
  const otp = Math.floor(100000 + Math.random() * 900000);
  User.findOne({ email: req.query.email }, (err, user) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }

    if (!user) {
      return res.status(400).json({ msg: 'The user does not exist' });
    }
    user.emailOtp = otp;
    return user.save();
  }).then(result=>{
    const msg = {
      to: req.query.email,
      from: process.env.SENDGRID_EMAIL, // Change to your verified sender
      subject: 'Road-Rules OTP',
      text: 'Email Verification OTP',
      html: `<h1>Email Verification OTP</h1>
             <pre>The otp to verify your email is  ${otp} </pre>`,
    }
    sgMail.send(msg)
    .then(info => {
        console.log(info)
        res.status(200).send({msg: "Otp sent successfully"})
    })
    .catch(err => {
        res.status(400).send({msg: "Otp not sent please try again"})
    });
  })
};

exports.verifyEmail = (req, res) => {
  if (!req.body.email || !req.body.otp) {
    return res.status(400).send({ msg: 'You need to send email and otp' });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }

    if (!user) {
      return res.status(400).json({ msg: 'The user does not exist' });
    }
    if (user.emailOtp == req.body.otp) {
      user.emailOtp = null;
      user.isEmailVerified = true;
      user.save()
      .then(result=>{
        res.status(200).send({msg: "Email verified successfully"})
      })
      .catch(err => {
        res.status(400).send({msg: "Some error occured , please try again"})
      });
    } else {
      res.status(400).send({msg: "Wrong OTP , Please enter correct OTP!"})
    }
  })
};

exports.phoneOtpSend = async (req, res) => {
  const channel = 'sms';
  let verificationRequest;
  try {
    verificationRequest = await twilio.verify.services(VERIFICATION_SID)
      .verifications
      .create({ to: '+' + req.query.phone, channel });
      return res.status(200).send({msg:"Verify otp sent"});
  } catch (e) {
    console.log(e);
    return res.status(400).send({msg: e});
  }
};

exports.phoneOtpCheck = async (req, res) => {
  const { verificationCode: code } = req.body;
  let verificationResult;
  const errors = { wasValidated: true };

  try {
    verificationResult = await twilio.verify.services(VERIFICATION_SID)
      .verificationChecks
      .create({ code, to: '+'+ req.query.phone });
  } catch (e) {
    console.log(e);
    return res.status(500).send({msg:e});
  }

  if (verificationResult.status === 'approved') {
    User.findOne({ email: req.query.email }, (err, user) => {
      if (err) {
        return res.status(400).send({ msg: err });
      }
  
      if (!user) {
        return res.status(400).json({ msg: 'The user does not exist' });
      }
      user.isNumberVerified = true;
      user.save()
      .then(result=>{
        res.status(200).send({msg: "Phone verified successfully"})
      })
      .catch(err => {
        res.status(400).send({msg: "Some error occured , please try again"})
      });
    })
  } else {
    res.status(400).send({msg: `Unable to verify code. status: ${verificationResult.status}`})
  }
};

exports.forgotEmailOtpSend = (req, res) => {  
  if (!req.query.email) {
    return res.status(400).send({ msg: 'You need to send email' });
  }

  // generate a 6 digit random otp
  const otp = Math.floor(100000 + Math.random() * 900000);
  User.findOne({ email: req.query.email }, (err, user) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }

    if (!user) {
      return res.status(400).json({ msg: 'The user does not exist' });
    }
    user.emailOtp = otp;
    return user.save();
  }).then(result=>{
    const msg = {
      to: req.query.email,
      from: process.env.SENDGRID_EMAIL, // Change to your verified sender
      subject: 'Road-Rules OTP',
      text: 'Password Reset OTP',
      html: `<h1>Password Reset OTP</h1>
             <pre>The otp to reset your password is  ${otp} </pre>`,
    }
    sgMail.send(msg)
    .then(info => {
        console.log(info)
        res.status(200).send({msg: "Otp sent successfully"})
    })
    .catch(err => {
        res.status(400).send({msg: "Otp not sent please try again"})
    });
  })
};

exports.forgotOtpCheck = async (req, res) => {
  console.log(req.body);
  if (!req.body.email || !req.body.otp) {
    return res.status(400).send({ msg: 'You need to send email and otp' });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }

    if (!user) {
      return res.status(400).json({ msg: 'The user does not exist' });
    }
    if (user.emailOtp == req.body.otp) {
      console.log(user.emailOtp);      
      user.save()
      .then(result=>{
        res.status(200).send({msg: "Email verified successfully",token: createToken(result)})
      })
      .catch(err => {
        res.status(200).send({msg: "Some error occured , please try again",})
      });
    } else {
      res.status(400).send({msg: "Wrong OTP , Please enter correct OTP!"})
    }
  })
};

