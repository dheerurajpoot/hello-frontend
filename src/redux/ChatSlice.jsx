import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ChatService from "./ChatService";

const initialState = {
	chats: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const createChat = createAsyncThunk(
	"chat/create-chat",
	async (data, thunkAPI) => {
		try {
			return await ChatService.createChat(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
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
			.addCase(createChat.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createChat.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.createdChat = action.payload;
				state.message = "Success";
			})
			.addCase(createChat.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(getChat.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getChat.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.chats = action.payload;
				state.message = "Success";
			})
			.addCase(getChat.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			});
	},
});

export default chatSlice.reducer;
