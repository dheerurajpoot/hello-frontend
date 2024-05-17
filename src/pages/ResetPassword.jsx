import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant";
import { toast } from "react-toastify";

const ResetPassword = () => {
	const { token } = useParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.success("Passwords do not match");
			return;
		}
		try {
			const response = await axios.post(
				`${USER_API_END_POINT}/reset-password`,
				{
					token,
					password,
				}
			);
			toast.success(response.data.message);
			setTimeout(() => {
				navigate("/login");
			}, 800);
		} catch (error) {
			toast.error("An error occurred. Please try again.");
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className='login-form reset-password'>
				<h3>Reset Password</h3>

				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Enter new password'
					id='password'
				/>
				<label htmlFor='password'>Confirm Password:</label>
				<input
					type='password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder='Confirm new password'
					id='password'
				/>
				<button type='submit'>Reset Password</button>
			</form>
		</div>
	);
};

export default ResetPassword;
