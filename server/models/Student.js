const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  phone: {
    type: String,
    required: true
  },
  classroom_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
    index: true
  },

  promote_flag: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
