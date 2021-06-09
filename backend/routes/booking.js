const router = require('express').Router();
const booking = require('../controllers/booking');

router.post('/add-booking-cash', booking.addBookingCash);
router.get('/my-bookings', booking.myBookings);
// router.get('/all-rides', ride.allRides);
// router.get('/ride', ride.getRideById);
// router.get('/end-ride', ride.endRide);
// router.post('/feedback', ride.feedback);

module.exports = {
  router: router,
  basePath: '/api'
};
