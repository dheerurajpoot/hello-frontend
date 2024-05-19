import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getUserPosts } from "../redux/PostNewSlice";
import { CiImageOn } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import defaultImg from "/images/default.png";

const Main = () => {
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const imageRef = useRef(null);

	const user = useSelector((state) => state?.auth?.user?.user);
	const dispatch = useDispatch();

	const uploadFile = async () => {
		const data = new FormData();
		data.append("file", image);
		data.append("upload_preset", "images-preset");
		try {
			let cloudname = import.meta.env.VITE_APP_CLOUD_NAME;
			let resourceType = "image";
			let api = `https://api.cloudinary.com/v1_1/${cloudname}/${resourceType}/upload `;

			const res = await axios.post(api, data);

			const { secure_url } = res.data;
			return secure_url;
		} catch (error) {
			console.log(error);
		}
	};

	const createPostHandle = async (e) => {
		e.preventDefault();
		const imgUrl = await uploadFile();

		dispatch(createPost({ description, imgUrl, id: user?._id })).then(
			() => {
				dispatch(getUserPosts());
			}
		);
		setImage(null);
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
					<form onSubmit={createPostHandle}>
						<div className='create-post'>
							<Link
								to={`/profile/${user?._id}`}
								className='sidebar-profile-img'>
								<Avatar
									src={
										user?.profilePic
											? user?.profilePic
											: defaultImg
									}
									size='50'
									round={true}
								/>
							</Link>
							<div className='post-input'>
								<input
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
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
									accept='image/*'
									name='create-post-img'
									id='create-post-img'
									ref={imageRef}
									onChange={(e) =>
										setImage(e.target.files[0])
									}
								/>
							</div>
							<div>
								<button type='submit' className='submit-post'>
									Post
								</button>
							</div>
						</div>
					</form>
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
