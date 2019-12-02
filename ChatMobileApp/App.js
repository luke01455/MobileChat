console.ignoredYellowBox = ["Remote debugger"];
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import React from "react";
import AppContainer from "./AppContainer";

const socket = io("http://192.168.0.10:3001");

// calls all action typed aimed the the server with a prefix of server/
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

// creating the reducer, listening for messages
function reducer(state = {}, action) {
  switch(action.type) {
    case "message":
      return { ...state, message: action.data};
    case "users_online":
      return { ...state, usersOnline: action.data};
    default:
      return state;
  }
}

// defining redux store
const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

// console logs the state when state changes
store.subscribe(() => {
  console.log("new state", store.getState());
});

// dispatching test even to make sure it works
store.dispatch({ type: "server/hello", data: "Hello!" });

export default function App() {
  return (
    <Provider store={store}>
    <AppContainer />
    </Provider>
  );
}
