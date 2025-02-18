const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  classroom_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Class', classSchema);
