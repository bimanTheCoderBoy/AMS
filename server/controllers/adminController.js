const ApiError = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');
const Department = require('../models/Department');
const Level = require('../models/Level');
const Program = require('../models/Program');
const Course = require('../models/Course');
const Semester = require('../models/Semester');
const Subject = require('../models/Subject');
const Classroom = require('../models/Classroom');
const Schedule = require('../models/Schedule');
const Class = require('../models/Class');
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');

const classroomController =require("./admin/classroomController")

exports.createClassroom=classroomController.createClassroom
exports.getAllClassrooms=classroomController.getAllClassrooms
exports.updateClassroom=classroomController.updateClassroom
exports.deleteClassroom=classroomController.deleteClassroom
exports.getClassroom=classroomController.getClassroom

//! department CRUD operations
exports.createDepartment = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ApiError('Name is required', 400)); // 400 Bad Request
    }

    const department = await Department.create({ name });

    res.status(201).json({
        status: 'success',
        data: department
    });
});

exports.getAllDepartments = catchAsync(async (req, res, next) => {
    const departments = await Department.find();

    res.status(200).json({
        status: 'success',
        results: departments.length,
        data: departments
    });
});

exports.updateDepartment = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ApiError('Name is required', 400)); // 400 Bad Request
    }

    const department = await Department.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true, runValidators: true }
    );

    if (!department) {
        return next(new ApiError('Department not found', 404)); // 404 Not Found
    }

    res.status(200).json({
        status: 'success',
        data: department
    });
});


exports.deleteDepartment = catchAsync(async (req, res, next) => {
    const department = await Department.findByIdAndDelete(req.params.id);
    
    if (!department) {
        return next(new ApiError('Department not found', 404));
    }
    
    res.status(200).json({
        status: 'success',
        data: 'successfully deleted'
    });
});


//! Level CRUD operations
exports.createLevel = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ApiError('Name is required', 400)); // 400 Bad Request
    }
    
    const level = await Level.create({ name });
    
    res.status(201).json({
        status: 'success',
        data: level
    });
});

exports.getAllLevels = catchAsync(async (req, res, next) => {
    const levels = await Level.find();

    res.status(200).json({
        status: 'success',
        results: levels.length,
        data: levels
    });
});

exports.updateLevel = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ApiError('Name is required', 400));
    }

    const level = await Level.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true, runValidators: true }
    );

    if (!level) {
        return next(new ApiError('Level not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: level
    });
});


exports.deleteLevel = catchAsync(async (req, res, next) => {
    const level = await Level.findByIdAndDelete(req.params.id);
    
    if (!level) {
        return next(new ApiError('Level not found', 404));
    }
    
    res.status(200).json({
        status: 'success',
        data: 'successfully deleted'
    });
});


//! Program CRUD operations
exports.createProgram = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ApiError('Name is required', 400)); // 400 Bad Request
    }
    
    const program = await Program.create({ name });
    
    res.status(201).json({
        status: 'success',
        data: program
    });
});

exports.getAllPrograms = catchAsync(async (req, res, next) => {
    const programs = await Program.find();

    res.status(200).json({
        status: 'success',
        results: programs.length,
        data: programs
    });
});

exports.updateProgram = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ApiError('Name is required', 400));
    }

    const program = await Program.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true, runValidators: true }
    );

    if (!program) {
        return next(new ApiError('Program not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: program
    });
});


exports.deleteProgram = catchAsync(async (req, res, next) => {
    const program = await Program.findByIdAndDelete(req.params.id);
    
    if (!program) {
        return next(new ApiError('Program not found', 404));
    }
    
    res.status(200).json({
        status: 'success',
        data: 'successfully deleted'
    });
});


//! Course CRUD operations
exports.createCourse = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ApiError('Name is required', 400)); // 400 Bad Request
    }
    
    const course = await Course.create({ name });

    res.status(201).json({
        status: 'success',
        data: course
    });
});

exports.getAllCourses = catchAsync(async (req, res, next) => {
    const courses = await Course.find();

    res.status(200).json({
        status: 'success',
        results: courses.length,
        data: courses
    });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ApiError('Name is required', 400));
    }

    const course = await Course.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true, runValidators: true }
    );

    if (!course) {
        return next(new ApiError('Course not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: course
    });
});


exports.deleteCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
        return next(new ApiError('Course not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: 'successfully deleted'
    });
});


//! Semester CRUD operations
exports.createSemester = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ApiError('Name is required', 400)); // 400 Bad Request
    }

    const semester = await Semester.create({ name });

    res.status(201).json({
        status: 'success',
        data: semester
    });
});

