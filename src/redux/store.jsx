import { configureStore } from "@reduxjs/toolkit";
import UserNewReducer from "./UserNewSlice";
import PostNewReducer from "./PostNewSlice";

export const store = configureStore({
	reducer: {
		auth: UserNewReducer,
		posts: PostNewReducer,
	},
});
