const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const isAuth = (req, res, next) => {
  console.log(req);
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
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
