const ApiError = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');
const Teacher = require('../models/Teacher');

//! Teacher CRUD operations
exports.createTeacher = catchAsync(async (req, res, next) => {
  const { name, email, phone } = req.body;

  const teacher = await Teacher.create({ name, email, phone });

  res.status(201).json({
      status: 'success',
      data: teacher
  });
});

exports.getAllTeachers = catchAsync(async (req, res, next) => {
  const teachers = await Teacher.find();

  res.status(200).json({
      status: 'success',
      results: teachers.length,
      data: teachers
  });
});

exports.getTeacher = catchAsync(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
      return next(new ApiError('Teacher not found', 404));
  }

  res.status(200).json({
      status: 'success',
      data: teacher
  });
});

exports.updateTeacher = catchAsync(async (req, res, next) => {
  const { name, email, phone } = req.body;

  const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true, runValidators: true }
  );

  if (!teacher) {
      return next(new ApiError('Teacher not found', 404));
  }

  res.status(200).json({
      status: 'success',
      data: teacher
  });
});

exports.deleteTeacher = catchAsync(async (req, res, next) => {
  const teacher = await Teacher.findByIdAndDelete(req.params.id);

  if (!teacher) {
      return next(new ApiError('Teacher not found', 404));
  }

  res.status(204).json({
      status: 'success',
      data: null
  });
});

// test
exports.test = async (req, res, next) => {
    
    res.status(200).json({
      status: 'success',
      data: "teacher test"
    });
};