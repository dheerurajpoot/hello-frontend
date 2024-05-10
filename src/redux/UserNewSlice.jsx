import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userService from "./UserService";

const getCustomerFromLocalStorage = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user"))
	: null;

const initialState = {
	user: getCustomerFromLocalStorage,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const registerUser = createAsyncThunk(
	"auth/user-register",
	async (userData, thunkAPI) => {
		try {
			return await userService.registerUser(userData);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const loginUser = createAsyncThunk(
	"auth/user-login",
	async (userData, thunkAPI) => {
		try {
			return await userService.loginUser(userData);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const getSuggestedUser = createAsyncThunk(
	"auth/suggestedUser",
	async (id, thunkAPI) => {
		try {
			return await userService.getSuggestedUser(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const getUserProfile = createAsyncThunk(
	"auth/profile",
	async (id, thunkAPI) => {
		try {
			return await userService.getUserProfile(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const userSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.registedUser = action.payload;
				state.message = "Success";
				if (state.isSuccess === true) {
					toast.success("Account Created Succuessfully");
				}
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError === true) {
					toast.error(action.error);
				}
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.user = action.payload;
				state.message = "Success";
				if (state.isSuccess === true) {
					toast.success("Logged in Succuessfully");
				}
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError === true) {
					toast.error(action?.payload?.response?.data?.message);
				}
			})
			.addCase(getSuggestedUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSuggestedUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.suggestedUser = action.payload;
				state.message = "Success";
			})
			.addCase(getSuggestedUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(getUserProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.profile = action.payload;
				state.message = "Success";
			})
			.addCase(getUserProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			});
	},
});

export default userSlice.reducer;
