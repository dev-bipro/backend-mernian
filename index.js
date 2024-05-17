require("./db/dbConfig");
const express = require("express");
const cors = require("cors");
const route = require("./routers");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const User = require("./models/userModel");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
    credentials: true,
  },
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/", route);

// const onlineUsers = {};
// io.on("connection", function (socket) {
//   console.log(socket.id);
//   socket.on("online", async function (data) {
//     onlineUsers[socket.id] = data.userId;
//     await User.findOneAndUpdate(
//       {
//         _id: data.userId,
//       },
//       { isActive: true },
//       { upsert: true }
//     );
//   });

//   socket.on("disconnect", async function () {
//     const oflineUserId = onlineUsers[socket.id];
//     await User.findOneAndUpdate(
//       {
//         _id: oflineUserId,
//       },
//       { isActive: false },
//       { upsert: true }
//     );
//   });
// });

const port = process.env.PORT || 3000;
server.listen(port, () => console.log("ami port"));
