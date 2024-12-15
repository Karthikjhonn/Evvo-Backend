const express = require("express");
const { leaveRequest,deleteLeaveRequest } = require("../../controller/Leaves/LeaveController");
const isAuth = require("../../middleware/Auth");
const router = express.Router();

router.post('/',isAuth,leaveRequest)
router.delete("/delete",isAuth, deleteLeaveRequest)

module.exports = router;