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

const Post = ({ post }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.auth?.user?.user);
	const profile = useSelector((state) => state?.auth?.profile?.user);

	const likeHandler = async (id) => {
		dispatch(postLike({ id, userId: user?._id })).then(() => {
			dispatch(getUserPosts());
		});
	};
	// delete post
	const deletePostHandler = async (id) => {
		dispatch(deleteUserPost(id)).then(() => {
			dispatch(getUserPosts());
		});
	};

	// post sharing
	const sharePostHandler = () => {
		if (navigator.share) {
			navigator
				.share({
					title: "Check out this post",
					text: post.description,
					url: window.location.href,
				})
				.then(() => console.log("Shared successfully"))
				.catch((error) => console.error("Error sharing:", error));
		} else {
			alert("Sharing is not supported in this browser.");
		}
	};

	// post 3 dot menu
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
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

	return (
		<>
			<div className='social-card'>
				<div className='post-main'>
					<div className='content-top'>
						<Link
							to={`/profile/${post?.userID}`}
							className='post-profile'>
							<Avatar
								src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'
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
						<p onClick={sharePostHandler}>
							<FaShare className='interaction-icons' size={22} />{" "}
							Share
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Post;
