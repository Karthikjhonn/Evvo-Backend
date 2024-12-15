const leaveBalanceModel = require("../../model/leavBalanceModal");
const LeaveHistory = require("../../model/leaveHistoryModel");
const leaveRequest = async (req, res, next) => {
  try {
    const {  leaveType, comments, startDate, endDate } = req.body;
    const userId  = req?.user?.userId;
    if(!userId){
      return res.status(400).json({ message: "User not found" });
    }
    if (!leaveType || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end) || start > end) {
      return res.status(400).json({ message: "Invalid start or end date" });
    }
    const leaveDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const validLeaveTypes = ["sickLeave", "casualLeave", "earnedLeave"];
    if (!validLeaveTypes.includes(leaveType)) {
      return res.status(400).json({ message: "Invalid leave type" });
    }

    const leaveBalance = await leaveBalanceModel.findOne({ userId });

    if (!leaveBalance) {
      return res
        .status(404)
        .json({ message: "Leave balance not found for this user" });
    }
    console.log(leaveDays);

    if (leaveBalance[leaveType] < leaveDays) {
      return res.status(400).json({ message: `Insufficient ${leaveType}` });
    }

    const checkPreviousRequest = await LeaveHistory.find({
      userId,
      startDate: { $lte: end },
      endDate: { $gte: start },
      status: "pending",
    });
    console.log(checkPreviousRequest);

    if (checkPreviousRequest.length > 0) {
      return res.status(402).json({
        message: "You already have a leave request for the selected dates",
      });
    }

    leaveBalance[leaveType] -= leaveDays;
    leaveBalance.totalLeave -= leaveDays;
    await leaveBalance.save();
    const leaveHistory = new LeaveHistory({
      userId,
      leaveType,
      startDate,
      endDate,
      leaveDaysCount: leaveDays,
      comments,
      status: "pending",
    });
    await leaveHistory.save();

    res.status(200).json({
      message: "Leave request processed successfully",
      leaveBalance: {
        sickLeave: leaveBalance.sickLeave,
        casualLeave: leaveBalance.casualLeave,
        earnedLeave: leaveBalance.earnedLeave,
        totalLeave: leaveBalance.totalLeave,
      },
      LeaveHistory: [leaveHistory],
    });
  } catch (err) {
    next(err);
  }
};

const deleteLeaveRequest = async (req, res, next) => {
  try {
    const userId  = req?.user?.userId;
    // if(!userId){
    //   return res.status(400).json({ message: "User not found" });
    // }
    const {  requestId } = req.body;
    console.log(userId, requestId);
    if (!userId || !requestId) {
      return res.status(400).json({ message: "User and request id required" });
    }
    const deletedRequest = await LeaveHistory.findOneAndDelete({
      userId,
      _id: requestId,
      status: "pending",
    });
    if (!deletedRequest) {
      return res
        .status(404)
        .json({ message: "No leave request found with the given details" });
    }
    console.log(deletedRequest.leaveType);
    const deletedLeaveType = deletedRequest.leaveType;
    const updateLeaveCount = deletedRequest.leaveDaysCount;
    const updateLeaveRequest = await leaveBalanceModel.findOneAndUpdate(
      { userId },
      {
        $inc: {
          [deletedLeaveType]: updateLeaveCount,
          totalLeave: updateLeaveCount,
        },
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "Request deleted successfully",
      deletedRequest,
      updateLeaveRequest,
    });
  } catch (err) {
    console.error("Error deleting leave request", err);
    next(err);
  }
};

module.exports = {
  leaveRequest,
  deleteLeaveRequest,
};
