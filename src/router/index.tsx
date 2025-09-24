import Homepage from "@/pages/homepage";
import MainLayout from "@/pages/layout";
import NotFoundPage from "@/pages/not-found";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "",
				element: <Homepage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
