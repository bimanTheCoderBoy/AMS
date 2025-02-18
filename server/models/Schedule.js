const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
    index: true
  },

  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  start_time: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value < this.end_time;
      },
      message: 'Start time must be before end time'
    }
  },
  end_time: {
    type: Date,
    required: true
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
    index: true
  },


 
}, {
  timestamps: true
});


module.exports = mongoose.model('Schedule', scheduleSchema);
