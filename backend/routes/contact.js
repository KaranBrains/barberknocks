const router = require('express').Router();
const contact = require('../controllers/contact');

router.post('/contact-us', contact.contactUs);

module.exports = {
  router: router,
  basePath: '/api'
};
