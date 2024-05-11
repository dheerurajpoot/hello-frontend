import React, { useEffect } from "react";
import Avatar from "react-avatar";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { refreshFollowing } from "../redux/userSlice";
import { setRefresh } from "../redux/postSlice";
import { toast } from "react-toastify";
import { follow, getUserProfile, unfollow } from "../redux/UserNewSlice";
import { getUserPosts } from "../redux/PostNewSlice";

const Profile = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const id = location.pathname.split("/")[2];

	useEffect(() => {
		dispatch(getUserProfile(id));
		dispatch(getUserPosts(id));
	}, [dispatch, id]);

	const user = useSelector((state) => state.auth?.user?.user);
	const profile = useSelector((state) => state?.auth?.profile?.user);
	const posts = useSelector((state) => state?.posts?.posts);

	const profilePosts = [];
	if (posts) {
		for (const post of posts) {
			if (profile && profile?._id === post?.userID) {
				profilePosts.push(post);
			}
		}
	}

	//follow unfollow
	const followUnfollowHandler = () => {
		if (user?.following.includes(id)) {
			dispatch(unfollow({ id, userId: user?._id }));
		} else {
			dispatch(follow({ id, userId: user?._id }));
		}
	};

	// const followHandler = async () => {
	// 	if (user.following.includes(id)) {
	// 		//unfollow
	// 		try {
	// 			axios.defaults.withCredentials = true;
	// 			const res = await axios.post(
	// 				`${USER_API_END_POINT}/unfollow/${id}`,
	// 				{ id: user?._id }
	// 			);
	// 			if (res.data.success) {
	// 				toast.success(res.data.message);
	// 			}
	// 			dispatch(refreshFollowing(id));
	// 			dispatch(setRefresh());
	// 		} catch (error) {
	// 			toast.error(error.response.data.message);
	// 			console.log(error);
	// 		}
	// 	} else {
	// 		//follow
	// 		try {
	// 			axios.defaults.withCredentials = true;
	// 			const res = await axios.post(
	// 				`${USER_API_END_POINT}/follow/${id}`,
	// 				{ id: user?._id }
	// 			);
	// 			if (res.data.success) {
	// 				toast.success(res.data.message);
	// 			}
	// 			dispatch(refreshFollowing(id));
	// 			dispatch(setRefresh());
	// 		} catch (error) {
	// 			toast.error(error.response.data.message);
	// 			console.log(error);
	// 		}
	// 	}
	// };

	return (
		<>
			<section className='profile-page'>
				<div className='profilecard'>
					<div className='infoimages'>
						<img src='./../../images/hello-cover.jpg' alt='Cover' />
						<div className='user-profile-img'>
							<Avatar
								src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
								size='300'
								round={true}
							/>
						</div>
					</div>
					<div className='profileinfo'>
						<span>{profile?.name}</span>
						<a
							href={`/profile/${profile?.username}`}>{`@${profile?.username}`}</a>
						{/* <span>Web Developer</span> */}
					</div>
					<div className='followerinfo'>
						<div className='profile-friendinfo'>
							<div className='following'>
								<span>{profile?.followers?.length}</span>
								<span>Followers</span>
							</div>
							<div className='vl'></div>
							<div className='following'>
								<span>{profile?.following?.length}</span>
								<span>Following</span>
							</div>
							<div className='vl'></div>
							<div className='post'>
								<span>{profilePosts.length}</span>
								<span>Post</span>
							</div>
						</div>
						{profile?._id === user?._id ? (
							<button className='edit-profile'>
								Edit Profile
							</button>
						) : (
							<button
								onClick={followUnfollowHandler}
								className='edit-profile'>
								{user?.following.includes(id)
									? "Following"
									: "Follow"}
							</button>
						)}
					</div>
				</div>
				<section className='profile-posts'>
					<h2>Your Timeline</h2>
					{profilePosts.map((post) => (
						<Post key={post?._id} post={post} />
					))}
				</section>
			</section>
		</>
	);
};

export default Profile;
