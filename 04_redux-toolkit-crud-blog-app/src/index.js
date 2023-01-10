import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// redux
import store from "./app/store";
import { Provider } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchPostsData } from "./features/posts/postsSlice";
// we wanna users to load right when the app starts
store.dispatch(fetchUsers());
store.dispatch(fetchPostsData());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
