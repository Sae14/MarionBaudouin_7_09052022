import { createSlice } from "@reduxjs/toolkit";

export const likeSlice = createSlice({
  name: "like",
  initialState: {
    like: null,
  },
  reducers: {
    setLikesData: (state, { payload }) => {
      state.like = payload;
    },
    addLike: (state, { payload }) => {
      state.like.push(payload);
    },
    deleteLike: (state, { payload }) => {
      state.like = state.like.filter((like) => like.id !== payload);
    },
  },
});

export const { setLikesData, addLike, deleteLike } = likeSlice.actions;

export default likeSlice.reducer;
