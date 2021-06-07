const router = require('express').Router();
const client = require('../controllers/user');

router.post('/signup',client.registerUser);
router.post('/login', client.loginUser);
router.put('/change-password', client.changePassword);
router.get('/user-email', client.getUserByEmail);

module.exports = {
  router: router,
  basePath: '/api'
};
