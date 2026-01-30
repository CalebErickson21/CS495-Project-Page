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
            <div className="flex flex-1 flex-col justify-center items-center text-center p-2">
                <h3 className="p-2 text-xl font-medium text-light-text-secondary dark:text-dark-text-primary max-w-md">
                    Download our project deliverables below.
                </h3>
                <a
                    href={initialPresentation}
                    download="Strata-OS-Preliminary-Presentation.pptx"
                    className="rounded-lg bg-light-accent dark:bg-dark-accent px-6 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
                >
                    Download Presentation
                </a>
            </div>

        </div>
    )

}

export default Deliverables;