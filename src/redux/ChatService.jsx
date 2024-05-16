import axios from "axios";
import { CHAT_API_END_POINT } from "../utils/constant";

const createChat = async (data) => {
	try {
		const response = await axios.post(
			`${CHAT_API_END_POINT}/`,
			{ senderId: data?.senderId, receiverId: data?.receiverId },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error in creating chat :", error);
		throw error;
	}
};
const getChat = async (id) => {
	try {
		const response = await axios.get(`${CHAT_API_END_POINT}/${id}`, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error("Error in getting chat :", error);
		throw error;
	}
};

const ChatService = {
	createChat,
	getChat,
};
export default ChatService;
