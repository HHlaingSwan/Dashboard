import React, { useState, useEffect } from "react";
import { Container, Typography, Tab, Tabs } from "@mui/material";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";

const CRUDorder = () => {
	const { id } = useParams(); // Extract the 'id' parameter from the URL
	const navigate = useNavigate();
	const location = useLocation(); // Use useLocation to access the current location
	const [activeTab, setActiveTab] = useState(0);

	const order = location.state?.order; // Access the order object from state

	// Handle tab change when a tab is clicked
	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	// Handle navigation when a tab is clicked
	const handleNavigation = (path) => {
		navigate(path, { state: { order } });
	};

	// Update active tab based on the current path
	useEffect(() => {
		const path = location.pathname;
		if (path.includes("/detail")) {
			setActiveTab(0);
		} else if (path.includes("/receive")) {
			setActiveTab(1);
		} else if (path.includes("/edit")) {
			setActiveTab(2);
		} else if (path.includes("/payment")) {
			setActiveTab(3);
		}
	}, [location.pathname]); // Update when the path changes

	return (
		<Container>
			<Typography
				variant='h4'
				sx={{ marginBottom: 2 }}>
				Purchase Order
			</Typography>
			<Tabs
				value={activeTab}
				onChange={handleTabChange}
				aria-label='order tabs'
				sx={{ marginBottom: 2 }}>
				<Tab
					label='DETAIL'
					onClick={() => handleNavigation(`/purchase/${id}/detail`)}
				/>
				<Tab
					label='RECEIVE'
					onClick={() => handleNavigation(`/purchase/${id}/receive`)}
				/>
				<Tab
					label='EDIT'
					onClick={() => handleNavigation(`/purchase/${id}/edit`)}
				/>
				<Tab
					label='PAYMENT'
					onClick={() => handleNavigation(`/purchase/${id}/payment`)}
				/>
			</Tabs>
			<Outlet />
		</Container>
	);
};

export default CRUDorder;
