import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import { Outlet } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestedUser } from "../redux/UserNewSlice";

const Home = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.auth?.user?.user);
	if (user?._id !== undefined) {
		useEffect(() => {
			dispatch(getSuggestedUser(user?._id));
		}, [dispatch, user?._id]);
	}
	const otherUsers = useSelector(
		(state) => state?.auth?.suggestedUser?.otherUsers
	);

	return (
		<>
			<section className='body-container'>
				<Header />
				<section className='container main-container'>
					<LeftSidebar />
					<Outlet />
					<RightSidebar otherUsers={otherUsers} />
				</section>
			</section>
		</>
	);
};

export default Home;
