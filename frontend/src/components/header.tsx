// Import dependencies
import { NavLink } from "react-router-dom";

// Header component
const Header = () => {


    return (
        <header className="relative flex flex-row justify-center items-center p-2">

            {/* Left - Logo */}
            <div
            className="absolute left-0 p-4
            text-xl font-semibold
            text-light-text-secondary dark:text-dark-text-secondary">
                Strata
            </div>

            {/* Center - Collabable Navigation Tabs */}
            <nav className="flex flex-row gap-8">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => 
                        `text-xl underline-center ${
                            isActive
                            ? 'active font-extrabold text-light-text-primary dark:text-dark-text-primary'
                            : 'font-semibold hover:font-bold text-light-text-secondary dark:text-dark-text-secondary'
                        }`
                    }
                    aria-current="page">
                    Home
                </NavLink>

                <NavLink
                    to="/construction"
                    end
                    className={({ isActive }) => 
                        `text-xl underline-center ${
                            isActive
                            ? 'active font-extrabold text-light-text-primary dark:text-dark-text-primary'
                            : 'font-semibold hover:font-bold text-light-text-secondary dark:text-dark-text-secondary'
                        }`
                    }
                    aria-current="page">
                    Overview
                </NavLink>

                <NavLink
                    to="/construction"
                    end
                    className={({ isActive }) => 
                        `text-xl underline-center ${
                            isActive
                            ? 'active font-extrabold text-light-text-primary dark:text-dark-text-primary'
                            : 'font-semibold hover:font-bold text-light-text-secondary dark:text-dark-text-secondary'
                        }`
                    }
                    aria-current="page">
                    Documentation
                </NavLink>

                <NavLink
                    to="/construction"
                    end
                    className={({ isActive }) => 
                        `text-xl underline-center ${
                            isActive
                            ? 'active font-extrabold text-light-text-primary dark:text-dark-text-primary'
                            : 'font-semibold hover:font-bold text-light-text-secondary dark:text-dark-text-secondary'
                        }`
                    }
                    aria-current="page">
                    Team
                </NavLink>
            </nav>
            
        </header>
    )


};

// Export header for imports
export default Header;