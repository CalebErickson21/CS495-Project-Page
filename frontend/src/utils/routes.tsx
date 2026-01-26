// Import dependencies
import { createBrowserRouter } from "react-router-dom";

// Import pages
import Layout from "@/pages/layout";
import Home from "@/pages/home";
import Construction from "@/pages/construction";


const router = createBrowserRouter([
    {
    path: "/",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Home />,
        },
        {
            path: "/construction",
            element: <Construction />,
        },
        ],
    },
]);

// Export router
export default router;