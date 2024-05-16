import React from "react";
import Avatar from "react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaUserFriends } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { CgFeed } from "react-icons/cg";
import { RiArticleFill } from "react-icons/ri";
import { BiSolidVideos } from "react-icons/bi";
import { HiShoppingBag } from "react-icons/hi2";
import { BsPatchQuestionFill } from "react-icons/bs";
import { MdOutlineFeaturedVideo } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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
								src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
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
					<Link to='/' className='sidebar-menu-item'>
						<FaUserFriends
							className='sidebar-menu-icon'
							size={25}
						/>
						<h3>Friends</h3>
					</Link>
					<Link to='/' className='sidebar-menu-item'>
						<FaNewspaper className='sidebar-menu-icon' size={25} />
						<h3>News</h3>
					</Link>
					<Link to='/' className='sidebar-menu-item'>
						<CgFeed className='sidebar-menu-icon' size={25} />
						<h3>Feeds</h3>
					</Link>
					<Link
						to='https://moneyfeever.com'
						className='sidebar-menu-item'>
						<RiArticleFill
							className='sidebar-menu-icon'
							size={25}
						/>
						<h3>Blog Posts</h3>
					</Link>
					<Link
						to='https://youtube.com'
						className='sidebar-menu-item'>
						<BiSolidVideos
							className='sidebar-menu-icon'
							size={25}
						/>
						<h3>Watch Videos</h3>
					</Link>
					<Link to='https://evtn.org' className='sidebar-menu-item'>
						<HiShoppingBag
							className='sidebar-menu-icon'
							size={25}
						/>
						<h3>Marketplace</h3>
					</Link>
					<Link to='/' className='sidebar-menu-item'>
						<BsPatchQuestionFill
							className='sidebar-menu-icon'
							size={25}
						/>
						<h3>Have a Question</h3>
					</Link>
					<Link
						to='mailto:contact@dheeru.org'
						className='sidebar-menu-item'>
						<MdOutlineFeaturedVideo
							className='sidebar-menu-icon'
							size={25}
						/>
						<h3>Ask for a Feature</h3>
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
