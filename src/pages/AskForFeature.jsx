import React from "react";

const AskForFeature = () => {
	return (
		<>
			<div className='feature-container main-section'>
				<div className='right-container'>
					<div className='right-inner-container'>
						<h2>Ask for a Feature</h2>
						<form
							className='feature-form'
							action='https://formspree.io/f/mayrkvzb'
							method='POST'>
							<input
								type='text'
								name='name'
								placeholder='Name *'
							/>
							<input
								type='email'
								name='email'
								placeholder='Email *'
							/>
							<textarea
								rows='4'
								placeholder='What is in your mind, Explore it ?'
								name='message'></textarea>
							<button type='submit'>Submit</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default AskForFeature;
