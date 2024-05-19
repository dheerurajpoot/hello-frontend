import React, { useEffect } from "react";
import Avatar from "react-avatar";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { follow, getUserProfile, unfollow } from "../redux/UserNewSlice";
import { getUserPosts } from "../redux/PostNewSlice";
import { createChat } from "../redux/ChatSlice";
import defaultImg from "../../public/images/default.png";

const Profile = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const id = location.pathname.split("/")[2];

	useEffect(() => {
		dispatch(getUserProfile(id));
		dispatch(getUserPosts(id));
	}, [dispatch, id]);

	const user = useSelector((state) => state.auth?.user?.user);
	const profile = useSelector((state) => state?.auth?.profile?.user);
	const posts = useSelector((state) => state?.posts?.posts);

	const profilePosts =
		posts?.filter((post) => post.userID === profile?._id) || [];

	//follow unfollow
	const followUnfollowHandler = () => {
		if (profile?.followers.includes(user?._id)) {
			dispatch(unfollow({ id, userId: user?._id })).then(() => {
				dispatch(getUserProfile(id)); // Update profile data after unfollow
			});
		} else {
			dispatch(follow({ id, userId: user?._id })).then(() => {
				dispatch(getUserProfile(id)); // Update profile data after follow
			});
		}
	};

	const chatHandler = (id) => {
		dispatch(createChat({ senderId: user?._id, receiverId: id }));
		setTimeout(() => {
			navigate("/chat");
			window.location.reload();
		}, 300);
	};

	return (
		<>
			<section className='profile-page'>
				<div className='profilecard'>
					<div className='infoimages'>
						<img src='./../../images/hello-cover.jpg' alt='Cover' />
						<div className='user-profile-img'>
							<Avatar
								src={
									profile?.profilePic && profile?.profilePic
										? profile?.profilePic
										: defaultImg
								}
								size='300'
								round={true}
							/>
						</div>
					</div>
					<div className='profileinfo'>
						<span>{profile?.name}</span>
						<a
							href={`/profile/${profile?.username}`}>{`@${profile?.username}`}</a>
						<span>{profile?.userDescription}</span>
						{profile?._id === user?._id ? (
							<span className='account-mail'>
								Account Email: {profile?.email}
							</span>
						) : (
							""
						)}
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
							<Link to={`/update-profile/${profile?._id}`}>
								<button className='edit-profile'>
									Edit Profile
								</button>
							</Link>
						) : (
							<div className='follow-chat-btn'>
								<button
									onClick={followUnfollowHandler}
									className='edit-profile'>
									{profile?.followers.includes(user?._id)
										? "Following"
										: "Follow"}
								</button>
								<button
									onClick={() => chatHandler(profile?._id)}
									className='edit-profile'>
									Message
								</button>
							</div>
						)}
					</div>
				</div>
				<section className='profile-posts'>
					{profilePosts && profilePosts.length === 0 ? (
						<div className='no-posts'>
							<p>
								{profile?.name} didn't' posted Anything here!{" "}
							</p>
						</div>
					) : (
						<>
							<h2>Your Timeline</h2>
							{profilePosts.map((post) => (
								<Post key={post?._id} post={post} />
							))}
						</>
					)}
				</section>
			</section>
		</>
	);
};

export default Profile;
