import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/userSlice";
import postReducer from "../feature/postSlice";
import commentReducer from "../feature/commentSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
  },
});