exports.getAllSemesters = catchAsync(async (req, res, next) => {
    const semesters = await Semester.find();

    res.status(200).json({
        status: 'success',
        results: semesters.length,
        data: semesters
    });
});

exports.updateSemester = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ApiError('Name is required', 400));
    }

    const semester = await Semester.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true, runValidators: true }
    );

    if (!semester) {
        return next(new ApiError('Semester not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: semester
    });
});


exports.deleteSemester = catchAsync(async (req, res, next) => {
    const semester = await Semester.findByIdAndDelete(req.params.id);

    if (!semester) {
        return next(new ApiError('Semester not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: 'successfully deleted'
    });
});


//! Subject CRUD operations
exports.createSubject = catchAsync(async (req, res, next) => {
    const { name, code } = req.body;

    if (!name || !code) {
        return next(new ApiError('Both name and code are required', 400));
    }

    const subject = await Subject.create({ name, code});
    
    res.status(201).json({
        status: 'success',
        data: subject
    });
});

exports.getAllSubjects = catchAsync(async (req, res, next) => {
    const subjects = await Subject.find();

    res.status(200).json({
        status: 'success',
        results: subjects.length,
        data: subjects
    });
});

exports.updateSubject = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return next(new ApiError('Name is required', 400));
    }

    const subject = await Subject.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true, runValidators: true }
    );

    if (!subject) {
        return next(new ApiError('Subject not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: subject
    });
});

exports.deleteSubject = catchAsync(async (req, res, next) => {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
        return next(new ApiError('Subject not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: 'successfully deleted'
    });
});


//! Class CRUD operations
exports.getAllClasses = catchAsync(async (req, res, next) => {
    const classes = await Class.find()
        .populate({
            path: 'classroom_id',
            populate: [
                { path: 'dept_id' },
                { path: 'level_id' },
                { path: 'program_id' },
                { path: 'course_id' },
                { path: 'semester_id' }
            ]
        })
        .populate('subject_id');  // Populate full subject details

    res.status(200).json({
        status: 'success',
        results: classes.length,
        data: classes
    });
});

