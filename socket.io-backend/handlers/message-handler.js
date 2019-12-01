// created an incremenenting id for each message sent
let currentMessageId = 1;

// creates the message object
function createMessage(userId, messageText) {
    return  {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: userId,
      name: 'Test User',
      avatar: 'https://placeimg.com/140/140/any',
    },
  };
}

function handleMessage(socket, userIds) {
    socket.on("message", messageText => {
        // find the userID based on the socketid in the mapkey
        const userId = userIds[socket.id];
        const message = createMessage(userId, messageText)
        // send a message to everyone except the socket that is broadcasting
        socket.broadcast.emit("message", message);
        console.log(message)
      });
}

module.exports = { handleMessage };