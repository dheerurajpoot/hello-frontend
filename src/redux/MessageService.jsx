import axios from "axios";
import { MESSAGE_API_END_POINT } from "../utils/constant";

const getMessages = async (id) => {
	try {
		const response = await axios.get(`${MESSAGE_API_END_POINT}/${id}`, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error("Error in getting message :", error);
		throw error;
	}
};

const MessageService = {
	getMessages,
};
export default MessageService;
