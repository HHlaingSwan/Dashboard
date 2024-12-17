import {
	Box,
	TextField,
	MenuItem,
	Button,
	Typography,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Divider,
	Container,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import axios from "axios"; // Import axios for API calls
import { Link } from "lucide";
import { useNavigate } from "react-router-dom";

const fruits = [
	"apple(s)",
	"banana",
	"orange",
	"grape",
	"watermelon",
	"pineapple",
	"mango",
];

export default function CreateOrderForm() {
	const navigate = useNavigate();
	const [supplier, setSupplier] = useState("");
	const [purchaseDate, setPurchaseDate] = useState(null);
	const [expectedDate, setExpectedDate] = useState(null);
	const [items, setItems] = useState([]);
	const [fruitInput, setFruitInput] = useState("");
	const [additionalCost, setAdditionalCost] = useState([
		{ notes: "", amount: "" },
	]);
	const suppliers = ["Supplier A", "Supplier B", "Supplier C"];
	const [currency, setCurrency] = useState("MMK");

	const totalAmount =
		items.reduce((sum, item) => sum + item.amount, 0) +
		additionalCost.reduce((sum, cost) => sum + Number(cost.amount), 0);

	// // API URL (replace with actual endpoint)
	const API_URL = "https://api.example.com/orders"; // Example API endpoint

	// Format data for API submission
	const getPayload = () => ({
		supplier,
		purchaseDate,
		expectedDate,
		items,
		additionalCost,
		currency,
		totalAmount,
		notes: "", // Add additional notes if needed
	});

	// Function to handle form submission
	const handleSave = async () => {
		// Validation checks
		if (!supplier) {
			alert("Please select a supplier.");
			return;
		}

		if (!purchaseDate) {
			alert("Please select a purchase date.");
			return;
		}

		if (!expectedDate) {
			alert("Please select an expected delivery date.");
			return;
		}

		if (expectedDate.isBefore(purchaseDate)) {
			alert("Expected delivery date cannot be earlier than the purchase date.");
			return;
		}

		if (items.length === 0) {
			alert("Please add at least one item to the order.");
			return;
		}

		if (
			items.some((item) => !item.cost || !item.quantity || item.amount <= 0)
		) {
			alert("All items must have a valid cost, quantity, and amount.");
			return;
		}

		if (additionalCost.some((cost) => cost.amount <= 0)) {
			alert("Additional costs must have valid positive amounts.");
			return;
		}

		if (!currency) {
			alert("Please select a valid currency.");
			return;
		}

		const payload = getPayload();
		console.log("Payload for API:", payload); // Debugging purposes

		try {
			// Send POST request to API
			const response = await axios.post(API_URL, payload);
			console.log("API Response:", response.data);

			// Handle success (e.g., show confirmation, reset form, etc.)
			alert("Order saved successfully!");
		} catch (error) {
			// Handle errors (e.g., show error message)
			console.error("Error saving order:", error);
			alert("Failed to save the order. Please try again.");
		}
	};

	// Handlers
	const handleItemChange = (index, field, value) => {
		const updatedItems = [...items];
		if (field === "cost" || field === "quantity") {
			const numericValue = Math.max(Number(value), 1); // Ensure at least 1
			updatedItems[index][field] = numericValue;
			updatedItems[index].amount =
				updatedItems[index].cost * updatedItems[index].quantity || 0;
		} else {
			updatedItems[index][field] = value;
		}
		setItems(updatedItems);
	};

	const handleDeleteItem = (index) => {
		setItems(items.filter((_, i) => i !== index));
	};

	const handleAddAdditionalCost = () => {
		setAdditionalCost([...additionalCost, { notes: "", amount: "" }]);
	};

	const handleAdditionalCostChange = (index, field, value) => {
		const updatedCosts = [...additionalCost];
		if (field === "amount") {
			const numericValue = Math.max(Number(value), 1); // Ensure positive value
			updatedCosts[index][field] = numericValue;
		} else {
			updatedCosts[index][field] = value;
		}
		setAdditionalCost(updatedCosts);
	};

	const handleDeleteAdditionalCost = (index) => {
		setAdditionalCost(additionalCost.filter((_, i) => i !== index));
	};

	const handleAddFruit = (e) => {
		const selectedFruit = e.target.value;
		if (selectedFruit && !items.some((item) => item.name === selectedFruit)) {
			setItems([
				...items,
				{ name: selectedFruit, cost: 1, quantity: 1, amount: 1 },
			]);
		}
		setFruitInput("");
	};

	const handleClose = () => {
		navigate(-1); // Goes back to the previous route
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: 4,
					p: 3,
				}}>
				{/* Supplier Selection and Date Pickers */}
				<Box
					sx={{
						p: 3,
						backgroundColor: "#f8f9fa",
						borderRadius: 2,
						boxShadow: 2,
						width: "100%",
						maxWidth: 1100,
					}}>
					<TextField
						select
						required
						label='Select Supplier *'
						value={supplier}
						onChange={(e) => setSupplier(e.target.value)}
						fullWidth
						variant='outlined'
						error={supplier === ""}
						sx={{ mb: 3 }}>
						{suppliers.map((option) => (
							<MenuItem
								key={option}
								value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							gap: "20px", // Optional gap between the two boxes
						}}>
						<Box sx={{ flex: "1 1 50%" }}>
							<DatePicker
								label='Purchase Order Date *'
								value={purchaseDate}
								onChange={(newValue) => setPurchaseDate(newValue)}
								renderInput={(params) => (
									<TextField
										{...params}
										fullWidth
									/>
								)}
							/>
						</Box>
						<Box sx={{ flex: "1 1 50%" }}>
							<DatePicker
								label='Expected On *'
								value={expectedDate}
								onChange={(newValue) => setExpectedDate(newValue)}
								renderInput={(params) => (
									<TextField
										{...params}
										fullWidth
									/>
								)}
							/>
						</Box>
					</div>

					<Box sx={{ mt: 2 }}>
						<TextField
							fullWidth
							id='standard-basic'
							label='Notes'
							variant='standard'
						/>
					</Box>
				</Box>

				{/* Item List and Additional Costs */}
				<Box
					sx={{
						p: 3,
						backgroundColor: "#f8f9fa",
						borderRadius: 2,
						boxShadow: 2,
						width: "100%",
						maxWidth: 1100,
					}}>
					<Typography
						variant='h6'
						gutterBottom>
						Item List to Purchase
					</Typography>
					<TableContainer
						component={Paper}
						sx={{ mb: 3 }}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>In Stock</TableCell>
									<TableCell>Purchase Cost</TableCell>
									<TableCell>Quantity</TableCell>
									<TableCell>Amount</TableCell>
									<TableCell>Expired Date</TableCell>
									<TableCell />
								</TableRow>
							</TableHead>
							<TableBody>
								{items.map((item, index) => (
									<TableRow key={index}>
										<TableCell>{item.name}</TableCell>
										<TableCell>{item.inStock}</TableCell>
										<TableCell>
											<TextField
												type='number'
												value={item.cost || ""} // Avoid showing 0 if the cost is 0
												onChange={(e) => {
													const value = Math.max(+e.target.value, 1); // Ensure value is at least 1
													handleItemChange(index, "cost", value);
												}}
												size='small'
												inputProps={{ min: 1 }} // Set minimum value to 1
											/>
										</TableCell>
										<TableCell>
											<TextField
												type='number'
												value={item.quantity || ""} // Avoid showing 0 if the quantity is 0
												onChange={(e) => {
													const value = Math.max(+e.target.value, 1); // Ensure value is at least 1
													handleItemChange(index, "quantity", value);
												}}
												size='small'
												inputProps={{ min: 1 }} // Set minimum value to 1
											/>
										</TableCell>

										<TableCell>{item.amount}</TableCell>
										<TableCell>
											<DatePicker
												value={item.date}
												onChange={(newDate) =>
													handleItemChange(index, "date", newDate)
												}
												renderInput={(params) => (
													<TextField
														{...params}
														size='small'
													/>
												)}
											/>
										</TableCell>
										<TableCell>
											<IconButton
												onClick={() => handleDeleteItem(index)}
												color='error'>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						<Divider />
						<Box sx={{ mt: 2, px: 2 }}>
							<TextField
								select
								label='Type in or select'
								value={fruitInput}
								onChange={handleAddFruit}
								fullWidth
								variant='standard'
								sx={{ mb: 3 }}>
								{fruits.map((fruit) => (
									<MenuItem
										style={{ fontSize: "1rem" }}
										key={fruit}
										value={fruit}>
										{fruit}
									</MenuItem>
								))}
							</TextField>
						</Box>
					</TableContainer>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1, // Space between the icon and text
							m: 3, // Margin around the Box
							cursor: "pointer", // Make the Box visually interactive
						}}>
						<IconButton
							onClick={handleAddAdditionalCost}
							color='primary'
							sx={{
								p: 1, // Padding around the icon to make it more clickable
								borderRadius: "50%", // Rounded button for a more modern look
								backgroundColor: "#f0f4f8", // Light background for the button
								"&:hover": {
									backgroundColor: "#e0e7f1", // Darken the background on hover
								},
							}}>
							<AddCircleOutlineIcon sx={{ fontSize: 28 }} />
						</IconButton>
						<Typography
							variant='subtitle1'
							sx={{ fontWeight: 500, color: "#333" }}>
							Add Additional Cost
						</Typography>
					</Box>

					{additionalCost.map((cost, index) => (
						<Box
							key={index}
							sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
							<TextField
								label='Notes'
								value={cost.notes}
								onChange={(e) =>
									handleAdditionalCostChange(index, "notes", e.target.value)
								}
								size='small'
								fullWidth
							/>
							<TextField
								label='Amount'
								type='number'
								value={cost.amount}
								onChange={(e) => {
									const value = Math.max(Number(e.target.value), 1);
									handleAdditionalCostChange(index, "amount", value);
								}}
								size='small'
								inputProps={{ min: 1 }}
								error={cost.amount <= 0}
							/>

							<IconButton
								onClick={() => handleDeleteAdditionalCost(index)}
								color='error'>
								<DeleteIcon />
							</IconButton>
						</Box>
					))}

					<Divider sx={{ mb: 2 }} />
					<Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
						<Typography variant='h6'>Total</Typography>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<TextField
								select
								label='Currency'
								value={currency}
								onChange={(e) => setCurrency(e.target.value)}
								size='small'
								sx={{ width: "100px" }}>
								<option value='MMK'>MMK</option>
								<option value='USD'>USD</option>
							</TextField>
							<Typography
								variant='h6'
								style={{ width: "100px", textAlign: "right" }}>
								{totalAmount || 0}
							</Typography>
						</Box>
					</Box>
					<Box sx={{ display: "flex", gap: 2 }}>
						<Button
							variant='contained'
							color='primary'
							startIcon={<AddCircleOutlineIcon />}
							onClick={handleSave}>
							Save
						</Button>
						<Button
							variant='outlined'
							onClick={handleClose}>
							Close
						</Button>
					</Box>
				</Box>
			</Box>
		</LocalizationProvider>
	);
}
