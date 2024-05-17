import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

const Friends = () => {
	const [user, setUser] = useState(null);
	const userId = useSelector((state) => state.auth.user.user._id);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(
					`${USER_API_END_POINT}/friends/${userId}`,
					{
						headers: {
							"Content-Type": "application/json",
						},
						withCredentials: true,
					}
				);
				setUser(response.data.user);
			} catch (error) {
				console.error("Error fetching user data", error);
			}
		};

		fetchUser();
	}, [userId]);

	return (
		<>
			<div className='friends-container main-section'>
				<div className='followers-section'>
					<h2>Followers</h2>
					{user &&
						user?.followers.map((follower, index) => {
							return (
								<div key={index} className='follower-profile'>
									<div className='sidebar-profile-img'>
										<Avatar
											src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
											size='50'
											round={true}
										/>
									</div>
									<div className='request-profile'>
										<Link
											to={`/profile/${follower?._id}`}
											className='suggested-name'>
											<h2>{follower?.name}</h2>
										</Link>
										<Link
											className='mutual-friend'
											to={`/profile/${follower?._id}`}>{`@${follower?.username}`}</Link>
									</div>
								</div>
							);
						})}
				</div>
				<hr className='friends-line' />
				<div className='following-section'>
					<h2>Following</h2>
					{user &&
						user?.following.map((following, index) => {
							return (
								<div key={index} className='follower-profile'>
									<div className='sidebar-profile-img'>
										<Avatar
											src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
											size='50'
											round={true}
										/>
									</div>
									<div className='request-profile'>
										<Link
											to={`/profile/${following?._id}`}
											className='suggested-name'>
											<h2>{following?.name}</h2>
										</Link>
										<Link
											className='mutual-friend'
											to={`/profile/${following?._id}`}>{`@${following?.username}`}</Link>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default Friends;
