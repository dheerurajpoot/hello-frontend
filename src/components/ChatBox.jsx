import React, { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { FaUser } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";
// import { FaSmile } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../redux/MessageSlice";
import { format } from "timeago.js";

const ChatBox = ({ chat }) => {
	const [text, setText] = useState("");

	const messages = useSelector((state) => state.messages?.messages);
	const user = useSelector((state) => state.auth?.user?.user);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMessages(chat?._id));
	}, [chat?._id]);

	function submitHandler(text) {
		console.log("enter", text);
	}
	return (
		<section className='chat'>
			{chat && chat ? (
				<div>
					<div className='header-chat'>
						<FaUser className='icon' />
						<p className='name'>{chat?.members?.receiver?.name}</p>
						<FaEllipsisH className='icon clickable right' />
					</div>
					{messages && messages ? (
						<div className='messages-chat'>
							{messages?.map((message, index) => {
								return (
									<div key={index}>
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
						<p>You don't have any message</p>
					)}

					<div className='footer-chat'>
						<InputEmoji
							value={text}
							onChange={setText}
							cleanOnEnter
							onEnter={submitHandler}
							placeholder='Type a message'
						/>
						<FaPaperPlane size={30} className='icon clickable' />
					</div>
				</div>
			) : (
				<p className='show-conversion'>
					Click on Chats to Show Conversion{" "}
				</p>
			)}
		</section>
	);
};

export default ChatBox;
