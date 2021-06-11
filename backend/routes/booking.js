const router = require('express').Router();
const booking = require('../controllers/booking');

router.post('/add-booking-cash', booking.addBookingCash);
router.get('/my-bookings', booking.myBookings);
router.get('/all-bookings', booking.allBookings);
router.get('/booking', booking.getBookingById);
router.get('/end-booking', booking.endBooking);
router.post('/feedback', booking.feedback);

module.exports = {
  router: router,
  basePath: '/api'
};
