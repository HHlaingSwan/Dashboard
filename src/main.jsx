import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./view/Dashboard/Dashboard";
import Inventory from "./view/Inventroy/Inventroy";
import Purchase from "./view/Purchase/Purchase";
import SalesOrderList from "./Pages/SaleOrderList";
import CreateOrderForm from "./view/Purchase/CreateOrderFrom";
import Provider from "./Context/DataContext";
import Detail from "./view/Purchase/_components/Detail";
import Reveice from "./view/Purchase/_components/Receive";
import Edit from "./view/Purchase/_components/Edit";
import CRUDorder from "./view/Purchase/_components/CRUDorder";
import Payment from "./view/Purchase/_components/Payment";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/Purchase",
				element: <Purchase />,
			},
			{
				path: "/Dashboard",
				element: <Dashboard />,
			},
			{
				path: "/Sales-Order",
				element: <SalesOrderList />,
			},
			{
				path: "/Inventory",
				element: <Inventory />,
			},
			{
				path: "create-order",
				element: <CreateOrderForm />,
			},
			{
				path: "/Purchase/:id/", // Parent route
				element: <CRUDorder />,
				children: [
					{
						index: true, // Default route
						element: <Detail />,
					},
					{
						path: "/Purchase/:id/detail", // Child route
						element: <Detail />,
					},
					{
						path: "/Purchase/:id/receive", // Child route
						element: <Reveice />,
					},
					{
						path: "/Purchase/:id/edit", // Child route
						element: <Edit />,
					},
					{
						path: "/Purchase/:id/payment", // Child route
						element: <Payment />,
					},
				],
			},
		],
	},
]);
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
