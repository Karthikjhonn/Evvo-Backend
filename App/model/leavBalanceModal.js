const mongoose = require("mongoose");

const leaveBalanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  sickLeave: { type: Number, default: 10 },
  casualLeave: { type: Number, default: 8 },
  earnedLeave: { type: Number, default: 0 },
  totalLeave: { type: Number, default: 18 },
});

const leaveBalance = mongoose.model("LeaveBalance", leaveBalanceSchema);

module.exports = leaveBalance;
