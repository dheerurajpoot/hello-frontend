import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/UserNewSlice";

const Register = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const registerHandler = (e) => {
		e.preventDefault();
		dispatch(registerUser({ name, username, email, password }));
		setTimeout(() => {
			navigate("/login");
		}, 600);
	};
	return (
		<>
			<section>
				<form
					onSubmit={registerHandler}
					className='register-form login-form'>
					<h3>Register Here</h3>

					<label htmlFor='name'>Name:</label>
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Full Name'
						id='name'
						required
					/>

					<label htmlFor='username'>Username:</label>
					<input
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Username'
						id='username'
						required
					/>

					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Email'
						id='email'
						required
					/>

					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
						id='password'
						required
					/>

					<button type='submit'>Register</button>
					<div className='no-account'>
						<p>
							Already have an Account :{" "}
							<a href='/login'>Login Here</a>
						</p>
					</div>
				</form>
			</section>
		</>
	);
};

export default Register;
