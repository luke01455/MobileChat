import React from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Header } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';

// access the prop passed down from navigation and set it as title
ChatScreen.navigationOptions = screenProps => ({
  title : screenProps.navigation.getParam("name")
});

export default function ChatScreen({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      {/* Gifted chat bootstrap UI message view  */}
      <GiftedChat
        renderUsernameOnMessage
        // shows the recvMessages state array as the messages
        messages={[]}
        // sends a preditermined array from the repo which also contains the text from the chatbox
        onSend={messages =>
          dispatch({
            type: "server/private-message",
            data: { text: messages[0].text, to: navigation.getParam("userId") }
          })
        }
        // this is left as 1 so on the front end this will look like the messages from themself should be blue
        user={{
          _id: 1
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
