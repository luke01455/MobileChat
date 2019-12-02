import React, { useEffect, useState, useRef } from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import io from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";

import JoinScreen from "./JoinScreen";

export default function HomeScreen() {
  // useState to set the state of the message which will be received and shown on screen
  const [recvMessages, setRecvMessages] = useState([]);
  // useRef to avoid scoping issues with useEffect
  const socket = useRef(null);
  // setting a state to see if user has joined or not
  const [hasJoined, setHasJoined] = useState(false);

  // useEffect to listen to backend, send a message to backend and set the messages which have already been sent - which update on reload component
  useEffect(() => {
    socket.current = io("http://192.168.0.10:3001");
    socket.current.on("messageObject", message => {
      // on component load, sets the messages to the current state, plus the message if it exists
      setRecvMessages(prevState => GiftedChat.append(prevState, message));
    });
  }, []);

  // function which sends the message to send to the backend, then clears out the text view box
  const sendMessage = messages => {
    console.log(messages);
    socket.current.emit("messageText", messages[0].text);
    // on submit, sets the messages to the current state
    setRecvMessages(prevState => GiftedChat.append(prevState, messages));
  };

  const joinChat = username => {
    socket.current.emit("join", username);
    console.log(username)
    setHasJoined(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* if user has joined display chat, else display join screen component */}
      {hasJoined ? (
           // Gifted chat bootstrap UI message view */
        (
          <GiftedChat
            renderUsernameOnMessage
            // shows the recvMessages state array as the messages
            messages={recvMessages}
            // sends a preditermined array from the repo which also contains the text from the chatbox
            onSend={messages => sendMessage(messages)}
            // this is left as 1 so on the front end this will look like the messages from themself should be blue
            user={{
              _id: 1
            }}
          />
        )
      ) : (
        <JoinScreen joinChat={joinChat} />
      )}
      {/* Code which makes the app pad around the keyboard when user needs to type something */}
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
