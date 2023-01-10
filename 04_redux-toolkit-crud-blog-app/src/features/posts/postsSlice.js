import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
// url
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
// state
const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
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
// addNewPost
export const addNewPost = createAsyncThunk("posts/addNewPost", async initialPost => {
  const response = await axios.post(POSTS_URL, initialPost);
  return response.data;
});
// updatePost
export const updatePost = createAsyncThunk("posts/updatePost", async initialPost => {
  const { id } = initialPost;
  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
    return response.data;
  } catch (err) {
    // return err.message;
    return initialPost;
  }
});
// deletePost
export const deletePost = createAsyncThunk("posts/deletePost", async initialPost => {
  const { id } = initialPost;
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
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
      prepare(title, content, userId) {
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
    reactionAdded(state, action) {
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
      // Adding date and reactions
      let min = 1;
      const loadedPosts = action.payload.map(post => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        return post;
      });

      // Add any fetched posts to the array
      state.posts = loadedPosts;
      // console.log("concat", (state.posts = state.posts.concat(loadedPosts)));
    });
    builder.addCase(fetchPostsData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // addNewPost
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      const sortedPosts = state.posts.sort((a, b) => {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
      // console.log("sorted", sortedPosts);
      action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;

      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };
      // state.posts.unshift(action.payload);
      console.log("addPayload", action.payload);
      state.posts.push(action.payload);
    });
    // updatePost
    builder.addCase(updatePost.fulfilled, (state, action) => {
      if (!action.payload?.id) {
        console.log("Update could not complete");
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      action.payload.date = new Date().toISOString();
      const posts = state.posts.filter(post => post.id !== id);
      state.posts = [...posts, action.payload];
      console.log("updatePost", action.payload);
    });
    // deletePost
    builder.addCase(deletePost.fulfilled, (state, action) => {
      if (!action.payload.id) {
        console.log("couldn't delete this post");
        return;
      }
      const { id } = action.payload;
      const posts = state.posts.filter(post => post.id !== id);
      state.posts = posts;
    });
  },
});

export const { postAdded, reactionAdded } = postsSlice.actions;

export const selectAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;
export const getPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

export default postsSlice.reducer;
