import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import ChatService from "./ChatService";

const initialState = {
	chats: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const getChat = createAsyncThunk(
	"chat/get-chat",
	async (id, thunkAPI) => {
		try {
			return await ChatService.getChat(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const chatSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getChat.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getChat.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.chats = action.payload;
				state.message = "Success";
				// if (state.isSuccess === true) {
				// 	toast.success("Account Created Successfully");
				// }
			})
			.addCase(getChat.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				// if (state.isError === true) {
				// 	toast.error(action.error);
				// }
			});
	},
});

export default chatSlice.reducer;
