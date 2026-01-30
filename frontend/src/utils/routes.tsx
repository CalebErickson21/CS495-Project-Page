// Import dependencies
import { createBrowserRouter } from "react-router-dom";

// Import pages
import Layout from "@/pages/layout";
import Home from "@/pages/home";
import Team from "@/pages/team"
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
            {
                path: "/team",
                element: <Team />,
            },
        ],
    },
]);

// Export router
export default router;