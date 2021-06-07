const router = require('express').Router();
const instructor = require('../controllers/instructor');

router.post('/add-instructor', instructor.addInstructor);
router.get('/get-instructors', instructor.getAll);
router.get('/instructor',instructor.getInstructorById);
router.delete('/delete-instructor', instructor.deleteInstructor);

module.exports = {
  router: router,
  basePath: '/api'
};
