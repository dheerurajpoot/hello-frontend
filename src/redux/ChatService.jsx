import axios from "axios";
import { CHAT_API_END_POINT } from "../utils/constant";

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
	getChat,
};
export default ChatService;
