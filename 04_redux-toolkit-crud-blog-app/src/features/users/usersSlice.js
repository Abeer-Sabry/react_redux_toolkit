import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = {
  users: [],
  status: "idle", //'idle'|| 'loading'||'succeeded'||'failed'
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios(USERS_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, state => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectAllUsers = state => state.users.users;
export const getUsersStatus = state => state.users.status;
export const getUsersError = state => state.users.error;

export default usersSlice.reducer;
