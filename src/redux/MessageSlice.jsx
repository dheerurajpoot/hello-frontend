import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MessageService from "./MessageService";

const initialState = {
	messages: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const sendMessages = createAsyncThunk(
	"chat/send-message",
	async (data, thunkAPI) => {
		try {
			return await MessageService.sendMessages(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const getMessages = createAsyncThunk(
	"chat/get-message",
	async (id, thunkAPI) => {
		try {
			return await MessageService.getMessages(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const messageSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(sendMessages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(sendMessages.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.sendedMsg = action.payload;
				state.message = "Success";
			})
			.addCase(sendMessages.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(getMessages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMessages.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.messages = action.payload;
				state.message = "Success";
			})
			.addCase(getMessages.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			});
	},
});

export default messageSlice.reducer;
