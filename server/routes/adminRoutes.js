const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();


// Department routes
router.post('/departments', adminController.createDepartment);
router.get('/departments', adminController.getAllDepartments);
router.put('/departments/:id', adminController.updateDepartment);
router.delete('/departments/:id', adminController.deleteDepartment);

// Level routes
router.post('/levels', adminController.createLevel);
router.get('/levels', adminController.getAllLevels);
router.put('/levels/:id', adminController.updateLevel); 
router.delete('/levels/:id', adminController.deleteLevel);

// Program routes
router.post('/programs', adminController.createProgram);
router.get('/programs', adminController.getAllPrograms);
router.put('/programs/:id', adminController.updateProgram);
router.delete('/programs/:id', adminController.deleteProgram);

// Course routes
router.post('/courses', adminController.createCourse);
router.get('/courses', adminController.getAllCourses);
router.put('/courses/:id', adminController.updateCourse);
router.delete('/courses/:id', adminController.deleteCourse);

// Semester routes
router.post('/semesters', adminController.createSemester);
router.get('/semesters', adminController.getAllSemesters);
router.put('/semesters/:id', adminController.updateSemester);
router.delete('/semesters/:id', adminController.deleteSemester);

// Subject routes
router.post('/subjects', adminController.createSubject);
router.get('/subjects', adminController.getAllSubjects);
router.put('/subjects/:id', adminController.updateSubject);
router.delete('/subjects/:id', adminController.deleteSubject);

// Classroom routes
router.post('/classrooms', adminController.createClassroom);
router.get('/classrooms', adminController.getAllClassrooms);
// router.get('/classrooms/:id', adminController.getClassroom);
router.put('/classrooms/:id', adminController.updateClassroom);
router.delete('/classrooms/:id', adminController.deleteClassroom);

// Schedule routes
router.post('/schedules', adminController.createSchedule); 
router.get('/schedules', adminController.getAllSchedules);
router.get('/schedules/:id', adminController.getSchedule);
router.put('/schedules/:id', adminController.updateSchedule); 
router.delete('/schedules/:id', adminController.deleteSchedule);

// Class routes
router.post('/classes', adminController.createClass); 
router.get('/classes', adminController.getAllClasses); 
router.get('/classes/:id', adminController.getClass);  
router.put('/classes/:id', adminController.updateClass); 
router.delete('/classes/:id', adminController.deleteClass); 

// Admin routes
router.get('/admins', adminController.getAllAdmins);  
router.get('/admins/:id', adminController.getAdmin); 
router.post('/admins', adminController.createAdmin);  
router.put('/admins/:id', adminController.updateAdmin); 
router.delete('/admins/:id', adminController.deleteAdmin); 


module.exports = router;
