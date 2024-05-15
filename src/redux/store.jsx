import { configureStore } from "@reduxjs/toolkit";
import UserNewReducer from "./UserNewSlice";
import PostNewReducer from "./PostNewSlice";
import ChatReducer from "./ChatSlice";
import MessageReducer from "./MessageSlice";

export const store = configureStore({
	reducer: {
		auth: UserNewReducer,
		posts: PostNewReducer,
		chats: ChatReducer,
		messages: MessageReducer,
	},
});
