const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

// Service routes
router.get('/studenttest', studentController.test);

// Student routes
router.get('/students', studentController.getAllStudents);  
router.get('/students/:id', studentController.getStudent);  
router.post('/students', studentController.createStudent); 
router.put('/students/:id', studentController.updateStudent);  
router.delete('/students/:id', studentController.deleteStudent);  

// Attendance routes
router.post('/attendances', studentController.createAttendance);

module.exports = router;
