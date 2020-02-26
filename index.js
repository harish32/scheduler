const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const app = require("express")();
const server = app.listen(process.env.PORT);
const io = require("socket.io")(server);
const getuser = require("./routes/getuser");
const connectdb = require("./config/db");
const users = require("./routes/user");
const batches = require("./routes/batches");
const schedules = require("./routes/schedule");
// const cors = require("cors");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const error = require("./middleware/error");
// const User = require("./models/user");

app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true
//   })
// );
connectdb();
app.use(express.json());

// app.post("/", async (req, res) => {
//   await User.create(req.body);
//   res.json(true);
// });
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

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// const PORT = process.env.PORT || 5500;
// const server = app.listen(PORT, console.log(`server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(err.message);
  server.close(() => process.exit(1));
});
