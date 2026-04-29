// Documentation page (under construction)

import { STRATA_PRODUCTION_LOGIN_URL } from "@/utils/productionUrls";

const Construction = () => {

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
            <div className="flex flex-1 flex-col justify-center items-center text-center p-4">
                <h3 className="p-2 text-xl font-semibold text-light-text-secondary dark:text-dark-text-primary">
                    Under Construction
                </h3>
            </div>

        </div>
    )

}

export default Construction;
