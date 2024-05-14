import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { FaUser } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";
// import { FaSmile } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";

const ChatBox = () => {
	const [text, setText] = useState("");

	function submitHandler(text) {
		console.log("enter", text);
	}
	return (
		<section className='chat'>
			<div className='header-chat'>
				<FaUser className='icon' />
				<p className='name'>Megan Leib</p>
				<FaEllipsisH className='icon clickable right' />
			</div>
			<div className='messages-chat'>
				<div className='message'>
					<div className='photo'></div>
					<p className='text'>Hi, how are you ?</p>
				</div>
				<div className='message text-only'>
					<p className='text'>
						What are you doing tonight ? Want to go take a drink ?
					</p>
				</div>
				<p className='chat-time'>14h58</p>
				<div className='message text-only'>
					<div className='response'>
						<p className='text'>Hey Megan ! It's been a while 😃</p>
					</div>
				</div>
				<div className='message text-only'>
					<div className='response'>
						<p className='text'>When can we meet ?</p>
					</div>
				</div>
				<p className='response-time chat-time'>15h04</p>
				<div className='message'>
					<div className='photo'></div>
					<p className='text'>9 pm at the bar if possible 😳</p>
				</div>
				<p className='chat-time'>15h09</p>
			</div>
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
		</section>
	);
};

export default ChatBox;
