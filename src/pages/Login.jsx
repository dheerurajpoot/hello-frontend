import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/UserNewSlice";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loginhandler = (e) => {
		e.preventDefault();
		dispatch(loginUser({ email, password }));
	};
	const user = useSelector((state) => state.auth);
	if (user?.isSuccess) {
		setTimeout(() => {
			navigate("/");
		}, 600);
	}
	return (
		<>
			<section>
				<form onSubmit={loginhandler} className='login-form'>
					<h3>Login Here</h3>

					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Email'
						id='email'
					/>

					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
						id='password'
					/>
					<div className='forget-password-section'>
						<div className='remeber'>
							<input
								type='checkbox'
								name='remember me'
								id='rememberme'
							/>
							<label htmlFor='rememberme'>Remember Me</label>
						</div>
						<a href='#'>Forget password</a>
					</div>
					<button type='submit'>Log In</button>
					<div className='no-account'>
						<p>
							Don't have an Account :{" "}
							<a href='/register'>Register Here</a>
						</p>
					</div>
				</form>
			</section>
		</>
	);
};

export default Login;
