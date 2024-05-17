import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
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
import { getAllUsers } from "../redux/UserNewSlice";
import { RiLockPasswordFill } from "react-icons/ri";

const Header = () => {
	const user = useSelector((state) => state?.auth?.user?.user);
	const [isOpen, setIsOpen] = React.useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
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

	// search

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	const [searchQuery, setSearchQuery] = useState("");
	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};
	const allUser = useSelector((state) => state?.auth?.allUsers?.allUsers);
	const filteredUsers = allUser?.filter((user) =>
		user?.name.toLowerCase().includes(searchQuery.toLowerCase())
	);
	const resetSearch = (id) => {
		navigate(`/profile/${id}`);
		setSearchQuery("");
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

					<div className='header-searchbox'>
						<form className='header-search'>
							<input
								type='text'
								placeholder='Serch Here'
								value={searchQuery}
								onChange={handleSearchChange}
							/>
							<i className='fa-solid fa-magnifying-glass'></i>
						</form>
						<div className='search-users'>
							{searchQuery && (
								<div>
									{filteredUsers.map((user, index) => (
										<div
											className='search-users-details'
											key={index}>
											<Link
												to={`/profile/${user?._id}`}
												className='search-users-name'
												onClick={() =>
													resetSearch(user?._id)
												}>
												{user?.name}
											</Link>
										</div>
									))}
								</div>
							)}
						</div>
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
							<Link to={"/friends"}>
								<FaUserFriends
									className='header-menu-icon'
									size={25}
								/>
							</Link>
						</div>
						<div className='menu-icons'>
							<Link to={"/chat"}>
								<FaFacebookMessenger
									className='header-menu-icon'
									size={25}
								/>
							</Link>
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
					<div className='header-mobile-profile header-profile'>
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
							className=''>
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
									to='/request-password-reset'
									className='sidebar-menu-item'>
									<RiLockPasswordFill
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
				</div>
			</section>
		</>
	);
};

export default Header;
