import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/UserNewSlice";

const Conversion = ({ data }) => {
	return (
		<div className='discussion'>
			<div className='photo'>
				<div className='online'></div>
			</div>
			<div className='desc-contact'>
				<p className='name'>Simran</p>
				<p className='message'>9 pm at the bar if possible 😳</p>
			</div>
			<div className='timer'>12 sec</div>
		</div>
	);
};

export default Conversion;
