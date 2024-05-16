import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import PrivateRoute from "./utils/PrivateRoutes";

const AppRoutes = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}>
						<Route index element={<Main />} />
						<Route
							path='profile/:id'
							element={
								<PrivateRoute>
									<Profile />
								</PrivateRoute>
							}
						/>
					</Route>
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
					<Route
						path='chat/'
						element={
							<PrivateRoute>
								<Chat />
							</PrivateRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default AppRoutes;
