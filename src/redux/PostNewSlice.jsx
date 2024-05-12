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
export const deleteUserPost = createAsyncThunk(
	"user/deletedPost",
	async (id, thunkAPI) => {
		try {
			return await postService.deleteUserPost(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const postLike = createAsyncThunk(
	"user/likedPost",
	async (data, thunkAPI) => {
		try {
			return await postService.postLike(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

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
					toast.success("Post Created Successfully");
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
			})
			.addCase(deleteUserPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUserPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.deletedPost = action.payload;
				state.message = "Success";
				if (state.isSuccess === true) {
					toast.success("Post Deleted Successfully");
				}
			})
			.addCase(deleteUserPost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError === true) {
					toast.error(action.error);
				}
			})
			.addCase(postLike.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(postLike.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.deletedPost = action.payload;
				state.message = "Success";
			})
			.addCase(postLike.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			});
	},
});

export default postNewSlice.reducer;
