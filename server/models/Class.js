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
    required: true,

  }
}, {
  timestamps: true
});
// ✅ Compound Unique Index (Ensures each classroom can have a subject only once)
classSchema.index({ classroom_id: 1, subject_id: 1 }, { unique: true });
module.exports = mongoose.model('Class', classSchema);
