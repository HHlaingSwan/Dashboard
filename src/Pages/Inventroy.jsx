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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	LinearProgress,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { DateTime } from "luxon";
import { DataContext } from "../Context/DataContext";
const Inventroy = () => {
	const { data } = useContext(DataContext);

	// States for filtering, pagination, sorting, and search
	const [status, setStatus] = useState("");
	const [supplierSearch, setSupplierSearch] = useState("");
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [filteredData, setFilteredData] = useState([]);
	const [sortedData, setSortedData] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

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
		setFilteredData(filtered);
	}, [status, supplierSearch, data]);

	// Sort data based on the selected column and direction
	useEffect(() => {
		const sorted = [...filteredData];
		if (sortConfig.key) {
			sorted.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? 1 : -1;
				}
				return 0;
			});
		}
		setSortedData(sorted);
	}, [sortConfig, filteredData]);

	// Reset page on filter or rows-per-page change
	useEffect(() => {
		setPage(1);
	}, [filteredData, rowsPerPage]);

	// Handle page change
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	// Handle rows per page change
	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(Number(event.target.value));
	};

	// Get paginated data
	const paginatedData = sortedData.slice(
		(page - 1) * rowsPerPage,
		page * rowsPerPage
	);

	// Sort columns handler
	const handleSort = (column) => {
		let direction = "asc";
		if (sortConfig.key === column && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key: column, direction });
	};

	return (
		<div
			style={{
				padding: "20px",
				backgroundColor: "#f5f7fa",
				height: "100vh", // Full viewport height
				overflow: "hidden", // Prevent scrolling
				display: "flex",
				flexDirection: "column",
			}}>
			<Typography
				variant='h5'
				style={{
					fontWeight: "bold",
					marginBottom: "20px",
					color: "#333",
					textAlign: "center",
				}}>
				Purchase Orders
			</Typography>

			{/* Filters Section */}
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "15px",
					marginBottom: "20px",
				}}>
				<Button
					variant='contained'
					style={{
						backgroundColor: "#1976d2",
						color: "#fff",
						textTransform: "none",
						padding: "8px 16px",
					}}>
					Create New Order
				</Button>
				<div style={{ display: "flex", gap: "15px" }}>
					<TextField
						variant='standard'
						label='Search Supplier'
						value={supplierSearch}
						onChange={(e) => setSupplierSearch(e.target.value)}
					/>
					<FormControl
						variant='standard'
						style={{ minWidth: 150 }}>
						<InputLabel>Status</InputLabel>
						<Select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							label='Status'>
							<MenuItem value=''>All</MenuItem>
							<MenuItem value='Pending'>Pending</MenuItem>
							<MenuItem value='Closed'>Closed</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>

			{/* Table Section */}
			<TableContainer
				component={Paper}
				style={{
					borderRadius: "10px",
					boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
				}}>
				<Table>
					<TableHead
						style={{
							background: "linear-gradient(90deg, #1976d2, #42a5f5)",
						}}>
						<TableRow>
							{[
								"ID",
								"Order ID",
								"Order Date",
								"Status",
								"Buyer",
								"Town",
								"Progress",
								"Price",
								"Page Name",
								"Detail Created",
							].map((header) => (
								<TableCell
									key={header}
									style={{
										color: "#fff",
										fontWeight: "bold",
										textAlign: "center",
										whiteSpace: "nowrap",
										cursor: "pointer",
									}}
									onClick={() =>
										handleSort(header.toLowerCase().replace(/\s+/g, ""))
									}>
									{header}
									{sortConfig.key ===
										header.toLowerCase().replace(/\s+/g, "") && (
										<span>
											{sortConfig.direction === "asc" ? " 🔼" : " 🔽"}
										</span>
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					{/* Table Body */}
					<TableBody>
						{paginatedData.map((order, index) => (
							<TableRow
								key={`${order.id}-${index}`}
								style={{
									backgroundColor: "#fff",
									transition: "background-color 0.3s ease",
									cursor: "pointer",
								}}
								onMouseEnter={(e) =>
									(e.currentTarget.style.backgroundColor = "#f0f4ff")
								}
								onMouseLeave={(e) =>
									(e.currentTarget.style.backgroundColor = "#fff")
								}>
								<TableCell style={{ textAlign: "center" }}>
									{index + 1}
								</TableCell>
								<TableCell style={{ textAlign: "center" }}>
									{order.salesId}
								</TableCell>
								<TableCell style={{ textAlign: "center" }}>
									{DateTime.fromISO(order.detailCreatedOn || "").toLocaleString(
										DateTime.DATETIME_MED
									)}
								</TableCell>
								<TableCell
									style={{
										textAlign: "center",
										color: order.status === "Pending" ? "#ffa726" : "#66bb6a",
										fontWeight: "bold",
									}}>
									{order.status}
								</TableCell>
								<TableCell style={{ textAlign: "center" }}>
									{order.buyerFirstName || "N/A"}
								</TableCell>
								<TableCell style={{ textAlign: "center" }}>
									{order.townshipNameAlias || "N/A"}
								</TableCell>

								<TableCell style={{ textAlign: "center" }}>
									{order.quantity > 0 ? (
										<>
											<LinearProgress
												variant='determinate'
												value={(order.quantity / (order.stockQty || 1)) * 100}
												sx={{ height: 10, borderRadius: 5 }}
											/>
											<Typography
												variant='body2'
												style={{ textAlign: "center", marginTop: "5px" }}>
												{`${order.quantity} of ${order.stockQty || 1}`}
											</Typography>
										</>
									) : (
										<Typography variant='body2'>N/A</Typography>
									)}
								</TableCell>
								<TableCell style={{ textAlign: "center" }}>
									{order.price || "N/A"}
								</TableCell>
								<TableCell style={{ textAlign: "center" }}>
									{order.pageName || "N/A"}
								</TableCell>
								<TableCell style={{ textAlign: "center" }}>
									{DateTime.fromISO(order.createdOn || "").toLocaleString(
										DateTime.DATETIME_MED
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination Section */}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginTop: "20px",
				}}>
				<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
					<Typography variant='body2'>Rows per page:</Typography>
					<FormControl>
						<Select
							value={rowsPerPage}
							onChange={handleRowsPerPageChange}
							variant='standard'>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={25}>25</MenuItem>
						</Select>
					</FormControl>
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

export default Inventroy;
