import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getUserPosts } from "../redux/PostNewSlice";
import { CiImageOn } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const Main = () => {
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const imageRef = useRef();

	const onImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0];
			setImage(img);
		}
	};

	const user = useSelector((state) => state?.auth?.user?.user);
	const dispatch = useDispatch();

	const createPostHandle = () => {
		dispatch(createPost({ description, id: user?._id })).then(() => {
			dispatch(getUserPosts());
		});
	};

	// get all user posts
	useEffect(() => {
		dispatch(getUserPosts());
	}, [dispatch, user?._id]);

	const allPosts = useSelector((state) => state?.posts?.posts);
	const userposts = allPosts
		.slice()
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
						<div
							className='choose-img'
							onClick={() => imageRef.current.click()}>
							<CiImageOn size={30} />
							<span>Photo</span>
						</div>
						<div className='choose-photo'>
							<input
								type='file'
								name='create-post-img'
								id='create-post-img'
								ref={imageRef}
								onChange={onImageChange}
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
					{image && (
						<div className='img-preview'>
							<RxCross2
								size={28}
								onClick={() => setImage(null)}
							/>
							<img
								src={URL.createObjectURL(image)}
								alt='Post Image'
							/>
						</div>
					)}
				</div>
				{userposts?.map((post, index) => (
					<Post key={index} post={post} />
				))}
			</section>
		</>
	);
};

export default Main;
