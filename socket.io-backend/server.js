const io = require("socket.io")();
const uuidv1 = require("uuid/v1");
const messageHandler = require("./handlers/message-handler");

const users = {};

// creating random url for the user
function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100)
  const rand2 = Math.round(Math.random() * 200 + 100)
  return `https://placeimg.com/${rand1}/${rand2}/any`
}

function createUsersOnline() {
  // get all the user information for friends list
  const values = Object.values(users);
  const onlyWithUsernames = values.filter(u => u.userName !== undefined);
  return onlyWithUsernames;
}


// io emit emits to all sockets connected, socket emit only emits the user socket
io.on("connection", socket => {
  console.log("a user connected!");
  console.log(socket.id);
  // created a map situation where each new person who uses the app is assigned a uuid and a socketID
  users[socket.id] = { userId: uuidv1() };

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("action", { type: "users_online", data: createUsersOnline()})
  })
  socket.on("action", action => {
    // listens for different socket.io action types and does something based on the action type
    switch (action.type) {
      case "server/join":
        console.log("Got join event", action.data);
        // setting username and avatar variables inside the user object 
        users[socket.id].userName = action.data; // action.data = username in this case
        users[socket.id].avatar = createUserAvatarUrl();
        // emit new action containing the user data
        io.emit("action", { type: "users_online", data: createUsersOnline()});
        // makes a redux state which carries the data of the socket id of the current client
        socket.emit("action", { type: "self_user", data: users[socket.id] });
        break;
      case "server/private-message":
        console.log("Got priv message", action.data);
        break;
    }
  });
});

io.listen(3001);