import React from "react";

const Conversion = ({ data }) => {
	return (
		<div className='discussion'>
			<div className='photo'>
				<div className='online'></div>
			</div>
			<div className='desc-contact'>
				<p className='name'>{data?.members?.receiver?.name}</p>
				<p className='message'>9 pm at the bar if possible 😳</p>
			</div>
			<div className='timer'>12 sec</div>
		</div>
	);
};

export default Conversion;
