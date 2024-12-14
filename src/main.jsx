import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SalesOrderList from "./Pages/SaleOrderList";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Provider from "./Provider";
import Parchase from "./Pages/Parchase";
import Inventory from "./Pages/Inventroy";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/Purchase",
				element: <Parchase />,
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
