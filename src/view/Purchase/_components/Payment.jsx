import { Typography } from "@mui/material";
import React from "react";

import { useLocation, useParams } from "react-router-dom";

const Payment = () => {
	const { id } = useParams(); // Extract the 'id' parameter from the URL
	const location = useLocation();
	const order = location.state?.order;

	const items = [
		{
			name: "Shirt(Small)",
			quantity: 100,
			purchaseCost: 8000,
			amount: 800000,
		},
		{
			name: "Shirt(Medium)",
			quantity: 100,
			purchaseCost: 8000,
			amount: 800000,
		},
		{
			name: "Shirt(Large)",
			quantity: 100,
			purchaseCost: 8000,
			amount: 800000,
		},
	];

	const deliveryCharges = 25000;
	const totalAmount =
		items.reduce((acc, item) => acc + item.amount, 0) + deliveryCharges;

	return (
		<>
			<div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
				<div style={{ textAlign: "center", marginBottom: "30px" }}>
					<h1 style={{ color: "#2d3e50", fontSize: "32px" }}>Payment</h1>

					<p style={{ fontSize: "18px", color: "#555" }}>
						Order ID: <strong>{id}</strong>
					</p>
				</div>

				<div style={{ marginBottom: "20px" }}>
					<Typography></Typography>
				</div>

				<div>
					<h2
						style={{
							color: "#2d3e50",
							fontSize: "24px",
							marginBottom: "10px",
						}}>
						Items
					</h2>
					<table
						border='1'
						style={{
							width: "100%",
							borderCollapse: "collapse",
							marginBottom: "20px",
							border: "1px solid #ddd",
						}}>
						<thead style={{ backgroundColor: "#f4f4f4" }}>
							<tr>
								<th style={{ padding: "10px", textAlign: "left" }}>Item</th>
								<th style={{ padding: "10px", textAlign: "left" }}>
									Expired date
								</th>
								<th style={{ padding: "10px", textAlign: "left" }}>Quantity</th>
								<th style={{ padding: "10px", textAlign: "left" }}>
									Purchase Cost
								</th>
								<th style={{ padding: "10px", textAlign: "left" }}>Amount</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item, index) => (
								<tr key={index}>
									<td
										style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
										{item.name}
									</td>
									<td
										style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
										10/10/2024
									</td>{" "}
									{/* Example expiry date */}
									<td
										style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
										{item.quantity}
									</td>
									<td
										style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
										{item.purchaseCost}
									</td>
									<td
										style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
										{item.amount}
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div style={{ marginBottom: "20px" }}>
						<h3
							style={{
								color: "#2d3e50",
								fontSize: "20px",
								marginBottom: "10px",
							}}>
							Additional Cost
						</h3>
						<table
							border='1'
							style={{
								width: "100%",
								borderCollapse: "collapse",
								border: "1px solid #ddd",
							}}>
							<thead style={{ backgroundColor: "#f4f4f4" }}>
								<tr>
									<th style={{ padding: "10px", textAlign: "left" }}>Amount</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td
										style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
										{deliveryCharges}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div
						style={{ fontSize: "20px", fontWeight: "bold", color: "#2d3e50" }}>
						<p>
							Total: <span style={{ color: "#FF5733" }}>{totalAmount} MMK</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Payment;
