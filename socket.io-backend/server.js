const io = require("socket.io")();
const messageHandler = require("./handlers/message-handler")

let currentUserId = 2;
const users = {};

// creating random url for the user
function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100)
  const rand2 = Math.round(Math.random() * 200 + 100)
  return `https://placeimg.com/${rand1}/${rand2}/any`
}

io.on("connection", socket => {
  console.log("a user connected!");
  console.log(socket.id);
  // created a map situation where each new person who uses the app is assigned a userID and a socketID
  users[socket.id] = { userId: currentUserId++ };
  // adds a username to the socket map key which the user can select
  socket.on("join", username => {
    // setting username and avatar variables inside the user object 
    users[socket.id].userName = username;
    users[socket.id].avatar = createUserAvatarUrl();
  });
  // calls the message handler from message-handler.js and passes in the socket and userid
  messageHandler.handleMessage(socket, users);
});

io.listen(3001);