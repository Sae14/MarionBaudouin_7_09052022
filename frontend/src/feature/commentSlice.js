import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment: null,
  },
  reducers: {},
});

export const { setCommentData, addComment, editComment, deleteComment } =
  commentSlice.actions;

export default commentSlice.reducer;
