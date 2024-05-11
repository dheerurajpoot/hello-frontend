import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./PostService";
import { toast } from "react-toastify";

const initialState = {
	posts: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const createPost = createAsyncThunk(
	"user/create-post",
	async (data, thunkAPI) => {
		try {
			return await postService.createPost(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const getUserPosts = createAsyncThunk("user/posts", async (thunkAPI) => {
	try {
		return await postService.getUserPosts();
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const postNewSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.createdPost = action.payload;
				state.message = "Success";
				if (state.isSuccess === true) {
					toast.success("Post Created Succuessfully");
				}
			})
			.addCase(createPost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError === true) {
					toast.error(action.error);
				}
			})
			.addCase(getUserPosts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.posts = action.payload;
				state.message = "Success";
			})
			.addCase(getUserPosts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			});
	},
});

export default postNewSlice.reducer;
