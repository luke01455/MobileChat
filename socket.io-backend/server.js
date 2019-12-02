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

    // calls the message handler from message-handler.js and passes in the socket and userid
    messageHandler.handleMessage(socket, users);
  });
  socket.on("action", action => {
    // listens for different socket.io action types and does something based on the action type
    switch (action.type) {
      case "server/hello":
        console.log("Got hello event", action.data);
        socket.emit("action", { type: "message", data: "Good day!" });
        break;
      case "server/join":
        console.log("Got join event", action.data);
        // setting username and avatar variables inside the user object 
        users[socket.id].userName = action.data; // action.data = username in this case
        users[socket.id].avatar = createUserAvatarUrl();
        break;
    }
  });
});

io.listen(3001);