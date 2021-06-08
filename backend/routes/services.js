const router = require('express').Router();
const service = require('../controllers/service');

router.post('/add-service', service.addService);
router.get('/get-services', service.getAll);
router.get('/service',service.getServiceById);
router.delete('/delete-services', service.deleteService);

module.exports = {
  router: router,
  basePath: '/api'
};
