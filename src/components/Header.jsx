import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { FaFacebookMessenger } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";

const Header = () => {
	const { user } = useSelector((store) => store?.auth?.user?.user);
	const [mobileMenu, setMobileMenu] = useState(true);

	return (
		<>
			<section>
				<div className='header'>
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
							{mobileMenu ? (
								<CgMenuGridO
									onClick={() => setMobileMenu(false)}
									className='header-menu-icon hamburger open-menu'
									size={35}
								/>
							) : (
								<IoClose
									onClick={() => setMobileMenu(true)}
									className='header-menu-icon hamburger close-menu'
									size={35}
								/>
							)}
						</div>
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
