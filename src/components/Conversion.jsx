import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultImg from "/images/default.png";

const Conversion = ({ data, online }) => {
	const [chat, setChat] = useState({});

	const user = useSelector((state) => state.auth?.user?.user);

	useEffect(() => {
		if (data?.members?.sender?._id !== user?._id) {
			setChat(data?.members?.sender);
		} else {
			setChat(data?.members?.receiver);
		}
	}, [user?._id]);
	return (
		<div className='discussion'>
			<div className='photo'>
				<img
					src={chat?.profilePic ? chat?.profilePic : defaultImg}
					alt=''
				/>
				{online && online ? <div className='online'></div> : ""}
			</div>
			<div className='desc-contact'>
				<p className='name'>{chat?.name}</p>
				<p className='message'>{online ? "Online" : "Offline"}</p>
			</div>
			<div className='timer'>View</div>
		</div>
	);
};

export default Conversion;
