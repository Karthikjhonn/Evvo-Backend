require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Evvo Backend Server is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
