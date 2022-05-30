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

      //   state.user.map((userr) => {
      // if (user) {
      //   return
      //     {
      //       bio: payload[0],
      //       image: payload[1],
      //     };
      // },
      //   });
      //   state.user.push(payload);
      //   state.user = return
      //    {
      //     ...user,
      //     bio: payload[0],
      //     image: payload[1],
      //   }
    },
  },
  //
});

export const { setUserData, editUser } = userSlice.actions;
// addUser, deleteUser, edituser
export default userSlice.reducer;
