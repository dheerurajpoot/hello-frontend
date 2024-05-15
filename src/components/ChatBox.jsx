import React, { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { FaUser } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, sendMessages } from "../redux/MessageSlice";
import { format } from "timeago.js";

const ChatBox = ({ chat }) => {
	const [msg, setMsg] = useState("");

	const messages = useSelector((state) => state.messages?.messages);
	const user = useSelector((state) => state.auth?.user?.user);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMessages(chat?._id));
	}, [chat?._id]);

	const msgHandler = (e) => {
		e.preventDefault();
		dispatch(
			sendMessages({
				chatId: chat?._id,
				senderId: user?._id,
				text: msg,
			})
		).then(() => {
			dispatch(getMessages(chat?._id));
			setMsg("");
		});
	};
	return (
		<section className='chat'>
			{chat && chat ? (
				<div>
					<div className='header-chat'>
						<FaUser className='icon' />
						<p className='name'>{chat?.members?.receiver?.name}</p>
						<FaEllipsisH className='icon clickable right' />
					</div>
					{messages?.length !== 0 ? (
						<div className='messages-chat'>
							{messages?.map((message, index) => {
								return (
									<div key={index} className='msg-body'>
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
											{format(message?.createdAt)}
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
							cleanOnEnter
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
