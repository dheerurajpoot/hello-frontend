import React, { useState, useEffect, useRef } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { postTiming } from "../utils/constant";
import { CiMenuKebab } from "react-icons/ci";
import { deleteUserPost, getUserPosts, postLike } from "../redux/PostNewSlice";
import defaultImg from "../../public/images/default.png";

const Post = ({ post }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.auth?.user?.user);
	const profile = useSelector((state) => state?.auth?.profile?.user);

	const likeHandler = async (id) => {
		dispatch(postLike({ id, userId: user?._id })).then(() => {
			dispatch(getUserPosts());
		});
	};

	const deletePostHandler = async (id) => {
		dispatch(deleteUserPost(id)).then(() => {
			dispatch(getUserPosts());
		});
	};

	// Post 3-dot menu
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Share menu
	const [isShareOpen, setIsShareOpen] = useState(false);
	const shareDropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
			if (
				shareDropdownRef.current &&
				!shareDropdownRef.current.contains(event.target)
			) {
				setIsShareOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const toggleShareMenu = () => {
		setIsShareOpen(!isShareOpen);
	};

	const generateShareUrl = (platform, postId, description) => {
		const baseUrl = window.location.href.split("?")[0]; // Base URL of the current page
		const postUrl = `${baseUrl}?post=${postId}`; // Construct post URL
		const postText = description;

		switch (platform) {
			case "facebook":
				return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
					postUrl
				)}`;
			case "whatsapp":
				return `https://api.whatsapp.com/send?text=${encodeURIComponent(
					postText
				)}%20${encodeURIComponent(postUrl)}`;
			case "linkedin":
				return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
					postUrl
				)}`;
			case "telegram":
				return `https://t.me/share/url?url=${encodeURIComponent(
					postUrl
				)}&text=${encodeURIComponent(postText)}`;
			default:
				return "#";
		}
	};

	return (
		<>
			<div className='social-card'>
				<div className='post-main'>
					<div className='content-top'>
						<Link
							to={`/profile/${post?.userID}`}
							className='post-profile'>
							<Avatar
								src={
									post?.userDetails[0]?.profilePic
										? post?.userDetails[0]?.profilePic
										: defaultImg
								}
								size='40'
								round={true}
							/>
							<div className='post-profile-name'>
								<div className='name'>
									{post?.userDetails[0]?.name}
								</div>
								<span className='time'>
									{postTiming(post.createdAt)}
								</span>
							</div>
						</Link>

						{/* delete post functionality here */}
						<div className='dropdown-container' ref={dropdownRef}>
							<CiMenuKebab
								className='dot-menu'
								size={30}
								onClick={toggleMenu}
							/>
							{isOpen && (
								<div className='dropdown-menu'>
									{user?._id === post?.userID &&
									user?._id === post?.userID ? (
										<a
											href='#'
											onClick={() =>
												deletePostHandler(post?._id)
											}>
											Delete
										</a>
									) : (
										""
									)}
									<a href='#'>Share</a>
								</div>
							)}
						</div>
					</div>

					<div className='content-main'>
						<p className='caption'>{post?.description}</p>
						{post.image && (
							<img
								src={post?.image}
								alt=''
								className='post-img'
							/>
						)}
					</div>

					<div className='interaction'>
						<p
							onClick={() => likeHandler(post?._id)}
							className={
								post.like.includes(user?._id) ? "like" : ""
							}>
							<FaRegHeart
								className='interaction-icons'
								size={22}
							/>
							{post?.like?.length} Love
						</p>
						<p>
							<FaRegCommentDots
								className='interaction-icons'
								size={22}
							/>
							Comment
						</p>
						<div
							className='dropdown-container'
							ref={shareDropdownRef}>
							<p onClick={toggleShareMenu}>
								<FaShare
									className='interaction-icons'
									size={22}
								/>{" "}
								Share
							</p>
							{isShareOpen && (
								<div className='dropdown-menu'>
									<a
										href={generateShareUrl(
											"facebook",
											post?._id,
											post?.description
										)}
										target='_blank'
										rel='noopener noreferrer'>
										Facebook
									</a>
									<a
										href={generateShareUrl(
											"whatsapp",
											post?._id,
											post?.description
										)}
										target='_blank'
										rel='noopener noreferrer'>
										WhatsApp
									</a>
									<a
										href={generateShareUrl(
											"linkedin",
											post?._id,
											post?.description
										)}
										target='_blank'
										rel='noopener noreferrer'>
										LinkedIn
									</a>
									<a
										href={generateShareUrl(
											"telegram",
											post?._id,
											post?.description
										)}
										target='_blank'
										rel='noopener noreferrer'>
										Telegram
									</a>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Post;
