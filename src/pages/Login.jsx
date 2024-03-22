import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { USER_API_END_POINT } from '../utils/constant';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { getUser } from '../redux/userSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const submitHandler = async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, {email, password},{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      dispatch(getUser(res?.data?.user))
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/")
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  return (
    <>
      <section>
        <form onSubmit={submitHandler} className='login-form'>
            <h3>Login Here</h3>

            <label htmlFor="email">Email:</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" id="email"/>

            <label htmlFor="password">Password:</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" id="password"/>
            <div className='forget-password-section'>
              <div className='remeber'>
                <input type="checkbox" name="remember me" id="rememberme" />
                <label htmlFor="rememberme">Remember Me</label>
              </div>
              <a href="#">Forget password</a>
            </div>
            <button type='submit'>Log In</button>
            <div className="no-account">
              <p>Don't have an Account : <a href="/register">Register Here</a></p>
            </div>
        </form>
      </section>
    </>
  )
}

export default Login
