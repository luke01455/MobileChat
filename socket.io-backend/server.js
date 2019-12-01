const io = require("socket.io")();
const messageHandler = require("./handlers/message-handler")

let currentUserId = 2;
const userIds = {};

io.on("connection", socket => {
  console.log("a user connected!");
  console.log(socket.id);
  // created a map situation where each new person who uses the app is assigned a userID and a socketID
  userIds[socket.id] = currentUserId++;
  // calls the message handler from message-handler.js and passes in the socket and userid
  messageHandler.handleMessage(socket, userIds)
});

io.listen(3001);