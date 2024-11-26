const express = require("express");
const router = express.Router();
const userRoutes = require("./usersRoutes/UsersRoute");
const LeaveRoutes = require("./LeaveRoutes/LeaveRoutes");
router.use("/user", userRoutes);
router.use("/leaveRequest", LeaveRoutes);
module.exports = router;
