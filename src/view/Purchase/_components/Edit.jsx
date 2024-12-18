import React from "react";
import { useLocation, useParams } from "react-router-dom";

const Edit = () => {
	const { id } = useParams(); // Extract the 'id' parameter from the URL
	const location = useLocation();
	const order = location.state?.order;
	return (
		<div>
			<h1>Edit</h1>
			<p>Order ID: {id}</p> {/* You can use the 'id' here if needed */}
			<pre>{JSON.stringify(order, null, 2)}</pre>
		</div>
	);
};

export default Edit;