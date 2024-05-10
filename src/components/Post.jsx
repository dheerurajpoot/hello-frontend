import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import axios from "axios";
import { POST_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../redux/postSlice";
import { postTiming } from "../utils/constant";
import { toast } from "react-toastify";

const Post = ({ post }) => {
	const user = useSelector((state) => state?.auth?.user?.user);

	const likeHandler = async (id) => {
		try {
			const res = await axios.put(
				`${POST_API_END_POINT}/like/${id}`,
				{ id: user?._id },
				{
					withCredentials: true,
				}
			);
			if (res.data.success) {
				toast.success(res.data.message);
			}
			dispatch(setRefresh());
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	};
	// delete post
	const deletePostHandler = async (id) => {
		try {
			axios.defaults.withCredentials = true;
			const res = await axios.delete(
				`${POST_API_END_POINT}/delete/${id}`
			);
			if (res.data.success) {
				toast.success(res.data.message);
			}
			dispatch(setRefresh());
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	};

	// Implement your post sharing functionality here
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

						{user?._id === post?.userID && (
							<div
								onClick={() => deletePostHandler(post?._id)}
								className='delete-post'>
								<button>Delete</button>
							</div>
						)}
					</div>

					<div className='content-main'>
						<p className='caption'>{post?.description}</p>
						{/* {post.image && <img src={post.image} alt="" className="post-img" />} */}
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
