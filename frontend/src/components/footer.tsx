// Import dependencies

// Header component
const Header = () => {


    return (
        <footer className="flex flex-row items-center justify-between text-center bg-light-background dark:bg-dark-background p-2">
            <div className="flex flex-1 justify-center">
                <h1 className="text-xl font-semibold text-light-text-secondary dark:text-dark-text-secondary">
                Strata OS
                </h1>
            </div>

            <div className="flex flex-1 justify-center">
                <h1 className="text-xl font-semibold text-light-text-secondary dark:text-dark-text-secondary">
                CS 495 Capstone Project
                </h1>
            </div>
            
            <div className="flex flex-1 items-center">
                <h1 className="text-xl font-semibold text-light-text-secondary dark:text-dark-text-secondary">
                The University of Alabama
                </h1>
            </div>
        </footer>
    )


};

// Export header for imports
export default Header;