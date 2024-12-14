import React, { useState, useContext, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Button,
	IconButton,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
} from "@mui/material";
import { DataContext } from "../Context/DataContext";
import Pagination from "@mui/material/Pagination";
import { DateTime } from "luxon";

const Parchase = () => {
	const { data } = useContext(DataContext);

	// States for filtering, pagination, and search
	const [status, setStatus] = useState(""); // Filter by status
	const [supplierSearch, setSupplierSearch] = useState(""); // Filter by supplier
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(2);
	const [filteredData, setFilteredData] = useState(data);

	// Filter data based on `status` and `supplierSearch`
	useEffect(() => {
		const filtered = data.filter((order) => {
			const matchesStatus = !status || order.status === status;
			const matchesSupplier =
				!supplierSearch ||
				order.buyerFirstName
					?.toLowerCase()
					.includes(supplierSearch.toLowerCase()) ||
				order.townshipNameAlias
					?.toLowerCase()
					.includes(supplierSearch.toLowerCase());

			return matchesStatus && matchesSupplier;
		});
		setFilteredData(filtered); // Update filtered data
	}, [status, supplierSearch, data]); // Re-run filtering when `status`, `supplierSearch`, or `data` changes

	// Handle page change
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	// Handle rows per page change
	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(Number(event.target.value));
	};

	// Handle status filter change
	const handleStatusChange = (event) => {
		setStatus(event.target.value);
	};

	// Handle supplier search change
	const handleSupplierSearchChange = (event) => {
		setSupplierSearch(event.target.value);
	};

	// Get paginated data
	const paginatedData = filteredData.slice(
		(page - 1) * rowsPerPage,
		page * rowsPerPage
	);

	return (
		<div style={{ padding: "20px" }}>
			<Typography
				variant='h6'
				gutterBottom>
				Purchase Order
			</Typography>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "10px",
					justifyContent: "space-between",
				}}>
				<Button variant='contained'>Create</Button>
				<div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
					<TextField
						variant='standard'
						label='Search Supplier'
						value={supplierSearch}
						onChange={handleSupplierSearchChange}
					/>
					<FormControl
						variant='standard'
						sx={{ m: 1, minWidth: 150 }}>
						<InputLabel id='status-select-label'>Status</InputLabel>
						<Select
							labelId='status-select-label'
							id='status-select'
							value={status}
							onChange={handleStatusChange}
							label='Status'>
							<MenuItem value=''>All</MenuItem>
							<MenuItem value='Pending'>Pending</MenuItem>
							<MenuItem value='Closed'>Closed</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>

			<TableContainer
				component={Paper}
				style={{
					marginTop: "20px",
					overflowX: "auto",
					borderRadius: "10px",
					boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
				}}>
				<div style={{ overflowX: "auto" }}>
					<Table style={{ minWidth: "1000px", borderCollapse: "collapse" }}>
						<TableHead>
							<TableRow style={{ backgroundColor: "#4CAF50" }}>
								{[
									"Order ID",
									"Order Date",
									"Status",
									"Buyer",
									"Town",
									"Quantity",
									"Price",
									"Detail Created",
									"Page Name",
								].map((header) => (
									<TableCell
										key={header}
										style={{
											color: "#fff",
											fontWeight: "bold",
											textAlign: "center",
											padding: "10px",
										}}>
										{header}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{paginatedData.map((order) => (
								<TableRow
									key={order.id}
									style={{
										backgroundColor: "#f9f9f9",
										transition: "background-color 0.3s ease",
										cursor: "pointer",
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.backgroundColor = "#f1f1f1")
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.backgroundColor = "#f9f9f9")
									}>
									<TableCell style={{ textAlign: "center" }}>
										{order.salesId}
									</TableCell>
									<TableCell style={{ textAlign: "center" }}>
										{DateTime.fromISO(order.detailCreatedOn).toLocaleString({
											day: "numeric",
											month: "numeric",
											year: "numeric",
											hour: "numeric",
											minute: "2-digit",
										})}
									</TableCell>
									<TableCell
										style={{
											textAlign: "center",
											backgroundColor:
												order.status === "Pending" ? "orange" : "gray",
											color: "#fff",
											fontWeight: "bold",
										}}>
										{order.status}
									</TableCell>
									<TableCell style={{ textAlign: "center" }}>
										{order.buyerFirstName}
									</TableCell>
									<TableCell style={{ textAlign: "center" }}>
										{order.townshipNameAlias}
									</TableCell>
									<TableCell style={{ textAlign: "center" }}>
										{order.sellQuantity}
									</TableCell>
									<TableCell style={{ textAlign: "center" }}>
										{order.price}
									</TableCell>
									<TableCell style={{ textAlign: "center" }}>
										{order.pageName}
									</TableCell>
									<TableCell style={{ textAlign: "center" }}>
										{DateTime.fromISO(order.createdOn).toLocaleString({
											day: "numeric",
											month: "numeric",
											year: "numeric",
											hour: "numeric",
											minute: "2-digit",
										})}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</TableContainer>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginTop: "20px",
				}}>
				<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
					<Typography variant='body2'>Rows per page:</Typography>
					<select
						value={rowsPerPage}
						onChange={handleRowsPerPageChange}
						style={{ padding: "5px", fontSize: "14px" }}>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={25}>25</option>
					</select>
				</div>
				<Pagination
					count={Math.ceil(filteredData.length / rowsPerPage)}
					page={page}
					onChange={handleChangePage}
					variant='outlined'
					shape='rounded'
				/>
			</div>
		</div>
	);
};

export default Parchase;
