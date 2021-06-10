const router = require('express').Router();
const stripe = require('../controllers/stripe');

router.post('/create-checkout-session', stripe.checkout);
router.post('/confirm-booking-online', stripe.confirmRideOnline);

module.exports = {
  router: router,
  basePath: '/api'
};
