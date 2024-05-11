import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { FaFacebookMessenger } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FaRegUserCircle } from "react-icons/fa";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { TbLogout2 } from "react-icons/tb";
import { BsPatchQuestionFill } from "react-icons/bs";
import { MdOutlineFeaturedVideo } from "react-icons/md";

const Header = () => {
	const user = useSelector((store) => store?.auth?.user?.user);
	const [isOpen, setIsOpen] = React.useState(false);
	const navigate = useNavigate();
	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};
	const logoutHandler = async () => {
		try {
			const res = await axios.get(`${USER_API_END_POINT}/logout`);
			if (res.data.success) {
				toast.success(res.data.message);
			}
			navigate("/login");
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	};

	return (
		<>
			<section className='header-section'>
				<div className='header container'>
					<div className='header-logo'>
						<div className='logo'>
							<Link to={"/"} className='logo-link'>
								<img src='./../../images/hello.png' alt='' />
							</Link>
						</div>
					</div>
					{/* mobile menu */}
					<div className='header-mobile-profile header-profile'>
						<Link>
							<FaSearch
								className='header-mobile-search'
								size={25}
							/>
						</Link>
						<div className='hamburger'>
							<CgMenuGridO
								onClick={toggleDrawer}
								className='header-menu-icon hamburger close-menu'
								size={35}
							/>
						</div>
						<Drawer
							open={isOpen}
							onClose={toggleDrawer}
							direction='right'
							className='bla bla bla'>
							<div className='hello-drawer'>
								<div className='drawer-header'>
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
									<TbLogout2
										className='sidebar-menu-icon'
										size={25}
									/>
									<h3>Log Out</h3>
								</Link>
							</div>
						</Drawer>
					</div>
					<div className='header-searchbox'>
						<form className='header-search'>
							<input type='text' placeholder='Serch Here' />
							<i className='fa-solid fa-magnifying-glass'></i>
						</form>
					</div>
					<div className='header-menu'>
						<Link to={"/"}>
							<div className='menu-icons'>
								<FaHome
									className='header-menu-icon'
									size={25}
								/>
							</div>
						</Link>
						<div className='menu-icons'>
							<BiSolidVideos
								className='header-menu-icon'
								size={25}
							/>
						</div>
						<div className='menu-icons'>
							<FaFacebookMessenger
								className='header-menu-icon'
								size={25}
							/>
						</div>
						<div className='menu-icons'>
							<IoNotifications
								className='header-menu-icon'
								size={25}
							/>
						</div>
						<Link
							to={`/profile/${user?._id}`}
							className='header-profile'>
							<Avatar
								src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
								size='40'
								round={true}
							/>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default Header;
