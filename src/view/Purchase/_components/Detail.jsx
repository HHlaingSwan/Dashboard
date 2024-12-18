import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";

const Detail = () => {
	const location = useLocation();
	const order = location.state?.order;
	const { id } = useParams(); // Extract the 'id' parameter from the URL

	return (
		<div>
			<h1>Detail</h1>
			<p>Order ID: {id}</p> {/* You can use the 'id' here if needed */}
			<pre>{JSON.stringify(order, null, 2)}</pre>
		</div>
	);
};

export default Detail;
