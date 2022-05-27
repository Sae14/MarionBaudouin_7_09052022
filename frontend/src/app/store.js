import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "../feature/userSlice";
import postReducer from "../feature/postSlice";
// import commentReducer from "../feature/commentSlice";

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["posts/addPost"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["posts.posts"],
      },
    }),
  reducer: {
    // users: userReducer,
    posts: postReducer,
    // comments: commentReducer,
  },
});
