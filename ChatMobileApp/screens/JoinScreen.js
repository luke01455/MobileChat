import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useDispatch } from 'react-redux';

const JoinScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <Text style={{ fontSize: 30, textAlign: "center", color: "blue" }}>
          Chat App
        </Text>
        <TextInput
          onChangeText={text => setUsername(text)}
          value={username}
          style={{ textAlign: "center", fontSize: 18 }}
          placeholder="Enter username"
        />
        <Button title="Join Chat" onPress={() => {
          dispatch({ type: "server/join", data: username })
          navigation.navigate("App");
        }}  />
      </View>
     <KeyboardAvoidingView behavior="padding" />
    </View>
  );
};

export default JoinScreen;
