import React, { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../redux/ChatSlice";
import Conversion from "../components/Conversion";
import ChatBox from "../components/ChatBox";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const Chat = () => {
	const dispatch = useDispatch();
	const socket = useRef();
	const [currentChat, setCurrentChat] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [sendMessage, setSendMessage] = useState(null);
	const [receiveMessage, setReceiveMessage] = useState(null);

	const user = useSelector((state) => state.auth?.user?.user);
	const chats = useSelector((state) => state.chats?.chats);

	// send messages to the socket server
	useEffect(() => {
		if (sendMessage !== null) {
			socket.current.emit("send-message", sendMessage);
		}
	}, [sendMessage]);

	useEffect(() => {
		socket.current = io("http://localhost:8800");
		socket.current.emit("add-new-user", user?._id);
		socket.current.on("get-users", (users) => {
			setOnlineUsers(users);
		});
	}, [user]);

	// receive messages from the socket server
	useEffect(() => {
		socket.current.on("recieve-message", (data) => {
			setReceiveMessage(data);
		});
	}, []);
	useEffect(() => {
		dispatch(getChat(user?._id));
	}, [user?._id]);

	const checkOnlineStatus = (chat) => {
		const chatMember =
			chat?.members?.sender?._id !== user?._id
				? chat?.members?.sender?._id
				: chat?.members?.receiver?._id;
		const online = onlineUsers.find((user) => user.userId === chatMember);
		return online ? true : false;
	};

	return (
		<>
			<div className='chat-container'>
				<div className='chat-sections'>
					<section className='discussions'>
						<div className='discussion search'>
							<div className='backtofeed'>
								<Link to={-1}>
									<IoArrowBack size={25} />
								</Link>
							</div>
							<div className='searchbar'>
								<IoSearchSharp size={25} />
								<input
									type='text'
									placeholder='Search...'></input>
							</div>
						</div>
						{chats?.map((chat, index) => {
							return (
								<div
									key={index}
									onClick={() => setCurrentChat(chat)}>
									<Conversion
										online={checkOnlineStatus(chat)}
										data={chat}
										currentUserId={user?._id}
									/>
								</div>
							);
						})}
					</section>
					<ChatBox
						chat={currentChat}
						setSendMessage={setSendMessage}
						receiveMessage={receiveMessage}
					/>
				</div>
			</div>
		</>
	);
};

export default Chat;
