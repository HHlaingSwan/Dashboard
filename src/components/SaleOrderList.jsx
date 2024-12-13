import React, { useState, useContext, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Checkbox,
	Typography,
	Button,
	IconButton,
	TextField,
	Grid2,
	Pagination,
	Box,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DataContext } from "../Context/DataContext";

const SalesOrderList = () => {
	const { data } = useContext(DataContext);

	const [statusCounts, setStatusCounts] = useState({
		Total: 0,
		Pending: 0,
		Success: 0,
		Delivered: 0,
		Canceled: 0,
		Others: 0,
	});

	// States for pagination and search
	const [page, setPage] = useState(1);
	const [selectedOrders, setSelectedOrders] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(2);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredData, setFilteredData] = useState(data);

	// Filter data based on search query
	useEffect(() => {
		const filtered = data.filter((order) => {
			// Ensure `buyer` and `town` are defined before calling toLowerCase
			const buyer = order.buyerFirstName
				? order.buyerFirstName.toLowerCase()
				: ""; // Default to empty string if undefined
			const town = order.townshipNameAlias
				? order.townshipNameAlias.toLowerCase()
				: ""; // Default to empty string if undefined

			return (
				order.id.toString().includes(searchQuery) ||
				buyer.includes(searchQuery) ||
				town.includes(searchQuery)
			);
		});
		setFilteredData(filtered); // Set filtered data
	}, [searchQuery, data]); // Re-run when searchQuery or data changes

	// Handle page change
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	// Handle rows per page change
	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(event.target.value);
	};

	// Get paginated data
	const paginatedData = filteredData.slice(
		(page - 1) * rowsPerPage,
		page * rowsPerPage
	);

	// Handle search query change
	const handleSearchQueryChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const calculateStatusCounts = (orders) => {
		const counts = {
			Total: orders.length,
			Pending: 0,
			Success: 0,
			Selected: 0,
			Delivered: 0,
			Canceled: 0,
			Others: 0,
		};
		orders.forEach((order) => {
			switch (order.status) {
				case "Pending":
					counts.Pending++;
					break;
				case "Success":
					counts.Success++;
					break;
				case "Selected":
					counts.Selected++;
					break;
				case "Delivered":
					counts.Delivered++;
					break;
				case "Canceled":
					counts.Canceled++;
					break;
				default:
					counts.Others++;
					break;
			}
		});
		setStatusCounts(counts); // Update state with new counts
	};

	useEffect(() => {
		calculateStatusCounts(filteredData); // Recalculate status counts whenever filteredData changes
	}, [filteredData]); // Recalculate counts when filteredData changes

	// Handle select/deselect all checkboxes
	const handleSelectAll = (event, data) => {
		if (event.target.checked) {
			// Select all orders across all pages
			const selectedIds = data.map((order) => order.id);
			setSelectedOrders(selectedIds); // Select all orders in the filtered data
		} else {
			// Deselect all orders across all pages
			setSelectedOrders([]);
		}
	};
	// Handle individual checkbox selection
	const handleSelectOne = (event, orderId) => {
		if (event.target.checked) {
			setSelectedOrders((prevSelected) => [...prevSelected, orderId]);
		} else {
			setSelectedOrders((prevSelected) =>
				prevSelected.filter((id) => id !== orderId)
			);
		}
	};

	// Check if all orders across all pages are selected
	const isAllSelected =
		filteredData.length > 0 && selectedOrders.length === filteredData.length;

	return (
		<div style={{ padding: "20px" }}>
			<Grid2
				container
				spacing={2}
				alignItems='center'
				justifyContent='space-between'>
				<Grid2 item>
					<Typography variant='h6'>Sales Order List</Typography>
					<Typography variant='subtitle2'>The list of sales orders!</Typography>
				</Grid2>
				<Grid2 item>
					<IconButton>
						<DownloadIcon />
					</IconButton>
				</Grid2>
			</Grid2>

			<Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
				<TextField
					label='Search'
					fullWidth
					placeholder='Search e.g. Sale Order ID, Buyer name, Seller name, Buyer phone, etc.'
					style={{ margin: "20px 0" }}
					value={searchQuery}
					onChange={handleSearchQueryChange}
				/>
				<FilterListIcon style={{ margin: "20px 0" }} />
			</Box>

			<Grid2
				container
				spacing={2}
				style={{ marginBottom: "10px" }}>
				{[
					{ label: "Total", count: statusCounts.Total },
					{ label: "Pending", count: statusCounts.Pending || 0 },
					{ label: "Success", count: statusCounts.Success || 0 },
					{ label: "Select", count: statusCounts.Select || 0 },
					{ label: "Delivered", count: statusCounts.Delivered || 0 },
					{ label: "Canceled", count: statusCounts.Canceled || 0 },
					{ label: "Others", count: statusCounts.Others || 0 },
				].map((item, index) => (
					<Grid2
						key={index}
						item>
						<Button
							variant='outlined'
							color='primary'>
							{item.count} {item.label}
						</Button>
					</Grid2>
				))}
			</Grid2>

			<TableContainer
				component={Paper}
				style={{ maxWidth: "100%", overflowX: "auto" }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell padding='checkbox'>
								<Checkbox
									onClick={(e) => handleSelectAll(e, paginatedData)}
									checked={isAllSelected}
								/>
							</TableCell>
							<TableCell>Order ID</TableCell>
							<TableCell>Order Date</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Buyer</TableCell>
							<TableCell>Town</TableCell>
							<TableCell>Quantity</TableCell>
							<TableCell>Grand Total</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedData.map((order) => (
							<TableRow key={order.id}>
								<TableCell padding='checkbox'>
									<Checkbox
										checked={selectedOrders.includes(order.id)}
										onChange={(e) => handleSelectOne(e, order.id)}
									/>
								</TableCell>
								<TableCell>{order.id}</TableCell>
								<TableCell>
									{new Date(order.createdOn).toLocaleDateString("en-US")}
								</TableCell>
								<TableCell
									style={{
										backgroundColor:
											order.status === "Pending" ? "orange" : "green", // Apply color based on status
									}}>
									{order.status}
								</TableCell>
								<TableCell>{order.buyerFirstName}</TableCell>
								<TableCell>{order.townshipNameAlias}</TableCell>
								<TableCell>{order.sellQuantity}</TableCell>
								<TableCell>{order.stockQty}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination */}
			<Grid2
				container
				justifyContent='space-between'
				alignItems='center'
				style={{ marginTop: "20px" }}>
				<Typography variant='body2'>Rows per page:</Typography>
				<select
					value={rowsPerPage}
					onChange={handleRowsPerPageChange}
					style={{ padding: "5px", fontSize: "14px" }}>
					<option value={10}>10</option>
					<option value={25}>25</option>
					<option value={50}>50</option>
				</select>
				<Pagination
					count={Math.ceil(filteredData.length / rowsPerPage)}
					page={page}
					onChange={handleChangePage}
					variant='outlined'
					shape='rounded'
				/>
			</Grid2>
		</div>
	);
};

export default SalesOrderList;
