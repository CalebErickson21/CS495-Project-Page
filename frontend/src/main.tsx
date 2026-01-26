// Import Dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// Import routes
import router from "@/utils/routes";

// Import styles
import "@/index.css";

// Render the app
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
				<RouterProvider router={router} />
	</React.StrictMode>
);