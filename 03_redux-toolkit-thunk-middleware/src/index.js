import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// redux
import store from "./app/store";
import { Provider } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice";
// we wanna users to load right when the app starts
store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
