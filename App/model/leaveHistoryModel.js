const mongoose = require('mongoose');

const leaveHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  leaveType: {
    type: String,
    enum: ['sickLeave', 'casualLeave', 'earnedLeave'],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  leaveDaysCount: { type: Number, required: true },
  comments: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
});

const LeaveHistory = mongoose.model('LeaveHistory', leaveHistorySchema);

module.exports = LeaveHistory;
