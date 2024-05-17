import React from "react";

const HelpSupport = () => {
	return (
		<>
			<div className='support-container main-section'>
				<div className='support-container'>
					<div className='form-container'>
						<div className='left-container'>
							<div className='left-inner-container'>
								<h2>Help & Support</h2>
								<p>
									Whether you have any problem, facing any
									issue related to our site don't hesitate to
									contact us on given form below.
								</p>
								<br />
								<p>
									Feel free to send me a message in the given
									form
								</p>
								<p>Or mail us on : contact@dheeru.org</p>
							</div>
						</div>
						<div className='right-container'>
							<div className='right-inner-container'>
								<form
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
									<input
										type='phone'
										name='phone'
										placeholder='Phone'
									/>
									<textarea
										rows='4'
										placeholder='Message'
										name='message'></textarea>
									<button type='submit'>Submit</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HelpSupport;
