const userModel = require("../../model/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const leaveBalance = require("../../model/leavBalanceModal");
const LeaveHistory = require("../../model/leaveHistoryModel");

const createUser = async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: user._id, email: email }, JWT_SECRET, {
      expiresIn: "1d",
    });
    const userLeaveBalance = await leaveBalance.create({
      userId: user._id,
    });
    res.status(200).json({
      message: "User created successfully",
      userLeaveBalance,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "User  already exists";
      err.status = 400;
    }
    next(err);
  }
};
const loginUser = async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const getUserDetails = await userModel.findOne({ email });
    if (!getUserDetails) {
      const error = new Error("User not found!");
      error.status = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      getUserDetails.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { userId: getUserDetails._id, email: getUserDetails.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful.",
      user: {
        id: getUserDetails._id,
        name: getUserDetails.name,
        email: getUserDetails.email,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    console.log(req?.user?.userId);
    const userId  = req?.user?.userId;

    const user = await userModel.findById(userId);
    const userLeaveHistory = await LeaveHistory.find({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const userLeaveBalance = await leaveBalance.findOne({ userId });
    if (!leaveBalance) {
      return res
        .status(404)
        .json({ message: "Leave balance not found for this user." });
    }

    res.status(200).json({
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        leaveStatus: {
          sickLeave: userLeaveBalance.sickLeave,
          casualLeave: userLeaveBalance.casualLeave,
          earnedLeave: userLeaveBalance.earnedLeave,
          totalLeave: userLeaveBalance.totalLeave,
        },
        LeaveHistory: userLeaveHistory,
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createUser,
  loginUser,
  getUser,
};
