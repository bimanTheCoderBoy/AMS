const ApiError = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');

//! Student CRUD operations 
exports.getAllStudents = catchAsync(async (req, res, next) => {
  const students = await Student.find();

  res.status(200).json({
      status: 'success',
      results: students.length,
      data: students
  });
});
 
exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
      return next(new ApiError('Student not found', 404));
  }

  res.status(200).json({
      status: 'success',
      data: student
  });
}); 

exports.createStudent = catchAsync(async (req, res, next) => {
  const { name, email, phone, classroom_id, promote_flag } = req.body;

  const student = await Student.create({ name, email, phone, classroom_id, promote_flag });

  res.status(201).json({
      status: 'success',
      data: student
  });
});

exports.updateStudent = catchAsync(async (req, res, next) => {
  const { name, email, phone, classroom_id, promote_flag } = req.body;

  const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, classroom_id, promote_flag },
      { new: true, runValidators: true }
  );

  if (!student) {
      return next(new ApiError('Student not found', 404));
  }

  res.status(200).json({
      status: 'success',
      data: student
  });
});
 
exports.deleteStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
      return next(new ApiError('Student not found', 404));
  }

  res.status(204).json({
      status: 'success',
      data: null
  });
});

//! Attendance operations
exports.createAttendance = catchAsync(async (req, res, next) => {
  const { student_id, class_id, status, date, verified_by } = req.body;

  const attendance = await Attendance.create({ student_id, class_id, status, date, verified_by });

  res.status(201).json({
      status: 'success',
      data: attendance
  });
});



// test
exports.test = async (req, res, next) => {
    
    res.status(200).json({
      status: 'success',
      data: "student test"
    });
};