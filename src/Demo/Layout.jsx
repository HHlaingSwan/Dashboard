import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
	return (
		<div className='flex flex-col min-h-screen w-[95%] justify-center ml-[3%] '>
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;