exports.getClass = catchAsync(async (req, res, next) => {
    const classData = await Class.findById(req.params.id)
        .populate({
            path: 'classroom_id',
            populate: [
                { path: 'dept_id' },
                { path: 'level_id' },
                { path: 'program_id' },
                { path: 'course_id' },
                { path: 'semester_id' }
            ]
        })
        .populate('subject_id');  

    if (!classData) {
        return next(new ApiError('Class not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: classData
    });
});
exports.getClassesByClassroom=catchAsync(async(req,res,next)=>{
    

    let classes = await Class.find({classroom_id:req.params.id}).populate('subject_id');
    if(!classes){
        return next(new ApiError('Class not found', 404));
    }
    classes=classes.map((ele)=>{
        return {
            _id:ele._id,
            classroom_id:ele.classroom_id,
            subject:{
                _id:ele.subject_id._id,
                name:ele.subject_id.name,
                code:ele.subject_id.code
            }
        }
    })
    res.status(200).json({
        status:'success',
        results:classes.length,
        data:classes
        });
})
exports.createClass = catchAsync(async (req, res, next) => {
    const { classroom_id, subject_id } = req.body;

    if (!classroom_id || !subject_id) {
        return next(new ApiError("Both classroom_id and subject_id are required", 400));
    }

    const [classroomExists, subjectExists] = await Promise.all([
        Classroom.findById(classroom_id),
        Subject.findById(subject_id)
    ]);

    if (!classroomExists) {
        return next(new ApiError("Invalid classroom_id: Classroom not found", 400));
    }
    if (!subjectExists) {
        return next(new ApiError("Invalid subject_id: Subject not found", 400));
    }

    const classData = await Class.create({ classroom_id, subject_id });

    res.status(201).json({
        status: 'success',
        data: classData
    });
});
 
exports.updateClass = catchAsync(async (req, res, next) => {
    const { classroom_id, subject_id } = req.body;

    const classData = await Class.findByIdAndUpdate(
        req.params.id,
        { classroom_id, subject_id },
        { new: true, runValidators: true }
    );

    if (!classData) {
        return next(new ApiError('Class not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: classData
    });
});
 
exports.deleteClass = catchAsync(async (req, res, next) => {
    const classData = await Class.findByIdAndDelete(req.params.id);

    if (!classData) {
        return next(new ApiError('Class not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: 'successfully deleted'
    });
});


//! Schedule CRUD operations
exports.getAllSchedules = catchAsync(async (req, res, next) => {
    const schedules = await Schedule.find()
        .populate({
            path: 'class_id',
            populate: [
                { path: 'classroom_id', populate: [
                    { path: 'dept_id' },
                    { path: 'level_id' },
                    { path: 'program_id' },
                    { path: 'course_id' },
                    { path: 'semester_id' }
                ]},
                { path: 'subject_id' }
            ]
        })
        .populate('teacher_id'); // Populate full teacher details

    res.status(200).json({
        status: 'success',
        results: schedules.length,
        data: schedules
    });
});


exports.getSchedule = catchAsync(async (req, res, next) => {
    const schedule = await Schedule.findById(req.params.id)
        .populate({
            path: 'class_id',
            populate: [
                { path: 'classroom_id', populate: [
                    { path: 'dept_id' },
                    { path: 'level_id' },
                    { path: 'program_id' },
                    { path: 'course_id' },
                    { path: 'semester_id' }
                ]},
                { path: 'subject_id' }
            ]
        })
        .populate('teacher_id'); // Populate full teacher details

    if (!schedule) {
        return next(new ApiError('Schedule not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: schedule
    });
});

exports.createSchedule = catchAsync(async (req, res, next) => {
    const { class_id, day, start_time, end_time, teacher_id } = req.body;

    // 1. Basic validation
    if (!class_id || !day || !start_time || !end_time || !teacher_id) {
        return next(new ApiError("All fields are required: class_id, day, start_time, end_time, teacher_id", 400));
    }

    // 2. Validate time format and order
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeFormat.test(start_time) || !timeFormat.test(end_time)) {
        return next(new ApiError("Time must be in HH:mm format", 400));
    }

    if (start_time >= end_time) {
        return next(new ApiError("End time must be after start time", 400));
    }

    // 3. Check existence of references
    const [classExists, teacherExists] = await Promise.all([
        Class.findById(class_id),
        Teacher.findById(teacher_id)
    ]);

    if (!classExists) return next(new ApiError("Class not found", 404));
    if (!teacherExists) return next(new ApiError("Teacher not found", 404));

    // 4. Get classroom ID from class
    const classroomId = classExists.classroom_id;

    // 5. Check classroom availability
    const classesInClassroom = await Class.find({ classroom_id: classroomId });
    const classIds = classesInClassroom.map(c => c._id);

    const classroomConflicts = await Schedule.find({
        class_id: { $in: classIds },
        day: day,
        $or: [
            { 
                start_time: { $lt: end_time },
                end_time: { $gt: start_time }
            }
        ]
    });

    if (classroomConflicts.length > 0) {
        return next(new ApiError("Classroom is already booked during this time slot", 409));
    }

    // 6. Check teacher availability
    const teacherConflicts = await Schedule.find({
        teacher_id: teacher_id,
        day: day,
        $or: [
            { 
                start_time: { $lt: end_time },
                end_time: { $gt: start_time }
            }
        ]
    });

    if (teacherConflicts.length > 0) {
        return next(new ApiError("Teacher has a conflicting schedule", 409));
    }

    // 7. Create schedule if no conflicts
    const schedule = await Schedule.create({ 
        class_id, 
        day, 
        start_time, 
        end_time, 
        teacher_id 
    });

    res.status(201).json({
        status: 'success',
        data: schedule
    });
});

exports.updateSchedule = catchAsync(async (req, res, next) => {
    const { class_id, day, start_time, end_time, teacher_id } = req.body;

    const schedule = await Schedule.findByIdAndUpdate(
        req.params.id,
        { class_id, day, start_time, end_time, teacher_id },
        { new: true, runValidators: true }
    );

    if (!schedule) {
        return next(new ApiError('Schedule not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: schedule
    });
});

exports.deleteSchedule = catchAsync(async (req, res, next) => {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!schedule) {
        return next(new ApiError('Schedule not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: 'successfully deleted'
    });
});


//! Admin CRUD operations 
exports.getAllAdmins = catchAsync(async (req, res, next) => {
    const admins = await Admin.find();

    res.status(200).json({
        status: 'success',
        results: admins.length,
        data: admins
    });
});
 
exports.getAdmin = catchAsync(async (req, res, next) => {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
        return next(new ApiError('Admin not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: admin
    });
});
 
exports.createAdmin = catchAsync(async (req, res, next) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return next(new ApiError("Both name and email are required", 400));
    }

    const admin = await Admin.create({ name, email });

    res.status(201).json({
        status: 'success',
        data: admin
    });
});
 
exports.updateAdmin = catchAsync(async (req, res, next) => {
    const { name, email } = req.body;

    const admin = await Admin.findByIdAndUpdate(
        req.params.id,
        { name, email },
        { new: true, runValidators: true }
    );

    if (!admin) {
        return next(new ApiError('Admin not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: admin
    });
});
 
exports.deleteAdmin = catchAsync(async (req, res, next) => {
    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
        return next(new ApiError('Admin not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: 'successfully deleted'
    });
});

