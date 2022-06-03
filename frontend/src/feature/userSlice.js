import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUserData: (state, { payload }) => {
      state.user = payload;
    },

    editUser: (state, { payload }) => {
      state.user = { ...state.user, bio: payload[0], image: payload[1] };
    },
  },
  //
});

export const { setUserData, editUser } = userSlice.actions;
export default userSlice.reducer;
