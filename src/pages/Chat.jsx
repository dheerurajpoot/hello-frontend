import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../redux/ChatSlice";
import Conversion from "../components/Conversion";
import ChatBox from "../components/ChatBox";
import { Link } from "react-router-dom";
import { getUserProfile } from "../redux/UserNewSlice";

const Chat = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth?.user?.user);
	const chats = useSelector((state) => state.chats?.chats);

	useEffect(() => {
		dispatch(getChat(user?._id));
	}, [user?._id]);

	const chattinguser = [];
	chats.map((chat) => {
		const userId = chat.members.find((id) => id !== user?._id);
		chattinguser.push(userId);
	});

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
								<Conversion
									key={index}
									data={chat}
									currentUserId={user?._id}
								/>
							);
						})}
					</section>
					<ChatBox />
				</div>
			</div>
		</>
	);
};

export default Chat;
