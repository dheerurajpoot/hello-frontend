import React from "react";
import Avatar from "react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaUserFriends } from "react-icons/fa";
import { CgFeed } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsPatchQuestionFill } from "react-icons/bs";
import { MdOutlineFeaturedVideo } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import defaultImg from "/images/default.png";

const LeftSidebar = () => {
	const user = useSelector((state) => state.auth?.user?.user);

	const navigate = useNavigate();

	const logoutHandler = () => {
		setTimeout(() => {
			navigate("/login");
		}, 600);
		localStorage.clear();
		if (res.data.success) {
			toast.success(res.data.message);
		}
	};

	return (
		<>
			<section className='left-sidebar'>
				<div className='left-sidebar-profileCard'>
					<div className='left-sidebar-profile'>
						<div className='sidebar-profile-img'>
							<Avatar
								className='left-sidebar-profile-icon'
								src={
									user?.profilePic
										? user?.profilePic
										: defaultImg
								}
								size='50'
								round={true}
							/>
						</div>
						<Link
							to={`/profile/${user?._id}`}
							className='sidebar-profile'>
							<div className='user-username'>
								<h3>{user?.name}</h3>
								<span>{`@${user?.username}`}</span>
							</div>
						</Link>
					</div>
				</div>
				<div className='left-sidebar-menu'>
					<Link
						to={`/profile/${user?._id}`}
						className='sidebar-menu-item'>
						<FaRegUserCircle
							className='sidebar-menu-icon'
							size={25}
						/>
						<h3>Profile</h3>
					</Link>
					<Link to='/friends' className='sidebar-menu-item'>
						<FaUserFriends
							className='sidebar-menu-icon'
							size={25}
						/>
						<h3>Friends</h3>
					</Link>
					<Link to='/' className='sidebar-menu-item'>
						<CgFeed className='sidebar-menu-icon' size={25} />
						<h3>Feeds</h3>
					</Link>
					<Link to='/help-support' className='sidebar-menu-item'>
						<BsPatchQuestionFill
							className='sidebar-menu-icon'
							size={25}
						/>
						<h3>Help & Support</h3>
					</Link>
					<Link to='/ask-for-feature' className='sidebar-menu-item'>
						<MdOutlineFeaturedVideo
							className='sidebar-menu-icon'
							size={25}
						/>
						<h3>Ask for a Feature</h3>
					</Link>
					<Link
						to='/request-password-reset'
						className='sidebar-menu-item'>
						<RiLockPasswordFill
							className='sidebar-menu-icon'
							size={25}
						/>
						<h3>Resest Password</h3>
					</Link>
					<Link
						to='/'
						onClick={logoutHandler}
						className='sidebar-menu-item'>
						<TbLogout2 className='sidebar-menu-icon' size={25} />
						<h3>Log Out</h3>
					</Link>
				</div>
			</section>
		</>
	);
};

export default LeftSidebar;
