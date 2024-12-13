import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SalesOrderList from "./components/SaleOrderList";
import Home from "./Pages/Home";
import Provider from "./Provider";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			// {
			// 	index: true,
			// 	element: <Home />,
			// },
			{
				path: "/Dashboard",
				element: <Dashboard />,
			},
			{
				path: "/Sales-Order",
				element: <SalesOrderList />,
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
