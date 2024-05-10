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
const getUserPosts = async (id) => {
	try {
		const response = await axios.get(
			`${POST_API_END_POINT}/allposts/${id}`,
			{
				withCredentials: true,
			}
		);
		return response.data.posts;
	} catch (error) {
		console.error("Error in getting user posts :", error);
		throw error;
	}
};

const postService = {
	createPost,
	getUserPosts,
};
export default postService;
