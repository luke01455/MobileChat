import React from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Header } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';

// access the prop passed down from navigation and set it as title
ChatScreen.navigationOptions = screenProps => ({
  title : screenProps.navigation.getParam("name")
});

export default function ChatScreen({ navigation }) {
  const dispatch = useDispatch();
  const selfUser = useSelector(state => state.selfUser);
  const userId = navigation.getParam("userId");
  const messages = conversations[userId].messages
;
  const conversations = useSelector(state => state.conversations);

  return (
    <View style={{ flex: 1 }}>
      {/* Gifted chat bootstrap UI message view  */}
      <GiftedChat
        renderUsernameOnMessage
        // shows the recvMessages state array as the messages
        messages={messages}
        // sends a preditermined array from the repo which also contains the text from the chatbox
        onSend={messages =>
        // dispatch that we have sent a private message, with the message and the conversation id
          dispatch({
            type: "private_message",
            data: { message: messages[0], conversationId: userId }
          })
        }
        // this is left as 1 so on the front end this will look like the messages from themself should be blue
        user={{
          _id: selfUser.userId
        }}
      />

      {/* Code which makes the app pad around the keyboard when user needs to type something */}
      {Platform.OS === "android" && (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Header.HEIGHT + 20}
        />
      )}
    </View>
  );
}
