import axios from "axios";
import { POST_API_END_POINT } from "../utils/constant";

const createPost = async (data) => {
	try {
		const response = await axios.post(
			`${POST_API_END_POINT}/create`,
			{ description: data?.description, id: data?.id },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		return response.data.posts;
	} catch (error) {
		console.error("Error in creating post :", error);
		throw error;
	}
};
const getUserPosts = async () => {
	try {
		const response = await axios.get(`${POST_API_END_POINT}/posts`, {
			withCredentials: true,
		});
		return response.data.posts;
	} catch (error) {
		console.error("Error in getting user posts :", error);
		throw error;
	}
};
const deleteUserPost = async (id) => {
	try {
		const response = await axios.delete(
			`${POST_API_END_POINT}/delete/${id}`,
			{
				withCredentials: true,
			}
		);
		return response.data.posts;
	} catch (error) {
		console.error("Error in deleting user post :", error);
		throw error;
	}
};
const postLike = async (data) => {
	try {
		const response = await axios.put(
			`${POST_API_END_POINT}/like/${data?.id}`,
			{ id: data?.userId },
			{
				withCredentials: true,
			}
		);
		return response.data.posts;
	} catch (error) {
		console.error("Error in liking user post :", error);
		throw error;
	}
};

const postService = {
	createPost,
	getUserPosts,
	deleteUserPost,
	postLike,
};
export default postService;
