const ApiError = require('../../utils/apiError');
const catchAsync = require('../../utils/catchAsync');
const Department = require('../../models/Department');
const Level = require('../../models/Level');
const Program = require('../../models/Program');
const Course = require('../../models/Course');
const Semester = require('../../models/Semester');
const Classroom = require('../../models/Classroom');


//! Classroom CRUD operations
exports.createClassroom = catchAsync(async (req, res, next) => {
    const {name, dept_id, level_id, program_id, course_id, semester_id } = req.body;

    if (!name || !dept_id || !level_id || !program_id || !course_id || !semester_id) {
        return next(new ApiError("All fields are required: name, dept_id, level_id, program_id, course_id, semester_id", 400));
    }

    const [deptExists, levelExists, programExists, courseExists, semesterExists, classroomExists] = await Promise.all([
        Department.findById(dept_id),
        Level.findById(level_id),
        Program.findById(program_id),
        Course.findById(course_id),
        Semester.findById(semester_id),
        Classroom.findOne({dept_id,program_id,course_id,semester_id,level_id})
    ]);

    if (!deptExists) return next(new ApiError("Invalid dept_id: Department not found", 400));
    if (!levelExists) return next(new ApiError("Invalid level_id: Level not found", 400));
    if (!programExists) return next(new ApiError("Invalid program_id: Program not found", 400));
    if (!courseExists) return next(new ApiError("Invalid course_id: Course not found", 400));
    if (!semesterExists) return next(new ApiError("Invalid semester_id: Semester not found", 400));
    if (classroomExists) return next(new ApiError("Classroom allready Exist", 400));


    const classroom = await Classroom.create({ name, dept_id,level_id,program_id, course_id, semester_id });

    res.status(201).json({
        status: 'success',
        data: classroom
    });
});

exports.getAllClassrooms = catchAsync(async (req, res, next) => {
    const classrooms = await Classroom.aggregate([
        {
          $lookup: {
            from: 'departments',
            localField: 'dept_id',
            foreignField: '_id',
            as: 'department'
          }
        },
        {
          $lookup: {
            from: 'levels',
            localField: 'level_id',
            foreignField: '_id',
            as: 'level'
          }
        },
        {
          $lookup: {
            from: 'programs',
            localField: 'program_id',
            foreignField: '_id',
            as: 'program'
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'course_id',
            foreignField: '_id',
            as: 'course'
          }
        },
        {
          $lookup: {
            from: 'semesters',
            localField: 'semester_id',
            foreignField: '_id',
            as: 'semester'
          }
        },
        { $unwind: '$department' },
        { $unwind: '$level' },
        { $unwind: '$program' },
        { $unwind: '$course' },
        { $unwind: '$semester' },
        {
          $project: {
            _id: 1,
            name: 1,
            department: {
              _id: '$department._id',
              name: '$department.name'
            },
            level: {
              _id: '$level._id',
              name: '$level.name'
            },
            program: {
              _id: '$program._id',
              name: '$program.name'
            },
            course: {
              _id: '$course._id',
              name: '$course.name'
            },
            semester: {
              _id: '$semester._id',
              name: '$semester.name'
            },
            createdAt: 1,
            updatedAt: 1
          }
        }
      ]);
      
      
    res.status(200).json({
        status: 'success',
        results: classrooms.length,
        data: classrooms
    });
});

exports.getClassroom = catchAsync(async (req, res, next) => {
    let classroom = await Classroom.findById(req.params.id)
        .populate('dept_id') 
        .populate('level_id') 
        .populate('program_id') 
        .populate('course_id') 
        .populate('semester_id'); 

    if (!classroom) {
        return next(new ApiError('Classroom not found', 404));
    }

    classroom={
      _id:classroom._id,
      name:classroom.name,
      department:{
        _id:classroom.dept_id._id,
        name:classroom.dept_id.name
      },
      level:{
        _id:classroom.level_id._id,
        name:classroom.level_id.name
      },
      program:{
        _id:classroom.program_id._id,
        name:classroom.program_id.name
      }, 
      semester:{
        _id:classroom.semester_id._id,
        name:classroom.semester_id.name
      },
      course:{
        _id:classroom.course_id._id,
        name : classroom.course_id.name
      }
    }
    res.status(200).json({
        status: 'success',
        data: classroom
    });
});


exports.updateClassroom = catchAsync(async (req, res, next) => {
    const {name, dept_id, level_id, program_id, course_id, semester_id } = req.body;

    const [deptExists, levelExists, programExists, courseExists, semesterExists, classroomExists] = await Promise.all([
      Department.findById(dept_id),
      Level.findById(level_id),
      Program.findById(program_id),
      Course.findById(course_id),
      Semester.findById(semester_id),
      Classroom.findById(req.params.id)
  ]);

  if (!deptExists) return next(new ApiError("Invalid dept_id: Department not found", 400));
  if (!levelExists) return next(new ApiError("Invalid level_id: Level not found", 400));
  if (!programExists) return next(new ApiError("Invalid program_id: Program not found", 400));
  if (!courseExists) return next(new ApiError("Invalid course_id: Course not found", 400));
  if (!semesterExists) return next(new ApiError("Invalid semester_id: Semester not found", 400));
  if (!classroomExists) return next(new ApiError("Classroom not found", 400));

    const classroom = await Classroom.findByIdAndUpdate(
        req.params.id,
        { dept_id, level_id, program_id, course_id, semester_id , name},
        { new: true, runValidators: true }
    );

    if (!classroom) {
        return next(new ApiError('Classroom not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: classroom
    });
});

exports.deleteClassroom = catchAsync(async (req, res, next) => {
    const classroom = await Classroom.findByIdAndDelete(req.params.id);

    if (!classroom) {
        return next(new ApiError('Classroom not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: 'successfully deleted'
    });
});

