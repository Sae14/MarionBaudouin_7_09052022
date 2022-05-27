// import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware } from "redux";
// import userReducer from "../feature/userSlice";
import postReducer from "../feature/postSlice";
import commentReducer from "../feature/commentSlice";
// import thunk from "redux-thunk";
// import commentReducer from "../feature/commentSlice";

export default configureStore({
  // middleware: (getDefaultMiddleware) =>
  // middleware: createSerializableStateInvariantMiddleware: false,
  // isPlainObject: false,
  // getDefaultMiddleware({
  //   //   getDefaultMiddleware({
  //   // middleware: [applyMiddleware(thunk), getDefaultMiddleware()],
  //   createSerializableStateInvariantMiddleware: false,
  //   isPlaintObject: false,
  // }),
  //   reducer: {
  //     posts: postReducer,
  //   },
  //   middleware: [applyMiddleware(thunk)],
  // });
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableInvariant: false,
      // plainObject: false,
      //     ignoredActions: ["posts/addPost", "posts/getData"],
      //     ignoredActionPaths: ["meta.arg", "payload.timestamp"],
      //     ignoredPaths: ["posts.posts"],
      //   }),
      //   // Ignore these action types
      //   ignoredActions: ["posts/addPost", "posts/getData"],
      //   // Ignore these field paths in all actions
      //   ignoredActionPaths: ["meta.arg", "payload.timestamp"],
      //   // Ignore these paths in the state
      //   ignoredPaths: ["posts.posts"],
      //   serializableCheck: false,
      // },
    }),
  reducer: {
    // users: userReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});
