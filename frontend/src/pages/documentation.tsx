// Documentation page

const Documentation = () => {

    return (
        <div className="flex flex-1 flex-col md:flex-row p-2">

            {/* Left / top - branding */}
            <div className="flex flex-1 flex-col justify-center items-center text-center">
                <h1 className="p-2 text-6xl font-bold text-light-accentText dark:text-dark-accentText">
                    Strata OS
                </h1>
                <h3 className="p-2 text-4xl font-semibold text-light-text-secondary dark:text-dark-text-primary">
                    A University of Alabama CS495 Project
                </h3>
            </div>

            {/* Right / bottom - doc content */}
            <div className="flex flex-1 flex-col justify-center items-center p-4 gap-6">
                <section className="w-full max-w-2xl text-center">
                    <h2 className="text-2xl font-bold text-light-accentText dark:text-dark-accentText mb-2">
                        Overview
                    </h2>
                    <p className="p-2 text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                        Documentation includes sensitive information about deployment, VM configurations, and other details
                        that could lead to vulnerability risks.
                    </p>
                    <p className="p-2 text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                        For access, please contact a group member to get access to the following GitHub link:{" "}
                        <a
                            href="https://github.com/doncha-poj/Strata-OS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-light-accentText dark:hover:text-dark-accentText"
                        >
                            https://github.com/doncha-poj/Strata-OS
                        </a>
                    </p>
                    <p className="p-2 text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                        Within that repository, all documentation can be found in the project-root `README.md` and the
                        `documentation/` directory.
                    </p>
                </section>
            </div>

        </div>
    )

}

export default Documentation;
