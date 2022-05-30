import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../feature/postSlice";
import commentReducer from "../feature/commentSlice";
import userReducer from "../feature/userSlice";

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableInvariant: false,
    }),
  reducer: {
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});
