// Import dependencies
import { STRATA_PRODUCTION_LOGIN_URL } from "@/utils/productionUrls";

// Home page
const Home = () => {


    return (
        <div className="flex flex-col w-full h-full items-center justify-start text-center p-4">
            <h1 className="text-6xl mt-[20dvh] font-bold text-light-accentText dark:text-dark-accentText">
                <a
                    href={STRATA_PRODUCTION_LOGIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-light-accentText/50 dark:decoration-dark-accentText/50 hover:decoration-light-accentText dark:hover:decoration-dark-accentText transition-colors"
                >
                    Strata OS
                </a>
            </h1>
            <h3 className="text-4xl font-semibold text-light-text-secondary dark:text-dark-text-secondary">
                A University of Alabama CS495 Project
            </h3>
            <p className="mt-2 text-lg font-semibold">
                <a
                    href={STRATA_PRODUCTION_LOGIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-light-accentText dark:hover:text-dark-accentText text-light-text-primary dark:text-dark-text-primary"
                >
                    Open production app (login)
                </a>
            </p>
            <p className="text-xl p-4 font-semibold text-light-text-primary dark:text-dark-text-primary">
                Welcome to our initial project webpage! We are constantly updating this page as our team works dilligently on the Strata OS CS495 project - check back soon to see our progress or browse to see what we have completed so far!
            </p>
        </div>
    )

};

// Export home page for imports
export default Home;