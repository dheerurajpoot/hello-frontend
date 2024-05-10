import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { POST_API_END_POINT } from "../utils/constant";
import { setRefresh } from "../redux/postSlice";
import { toast } from "react-toastify";
import { createPost, getUserPosts } from "../redux/PostNewSlice";

const Main = () => {
	const [description, setDescription] = useState("");
	const user = useSelector((state) => state?.auth?.user?.user);
	const dispatch = useDispatch();

	const createPostHandle = () => {
		dispatch(createPost({ description, id: user?._id }));
	};

	// get all user posts
	useEffect(() => {
		dispatch(getUserPosts(user?._id));
	}, [dispatch, user?._id]);

	const userposts = useSelector((state) => state?.posts?.posts);

	return (
		<>
			<section className='main-section'>
				<div className='create-post-section'>
					<div className='create-post'>
						<Link
							to={`/profile/${user?._id}`}
							className='sidebar-profile-img'>
							<Avatar
								src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
								size='50'
								round={true}
							/>
						</Link>
						<div className='post-input'>
							<input
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								type='text'
								placeholder='What&#x27;s in your mind!'
							/>
						</div>
					</div>
					<div className='post-elements'>
						<div className='choose-img'>
							<input
								type='file'
								name='create-post-img'
								id='create-post-img'
							/>
						</div>
						<div>
							<button
								type='submit'
								onClick={createPostHandle}
								className='submit-post'>
								Post
							</button>
						</div>
					</div>
				</div>
				{userposts?.map((post, index) => (
					<Post key={index} post={post} />
				))}
			</section>
		</>
	);
};

export default Main;
