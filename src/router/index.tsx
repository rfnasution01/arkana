import DashboardPage from "@/pages/dashboard";
import NotFoundPage from "@/pages/not-found";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <DashboardPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
