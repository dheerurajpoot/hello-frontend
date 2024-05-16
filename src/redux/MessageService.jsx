import axios from "axios";
import { MESSAGE_API_END_POINT } from "../utils/constant";

const sendMessages = async (data) => {
	try {
		const response = await axios.post(`${MESSAGE_API_END_POINT}`, data, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error("Error in sending message :", error);
		throw error;
	}
};
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
	sendMessages,
	getMessages,
};
export default MessageService;
