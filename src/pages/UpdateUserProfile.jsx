import React, { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../redux/UserNewSlice";
import { useNavigate } from "react-router-dom";

const UpdateUserProfile = () => {
	const [name, setName] = useState("");
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");
	const [image, setImage] = useState(null);
	const imageRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth?.user?.user);

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

	const updateHandler = async (e) => {
		e.preventDefault();
		const imgUrl = await uploadFile();
		const data = {
			id: user?._id,
			name: name,
			username: userName,
			email: email,
			userDescription: bio,
			profilePic: imgUrl,
		};
		dispatch(updateUserProfile(data)).then((response) => {
			if (response.meta.requestStatus === "fulfilled") {
				const updatedUser = response.payload;
				localStorage.setItem("user", JSON.stringify(updatedUser));
				dispatch(getUserProfile(user?._id));
			}
			setTimeout(() => {
				navigate(`/profile/${user?._id}`);
			}, 1200);
		});
	};
	return (
		<>
			<div className='update-profile-container main-section'>
				<form onSubmit={updateHandler}>
					<h2>Update Profile Details</h2>
					<fieldset>
						<legend>
							<span className='number'>1</span> Your Basic Info
						</legend>

						<label htmlFor='name'>Name:</label>
						<input
							type='text'
							id='name'
							name='user_name'
							placeholder='Enter full name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<label htmlFor='username'>Username:</label>
						<input
							type='text'
							id='username'
							name='username'
							placeholder='Enter username'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>

						<label htmlFor='email'>Email:</label>
						<input
							type='email'
							id='mail'
							name='user_email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</fieldset>
					<fieldset>
						<legend>
							<span className='number'>2</span> Your Profile
						</legend>

						<label htmlFor='bio'>Bio:</label>
						<textarea
							id='bio'
							name='user_bio'
							placeholder='Enter your bio'
							value={bio}
							onChange={(e) => setBio(e.target.value)}
						/>

						<label htmlFor='profile-pic'>Profile Photo:</label>
						{/* <input type='file' id='profile-pic' name='profilepic' /> */}
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
								onChange={(e) => setImage(e.target.files[0])}
							/>
						</div>
					</fieldset>
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

					<button type='submit'>Update Profile</button>
				</form>
			</div>
		</>
	);
};

export default UpdateUserProfile;
