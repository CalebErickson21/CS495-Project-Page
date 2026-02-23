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
            <div className="flex flex-1 flex-col p-4 gap-6 max-w-2xl">
                <section>
                    <h2 className="text-2xl font-bold text-light-accentText dark:text-dark-accentText mb-2">
                        Overview
                    </h2>
                    <p className="text-light-text-secondary dark:text-dark-text-primary">
                        Project documentation and guides will be available here.
                    </p>
                </section>
            </div>

        </div>
    )

}

export default Documentation;
