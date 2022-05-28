import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
  },
  reducers: {
    setPostsData: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts.push(payload);
      state.posts.sort(
        (a, b) =>
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      );
    },
    deletePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
    editPost: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id == payload[2]) {
          return {
            ...post,
            content: payload[0],
            image: payload[1],
          };
        } else {
          return post;
        }
      });
    },
  },
});

export const { setPostsData, addPost, deletePost, editPost } =
  postSlice.actions;

export default postSlice.reducer;
