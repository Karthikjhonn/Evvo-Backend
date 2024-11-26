const express = require("express");
const { leaveRequest,deleteLeaveRequest } = require("../../controller/Leaves/LeaveController");
const router = express.Router();

router.post('/',leaveRequest)
router.delete("/delete",deleteLeaveRequest)

module.exports = router;