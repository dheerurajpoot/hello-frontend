import React from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import defaultImg from "/images/default.png";

const RightSidebar = ({ otherUsers }) => {
	const loggedUser = useSelector((state) => state?.auth?.user?.user);
	const suggestedUsers = otherUsers?.filter((user) => {
		if (!user?.followers?.includes(loggedUser?._id)) {
			return user;
		}
	});
	return (
		<>
			<section className='right-sidebar'>
				<div className='friend-request'>
					<h3>Suggestions</h3>
					{suggestedUsers?.slice(0, 5).map((user) => {
						return (
							<div key={user?._id} className='request-details'>
								<div className='friend-request-section'>
									<div className='sidebar-profile-img'>
										<Avatar
											src={
												user?.profilePic
													? user?.profilePic
													: defaultImg
											}
											size='50'
											round={true}
										/>
									</div>
									<div className='request-profile'>
										<Link
											to={`/profile/${user?._id}`}
											className='suggested-name'>
											<h2>{user?.name}</h2>
										</Link>
										<Link
											className='mutual-friend'
											to={`/profile/${user?._id}`}>{`@${user?.username}`}</Link>
									</div>
								</div>
								<div className='request-buttons'>
									<Link to={`/profile/${user?._id}`}>
										<button>Follow</button>
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</>
	);
};

export default RightSidebar;
