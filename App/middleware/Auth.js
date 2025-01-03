const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const isAuth = (req, res, next) => {
  console.log("Cookies",req.cookies);
  console.log("Headers",req.headers);
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization denied!" });
  }
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Session expired" });
    }

    console.log(user);
    req.user = user;

    next();
  });
};

module.exports = isAuth;
