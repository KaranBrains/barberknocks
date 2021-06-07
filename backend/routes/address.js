const router = require('express').Router();
const address = require('../controllers/address');

router.post('/add-address',address.addAddress);

module.exports = {
  router: router,
  basePath: '/api'
};
