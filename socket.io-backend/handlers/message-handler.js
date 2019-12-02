// created an incremenenting id for each message sent
let currentMessageId = 1;

// creates the message object
function createMessage(user, messageText) {
    return  {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: user.userId,
      name: user.userName,
      avatar: user.avatar,
    },
  };
}

function handleMessage(socket, users) {
    socket.on("messageText", messageText => {
        // find the userID based on the socketid in the mapkey
        const user = users[socket.id];
        const message = createMessage(user, messageText)
        // send a message to everyone except the socket that is broadcasting
        socket.broadcast.emit("messageObject", message);
        console.log(message)
      });
}

module.exports = { handleMessage };