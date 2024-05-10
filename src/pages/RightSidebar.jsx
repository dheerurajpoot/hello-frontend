import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const RightSidebar = ({ otherUsers }) => {
	return (
		<>
			<section className='right-sidebar'>
				<div className='friend-request'>
					<h3>Suggestions</h3>
					{otherUsers?.slice(0, 5).map((user) => {
						return (
							<div key={user?._id} className='request-details'>
								<div className='friend-request-section'>
									<div className='sidebar-profile-img'>
										<Avatar
											src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
											size='50'
											round={true}
										/>
									</div>
									<div className='request-profile'>
										<h2>{user?.name}</h2>
										<Link
											className='mutual-friend'
											to='#'>{`@${user?.username}`}</Link>
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
				{/* <div className="friends">
          <h3>Recent Followers</h3>
          <div className="friend-list">
            <div className='single-friend'>
              <Avatar src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" size="40" round={true} />
              <h3>Ram rajpoot</h3>
            </div>
            <div className='single-friend'>
              <Avatar src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" size="40" round={true} />
              <h3>Rohit Kumar</h3>
            </div>
            <div className='single-friend'>
              <Avatar src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" size="40" round={true} />
              <h3>Raj Rajpoot</h3>
            </div>
          </div>
        </div> */}
			</section>
		</>
	);
};

export default RightSidebar;
