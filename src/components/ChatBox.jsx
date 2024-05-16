import React, { useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { FaUser } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, sendMessages } from "../redux/MessageSlice";
import { format } from "timeago.js";

const ChatBox = ({ chat, setSendMessage, receiveMessage }) => {
	const [msg, setMsg] = useState("");
	const [userMsg, setUserMsg] = useState(null);
	const scroll = useRef();
	const messages = useSelector((state) => state.messages?.messages);
	const user = useSelector((state) => state.auth?.user?.user);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMessages(chat?._id));
	}, [chat?._id]);

	useEffect(() => {
		setUserMsg(messages);
	}, [messages]);

	// Always scroll to last Message
	useEffect(() => {
		scroll.current?.scrollIntoView({ behavior: "smooth" });
	}, [userMsg]);

	const msgData = {
		chatId: chat?._id,
		senderId: user?._id,
		message: msg,
	};
	// send messages to database
	const msgHandler = (e) => {
		e.preventDefault();
		dispatch(sendMessages(msgData)).then(() => {
			dispatch(getMessages(chat?._id));
			setMsg("");
		});

		// send message to socket server
		const receiverId =
			chat?.members?.sender?._id !== user?._id
				? chat?.members?.sender?._id
				: chat?.members?.receiver?._id;

		setSendMessage({ ...msgData, receiverId });
	};
	// receive messages from parent component
	useEffect(() => {
		if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
			setUserMsg([...messages, receiveMessage]);
		}
	}, [receiveMessage]);

	return (
		<section className='chat'>
			{chat && chat ? (
				<div>
					<div className='header-chat'>
						<FaUser className='icon' />
						<p className='name'>
							{chat?.members?.receiver?._id !== user?._id
								? chat?.members?.receiver?.name
								: chat?.members?.sender?.name}
						</p>
						<FaEllipsisH className='icon clickable right' />
					</div>
					{userMsg?.length !== 0 ? (
						<div className='messages-chat'>
							{userMsg?.map((message, index) => {
								return (
									<div
										key={index}
										ref={scroll}
										className='msg-body'>
										<div className='message text-only'>
											<div
												className={
													message?.senderId ===
													user?._id
														? "response"
														: ""
												}>
												<p className='text'>
													{message?.message}
												</p>
											</div>
										</div>
										<p
											className={
												message?.senderId === user?._id
													? "response-time chat-time"
													: "chat-time"
											}>
											{message &&
												format(message?.createdAt)}
										</p>
									</div>
								);
							})}
						</div>
					) : (
						<div className='messages-chat empty-message'>
							<p>You don't have any message yet!</p>
						</div>
					)}
					<div className='footer-chat'>
						<InputEmoji
							value={msg}
							onChange={setMsg}
							placeholder='Type a message'
						/>
						<div className='send-msg' onClick={msgHandler}>
							Send
						</div>
					</div>
				</div>
			) : (
				<p className='show-conversion'>
					Tap on Chats to Start Conversion{" "}
				</p>
			)}
		</section>
	);
};

export default ChatBox;
