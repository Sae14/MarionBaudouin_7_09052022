import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment: null,
  },
  reducers: {
    setCommentsData: (state, { payload }) => {
      state.comment = payload;
    },
    addComment: (state, { payload }) => {
      state.comment.push(payload);
    },
    deleteComment: (state, { payload }) => {
      state.comment = state.comment.filter((comment) => comment.id !== payload);
    },
    editComment: (state, { payload }) => {
      state.comment = state.comment.map((comment) => {
        if (comment.id == payload[1]) {
          return {
            ...comment,
            content: payload[0],
          };
        } else {
          return comment;
        }
      });
    },
  },
});

export const { setCommentsData, addComment, editComment, deleteComment } =
  commentSlice.actions;

export default commentSlice.reducer;
