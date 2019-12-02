import { createStore, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import React from "react";
import AppContainer from "./AppContainer";

const socket = io("http://192.168.0.10:3001")
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

function reducer(state = {}, action) {
  switch(action.type) {
    case "message":
      return { ...state, message: action.data};
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log("new state", store.getState());
});

store.dispatch({ type: "server/hello", data: "Hello!" });

export default function App() {
  return (
    <AppContainer />
  );
}
