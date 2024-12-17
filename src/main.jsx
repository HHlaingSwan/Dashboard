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
