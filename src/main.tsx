import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import Providers from "./providers/index.tsx";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router/index.tsx";

createRoot(document.getElementById("root")!).render(
	<Providers>
		<RouterProvider router={Router} />
		<ToastContainer
			theme="colored"
			position="bottom-right"
			closeOnClick
			autoClose={1500}
		/>
	</Providers>
);
