import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

const registerUser = async (userData) => {
	try {
		const response = await axios.post(`${USER_API_END_POINT}/register`, {
			name: userData?.name,
			username: userData?.username,
			email: userData?.email,
			password: userData?.password,
		});
		return response.data;
	} catch (error) {
		console.error("Error in registering user :", error);
		throw error;
	}
};
const loginUser = async (userData) => {
	try {
		const response = await axios.post(
			`${USER_API_END_POINT}/login`,
			{
				email: userData?.email,
				password: userData?.password,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		if (response.data) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	} catch (error) {
		console.error("Error in logging in user :", error);
		throw error;
	}
};
const getSuggestedUser = async (id) => {
	try {
		const response = await axios.get(
			`${USER_API_END_POINT}/suggested/${id}`,
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error in getting suggested users :", error);
		throw error;
	}
};
const getUserProfile = async (id) => {
	try {
		const response = await axios.get(
			`${USER_API_END_POINT}/profile/${id}`,
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error in getting suggested users :", error);
		throw error;
	}
};

const userService = {
	registerUser,
	loginUser,
	getSuggestedUser,
	getUserProfile,
};
export default userService;