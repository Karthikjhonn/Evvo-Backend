require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const Routes = require("./routes/routes");
const { errorHandler } = require("./middleware/ErrorHandler");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

connectDB();
app.use(
  cors({
    origin: ["https://evvotech.netlify.app","http://localhost:3000/"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Evvo Backend Server is running...");
});

app.use("/api/v1/", Routes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
