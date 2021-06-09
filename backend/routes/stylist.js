const router = require('express').Router();
const stylist = require('../controllers/stylist');

router.post('/add-stylist', stylist.addStylist);
router.get('/get-stylists', stylist.getAll);
router.get('/stylist',stylist.getStylistById);
router.delete('/delete-stylist', stylist.deleteStylist);
router.get('/search-service-stylist', stylist.getStylistsByService);

module.exports = {
  router: router,
  basePath: '/api'
};
