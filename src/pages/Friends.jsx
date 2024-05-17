import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";

const Friends = () => {
	const user = useSelector((state) => state?.auth?.user?.user);

	return (
		<>
			<div className='friends-container main-section'>
				<div className='followers-section'>
					<h2>Followers</h2>
					<div className='follower-profile'>
						<div className='sidebar-profile-img'>
							<Avatar
								src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
								size='50'
								round={true}
							/>
						</div>
						<div className='request-profile'>
							<Link to={`/`} className='suggested-name'>
								<h2>Dheeru Rajpoot</h2>
							</Link>
							<Link
								className='mutual-friend'
								to={`/`}>{`@${"dheerurajpoot"}`}</Link>
						</div>
						<div className='request-buttons'>
							<Link>
								<button>Follow</button>
							</Link>
						</div>
					</div>
				</div>
				<hr className='friends-line' />
				<div className='following-section'>
					<h2>Following</h2>
					<div className='follower-profile'>
						<div className='sidebar-profile-img'>
							<Avatar
								src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
								size='50'
								round={true}
							/>
						</div>
						<div className='request-profile'>
							<Link to={`/`} className='suggested-name'>
								<h2>Dheeru Rajpoot</h2>
							</Link>
							<Link
								className='mutual-friend'
								to={`/`}>{`@${"dheerurajpoot"}`}</Link>
						</div>
						<div className='request-buttons'>
							<Link>
								<button>Follow</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Friends;
