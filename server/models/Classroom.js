const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  dept_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  level_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
    required: true
  },
  program_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  semester_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Semester',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Classroom', classroomSchema);
