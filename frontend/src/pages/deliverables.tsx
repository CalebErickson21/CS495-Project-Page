import { useState } from "react";
import initialPresentation from '@/assets/initialPresentation.pptx'
import projectBacklog from '@/assets/projectBacklog.pdf'
import sprint1Slides from '@/assets/sprint1/sprint1.pptx'
import sprint1Backlog from '@/assets/sprint1/sprint1Backlog.docx'
import sprint1Planning from '@/assets/sprint1/sprint1Planning.docx'
import sprint1Retro from '@/assets/sprint1/sprint1Retrospective.docx'
import sprint2Slides from '@/assets/sprint2/sprint2.pptx'
import sprint2Backlog from '@/assets/sprint2/sprint2Backlog.pdf'
import sprint2Planning from '@/assets/sprint2/sprint2Planning.pdf'
import sprint3Backlog from '@/assets/sprint3/sprint3Backlog.docx'
import sprint3Planning from '@/assets/sprint3/sprint3Planning.docx'

const Deliverables = () => {

    const [openSection, setOpenSection] = useState<null | "initial" | "sprint1" | "sprint2" | "sprint3">(null);

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
            <div className="flex flex-1 flex-col justify-center p-4 gap-6 max-w-2xl">
                <section>
                    <h2 className="text-2xl font-bold text-light-accentText dark:text-dark-accentText mb-2 text-center md:text-left">
                        Overall Project Deliverables
                    </h2>

                    <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-sm">
                        <button
                            type="button"
                            onClick={() => setOpenSection(prev => prev === "initial" ? null : "initial")}
                            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-black/5 dark:hover:bg-black/20 transition"
                            aria-expanded={openSection === "initial"}
                            aria-controls="initial-presentation-panel"
                        >
                            <span className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                                Overall Project Deliverables
                            </span>
                            <svg
                                className={`w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary transition-transform duration-300 ${openSection === "initial" ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {openSection === "initial" && (
                            <div
                                id="initial-presentation-panel"
                                className="border-t border-light-border dark:border-dark-border px-4 py-3 space-y-2 text-center md:text-left"
                            >
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                    Core project-wide deliverables for Strata OS.
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-light-text-secondary dark:text-dark-text-primary">
                                    <li>
                                        <a
                                            href={initialPresentation}
                                            download="Strata-OS-Preliminary-Presentation.pptx"
                                            className="underline hover:text-light-accentText dark:hover:text-dark-accentText"
                                        >
                                            Initial Project Presentation
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={projectBacklog}
                                            download="Strata-OS-Project-Backlog.pdf"
                                            className="underline hover:text-light-accentText dark:hover:text-dark-accentText"
                                        >
                                            Overall Project Backlog
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-light-accentText dark:text-dark-accentText mb-2 text-center md:text-left">
                        Sprint Deliverables
                    </h2>

                    <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-sm">
                        <button
                            type="button"
                            onClick={() => setOpenSection(prev => prev === "sprint1" ? null : "sprint1")}
                            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-black/5 dark:hover:bg-black/20 transition"
                            aria-expanded={openSection === "sprint1"}
                            aria-controls="sprint1-panel"
                        >
                            <span className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                                Sprint 1
                            </span>
                            <svg
                                className={`w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary transition-transform duration-300 ${openSection === "sprint1" ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {openSection === "sprint1" && (
                            <div
                                id="sprint1-panel"
                                className="border-t border-light-border dark:border-dark-border px-4 py-3 space-y-2"
                            >
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                    Sprint 1 planning, backlog, presentation, and retrospective documents.
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-light-text-secondary dark:text-dark-text-primary">
                                    <li>
                                        <a
                                            href={sprint1Slides}
                                            download="Strata-OS-Sprint1-Presentation.pptx"
                                            className="underline hover:text-light-accentText dark:hover:text-dark-accentText"
                                        >
                                            Sprint 1 Presentation
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={sprint1Backlog}
                                            download="Strata-OS-Sprint1-Backlog.docx"
                                            className="underline hover:text-light-accentText dark:hover:text-dark-accentText"
                                        >
                                            Sprint 1 Backlog
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={sprint1Planning}
                                            download="Strata-OS-Sprint1-Planning.docx"
                                            className="underline hover:text-light-accentText dark:hover:text-dark-accentText"
                                        >
                                            Sprint 1 Planning
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={sprint1Retro}
                                            download="Strata-OS-Sprint1-Retrospective.docx"
                                            className="underline hover:text-light-accentText dark:hover:text-dark-accentText"
                                        >
                                            Sprint 1 Retrospective
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-sm mt-3">
                        <button
                            type="button"
                            onClick={() => setOpenSection(prev => prev === "sprint2" ? null : "sprint2")}
                            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-black/5 dark:hover:bg-black/20 transition"
                            aria-expanded={openSection === "sprint2"}
                            aria-controls="sprint2-panel"
                        >
                            <span className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                                Sprint 2
                            </span>
                            <svg
                                className={`w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary transition-transform duration-300 ${openSection === "sprint2" ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {openSection === "sprint2" && (
                            <div
                                id="sprint2-panel"
                                className="border-t border-light-border dark:border-dark-border px-4 py-3 space-y-2"
                            >
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                    Sprint 2 planning, backlog, and presentation documents.
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-light-text-secondary dark:text-dark-text-primary">
                                    <li>
                                        <a
                                            href={sprint2Slides}
                                            download="Strata-OS-Sprint2-Presentation.pptx"
                                            className="underline hover:text-light-accentText dark:hover:text-dark-accentText"
                                        >
                                            Sprint 2 Presentation
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={sprint2Backlog}
                                            download="Strata-OS-Sprint2-Backlog.pdf"
                                            className="underline hover:text-light-accentText dark:hover:text-dark-accentText"
                                        >
                                            Sprint 2 Backlog
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={sprint2Planning}
                                            download="Strata-OS-Sprint2-Planning.pdf"
                                            className="underline hover:text-light-accentText dark:hover:text-dark-accentText"
                                        >
                                            Sprint 2 Planning
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-sm mt-3">
                        <button
                            type="button"
                            onClick={() => setOpenSection(prev => prev === "sprint3" ? null : "sprint3")}
                            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-black/5 dark:hover:bg-black/20 transition"
                            aria-expanded={openSection === "sprint3"}
                            aria-controls="sprint3-panel"
                        >
                            <span className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                                Sprint 3
                            </span>
                            <svg
                                className={`w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary transition-transform duration-300 ${openSection === "sprint3" ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {openSection === "sprint3" && (
                            <div
                                id="sprint3-panel"
                                className="border-t border-light-border dark:border-dark-border px-4 py-3 space-y-2"
                            >
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                    Sprint 3 backlog and planning documents.
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-light-text-secondary dark:text-dark-text-primary">
                                    <li>
                                        <a
                                            href={sprint3Backlog}
                                            download="Strata-OS-Sprint3-Backlog.docx"
                                            className="underline hover:text-light-accentText dark:hover:text-dark-accentText"
                                        >
                                            Sprint 3 Backlog
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={sprint3Planning}
                                            download="Strata-OS-Sprint3-Planning.docx"
                                            className="underline hover:text-light-accentText dark:hover:text-dark-accentText"
                                        >
                                            Sprint 3 Planning
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            </div>

        </div>
    )

}

export default Deliverables;