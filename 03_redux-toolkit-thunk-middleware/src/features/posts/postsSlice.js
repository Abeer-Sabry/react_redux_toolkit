import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
// url
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
// state
const initialState = {
  posts: [],
  status: "idle", //'idle'|| 'loading'||'succeeded'||'failed'
  error: null,
};
// fetchPosts
export const fetchPostsData = createAsyncThunk("posts/fetchPostsData", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (err) {
    return err.message;
  }
});
// addNewPost
export const addNewPost = createAsyncThunk("posts/addNewPost", async post => {
  try {
    const response = await axios.post(POSTS_URL, post);

    return response.data;
  } catch (err) {
    return err.message;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    // fetchPosts
    builder.addCase(fetchPostsData.pending, state => {
      state.status = "loading";
    });
    builder.addCase(fetchPostsData.fulfilled, (state, action) => {
      state.status = "succeeded";
      let minute = 1;
      const loadedPosts = action.payload.map(post => {
        post.date = sub(new Date(), { minutes: minute++ }).toISOString();
        post.reaction = post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        return post;
      });
      state.posts = state.posts.concat(loadedPosts);
    });
    builder.addCase(fetchPostsData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // addNewPost
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      // fix-api
      // const sortedPosts = state.posts.sort((a, b) => {
      //   if (a.id > b.id) return 1;
      //   if (a.id < b.id) return -1;
      //   return 0;
      // });
      // action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
      // End-fix-api

      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      };
      state.posts.unshift(action.payload);
      // state.posts.push(action.payload);
    });
  },
});

export const { postAdded, reactionAdded } = postsSlice.actions;

export const selectAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;

export default postsSlice.reducer;
