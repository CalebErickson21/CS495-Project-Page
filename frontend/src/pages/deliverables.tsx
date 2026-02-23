import initialPresentation from '@/assets/presentation1.pptx'

const Deliverables = () => {

    return (
        <div className="flex flex-1 flex-col md:flex-row p-2">

            {/* Left / top */}
            <div className="flex flex-1 flex-col justify-center items-center text-center">
                <h1 className="p-2 text-6xl font-bold text-light-accentText dark:text-dark-accentText">
                    Strata OS
                </h1>
                <h3 className="p-2 text-4xl font-semibold text-light-text-secondary dark:text-dark-text-primary">
                    A University of Alabama CS495 Project
                </h3>
            </div>

            {/* Right / bottom */}
            <div className="flex flex-1 flex-col justify-center items-center text-center p-4">
                <h3 className="p-2 text-xl font-semibold text-light-text-secondary dark:text-dark-text-primary">
                    Download our project deliverables below.
                </h3>
                <a
                    href={initialPresentation}
                    download="Strata-OS-Preliminary-Presentation.pptx"
                    className="px-2 py-1 rounded-lg bg-accent/50 text-light-text-secondary dark:text-dark-text-secondary font-semibold transition duration-200"
                >
                    Download Presentation
                </a>
            </div>

        </div>
    )

}

export default Deliverables;