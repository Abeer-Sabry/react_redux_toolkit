import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = {
  users: [],
  userItem: {},
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios(USERS_URL);
  return response.data;
});
export const fetchUsersById = createAsyncThunk("users/fetchUsersById", async id => {
  const response = await axios.get(`${USERS_URL}/${id}`);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchUsersById.fulfilled, (state, action) => {
      state.userItem = action.payload;
    });
  },
});

export const selectAllUsers = state => state.users.users;
export const selectUserById = state => state.users.userItem;

export default usersSlice.reducer;
