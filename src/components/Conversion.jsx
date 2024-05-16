import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Conversion = ({ data }) => {
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
				<div className='online'></div>
			</div>
			<div className='desc-contact'>
				<p className='name'>{chat?.name}</p>
				<p className='message'>9 pm at the bar if possible 😳</p>
			</div>
			<div className='timer'>12 sec</div>
		</div>
	);
};

export default Conversion;
