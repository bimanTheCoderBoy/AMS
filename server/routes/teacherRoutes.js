const express = require('express');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

// test routes
router.get('/teachertest', teacherController.test);

// Teacher routes
router.post('/teachers', teacherController.createTeacher);
router.get('/teachers', teacherController.getAllTeachers);
router.get('/teachers/:id', teacherController.getTeacher);
router.put('/teachers/:id', teacherController.updateTeacher);
router.delete('/teachers/:id', teacherController.deleteTeacher);

module.exports = router;
