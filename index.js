const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const db = require("./config/db.config");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
db.connectDB();
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/auth", require("./routes/authRoutes"));

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`Server is not running on port: ${port}`);
});
