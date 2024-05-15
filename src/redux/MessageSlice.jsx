import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import MessageService from "./MessageService";

const initialState = {
	messages: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

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
