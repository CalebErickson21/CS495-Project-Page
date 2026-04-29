// Import dependencies
import { STRATA_PRODUCTION_LOGIN_URL } from "@/utils/productionUrls";

// Overview page
const Overview = () => {

    return (
        <div className="flex flex-1 flex-col md:flex-row p-2">

            {/* Left / top */}
            <div className="flex flex-1 flex-col justify-center items-center text-center">
                <h1 className="p-2 text-6xl font-bold text-light-accentText dark:text-dark-accentText">
                    <a
                        href={STRATA_PRODUCTION_LOGIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-light-accentText/50 dark:decoration-dark-accentText/50 hover:decoration-light-accentText dark:hover:decoration-dark-accentText transition-colors"
                    >
                        Strata OS
                    </a>
                </h1>
                <h3 className="p-2 text-4xl font-semibold text-light-text-secondary dark:text-dark-text-primary">
                    A University of Alabama CS495 Project
                </h3>
            </div>

            {/* Right / bottom */}
            <div className="flex flex-1 flex-col justify-center items-center text-center p-2">
                <p className="p-2 text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                The Strata OS project aims to design a clean, scalable operating system that gives Strata Capital Group real-time financial clarity and operational control. Students will help standardize and organize existing business data, eliminate duplication, and define clear sources of truth across projects, budgets, forecasts, and capital flows. The end goal is to build an executive-level scoreboard that instantly shows whether the business is on track, supported by a simple weekly operating rhythm that enables faster decisions, better cash management, and consistent project execution across Strata’s growing real estate portfolio.
                </p>
            </div>

        </div>
    )

}

export default Overview;