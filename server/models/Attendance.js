const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  verified_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
 
}, {
  timestamps: true
});


module.exports = mongoose.model('Attendance', attendanceSchema);
