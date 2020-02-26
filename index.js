// const dotenv = require("dotenv");
// dotenv.config({ path: "./config/config.env" });
const express = require("express");
const app = require("express")();
const server = app.listen(process.env.PORT);
const io = require("socket.io")(server);
const getuser = require("./routes/getuser");
const connectdb = require("./config/db");
const users = require("./routes/user");
const batches = require("./routes/batches");
const schedules = require("./routes/schedule");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const error = require("./middleware/error");
const path = require("path");


app.use(cookieParser());

connectdb();
app.use(express.json());


app.use("/api/getuser", getuser);
app.use("/api/user", auth);
app.use(
  "/api/users",
  (req, res, next) => {
    req.socket = io;
    next();
  },
  users
);
app.use("/api/batches", batches);
app.use("/api/schedules", schedules);

app.use(error);

process.on("unhandledRejection", (err, promise) => {
  console.log(err.message);
  server.close(() => process.exit(1));
});
