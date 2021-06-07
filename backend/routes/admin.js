const router = require('express').Router();
const admin = require('../controllers/admin');

router.get('/admin/get-users', admin.getUsers);
router.get('/admin/get-user', admin.getUserById);

module.exports = {
  router: router,
  basePath: '/api'
};
