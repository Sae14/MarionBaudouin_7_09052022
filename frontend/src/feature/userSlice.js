import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {},
});

export const { setUserData, addUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
