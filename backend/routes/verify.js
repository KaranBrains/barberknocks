const router = require('express').Router();
const verify = require('../controllers/verify');

router.get('/get-email-otp',verify.emailOtpSend);
router.get('/get-phone-otp',verify.phoneOtpSend);
router.get('/get-forgot-otp',verify.forgotEmailOtpSend);
router.post('/verify-phone-otp',verify.phoneOtpCheck);
router.post('/verify-email-otp',verify.verifyEmail);
router.post('/verify-forgot',verify.forgotOtpCheck);

module.exports = {
  router: router,
  basePath: '/api'
};
