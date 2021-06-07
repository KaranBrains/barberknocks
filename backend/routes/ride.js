const router = require('express').Router();
const ride = require('../controllers/ride');

router.post('/add-ride-cash', ride.addRideCash);
router.get('/my-rides', ride.myRides);
router.get('/all-rides', ride.allRides);
router.get('/ride', ride.getRideById);
router.get('/end-ride', ride.endRide);
router.post('/feedback', ride.feedback);

module.exports = {
  router: router,
  basePath: '/api'
};
