import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";
import { FaSmile } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getChat } from "../redux/ChatSlice";

const Chat = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth?.user?.user);

	useEffect(() => {
		dispatch(getChat(user?._id));
	}, [user?._id]);
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
						<div className='discussion'>
							<div className='photo'>
								<div className='online'></div>
							</div>
							<div className='desc-contact'>
								<p className='name'>Megan Leib</p>
								<p className='message'>
									9 pm at the bar if possible 😳
								</p>
							</div>
							<div className='timer'>12 sec</div>
						</div>
						<div className='discussion'>
							<div className='photo'></div>
							<div className='desc-contact'>
								<p className='name'>Dave Corlew</p>
								<p className='message'>
									Let's meet for a coffee or something today ?
								</p>
							</div>
							<div className='timer'>3 min</div>
						</div>
						<div className='discussion'>
							<div className='photo'></div>
							<div className='desc-contact'>
								<p className='name'>Dave Corlew</p>
								<p className='message'>
									Let's meet for a coffee or something today ?
								</p>
							</div>
							<div className='timer'>3 min</div>
						</div>
						<div className='discussion'>
							<div className='photo'></div>
							<div className='desc-contact'>
								<p className='name'>Dave Corlew</p>
								<p className='message'>
									Let's meet for a coffee or something today ?
								</p>
							</div>
							<div className='timer'>3 min</div>
						</div>
						{/* Add more discussion components as needed */}
					</section>
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
									What are you doing tonight ? Want to go take
									a drink ?
								</p>
							</div>
							<p className='time'>14h58</p>
							<div className='message text-only'>
								<div className='response'>
									<p className='text'>
										Hey Megan ! It's been a while 😃
									</p>
								</div>
							</div>
							<div className='message text-only'>
								<div className='response'>
									<p className='text'>When can we meet ?</p>
								</div>
							</div>
							<p className='response-time time'>15h04</p>
							<div className='message'>
								<div className='photo'></div>
								<p className='text'>
									9 pm at the bar if possible 😳
								</p>
							</div>
							<p className='time'>15h09</p>
						</div>
						<div className='footer-chat'>
							<FaSmile size={30} className='icon clickable' />
							<input
								type='text'
								className='write-message'
								placeholder='Type your message here'
							/>
							<FaPaperPlane
								size={30}
								className='icon clickable'
							/>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default Chat;
