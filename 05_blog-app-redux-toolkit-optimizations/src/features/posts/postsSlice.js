import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// url
const POSTS_URL = "https://blogs-api-bc3y.onrender.com/posts";

// state
const initialState = {
  posts: [],
  post: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  loading: true,
  error: null,
  count: 0,
};
// fetchPosts
export const fetchPostsData = createAsyncThunk("posts/fetchPostsData", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});
// fetchPostsById
export const fetchPostById = createAsyncThunk("posts/fetchPostById", async id => {
  try {
    const response = await axios.get(`${POSTS_URL}/${id}`);
    return response.data;
  } catch (err) {
    return err.message;
  }
});
// addNewPost
export const addNewPost = createAsyncThunk("posts/addNewPost", async (post, thunkAPI) => {
  try {
    const response = await axios.post(POSTS_URL, post);
    return response.data;
  } catch (error) {}
});
// updatePost
export const updatePost = createAsyncThunk("posts/updatePost", async (post, thunkAPI) => {
  const { dispatch } = thunkAPI;
  try {
    const response = await axios.put(`${POSTS_URL}/${post.id}`, post);
    // if (response.status === "200") {
    // }
    dispatch(fetchPostById(post.id));
    useNavigate("/");
    return response.data;
  } catch (err) {
    return err.message;
  }
});
// deletePost
export const deletePost = createAsyncThunk("posts/deletePost", async (id, thunkAPI) => {
  const { dispatch } = thunkAPI;
  try {
    await axios.delete(`${POSTS_URL}/${id}`);
    dispatch(fetchPostsData());
    return id;
  } catch (err) {
    return err.message;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // fetchPosts
    builder.addCase(fetchPostsData.pending, state => {
      state.status = "loading";
    });
    builder.addCase(fetchPostsData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    });
    builder.addCase(fetchPostsData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // getPostById
    builder.addCase(fetchPostById.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.post = action.payload;
    });
    // addNewPost
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      // state.posts.push(action.payload);
    });
    // updatePost
    builder.addCase(updatePost.fulfilled, (state, action) => {});
    // deletePost
    builder.addCase(deletePost.fulfilled, (state, action) => {});
  },
});
// states
export const selectAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;
export const getPostById = state => state.posts.post;
export const getLoadingState = state => state.posts.loading;

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.userId === userId)
);

export const { increaseCount, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
