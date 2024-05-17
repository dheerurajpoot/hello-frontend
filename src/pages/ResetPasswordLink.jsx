import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "../utils/constant";

const ResetPasswordLink = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${USER_API_END_POINT}/request-password-reset`,
				{
					email,
				}
			);
			toast.success(response.data.message);
		} catch (error) {
			toast.error("An error occurred. Please try again.");
		}
	};
	return (
		<>
			<div className='reset-container'>
				<form
					onSubmit={handleSubmit}
					className='login-form reset-link-form'>
					<h3>Login Here</h3>

					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Enter your email'
						id='email'
					/>
					<button type='submit'>Send Reset Link</button>
				</form>
			</div>
		</>
	);
};

export default ResetPasswordLink;
