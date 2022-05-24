import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
  },
  reducers: {},
});

export const { setPostData, addPost, editPost, deletePost } = postSlice.actions;

export default postSlice.reducer;
