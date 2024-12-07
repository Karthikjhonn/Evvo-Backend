require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const Routes = require("./routes/routes");
const { errorHandler } = require("./middleware/ErrorHandler");
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Evvo Backend Server is running...");
});

app.use("/api/v1/",Routes)
app.use(errorHandler);
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
