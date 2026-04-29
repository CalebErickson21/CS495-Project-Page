// Documentation page — keep src/assets/documentation/*.md in sync with Strata-OS prod repo copies before deploy.

import { useState } from "react";

import installDeployMd from "@/assets/documentation/install_deploy.md?url";
import howToUseMd from "@/assets/documentation/how_to_use.md?url";
import modifyAndExtendMd from "@/assets/documentation/modify_and_extend.md?url";
import faqsMd from "@/assets/documentation/frequently_asked_questions.md?url";
import testCasesMd from "@/assets/documentation/test_cases.md?url";
import { STRATA_PRODUCTION_LOGIN_URL } from "@/utils/productionUrls";

type DocItem = {
    title: string;
    completedBy: string;
    href: string;
    download: string;
};

const DOC_ITEMS: DocItem[] = [
    {
        title: "How to install / deploy software",
        completedBy: "Caleb Erickson",
        href: installDeployMd,
        download: "Strata-OS-Install-Deploy.md",
    },
    {
        title: "How to use each completed feature",
        completedBy: "Daniel Igbokwe",
        href: howToUseMd,
        download: "Strata-OS-How-To-Use.md",
    },
    {
        title: "How to modify / extend software",
        completedBy: "Josh Keane",
        href: modifyAndExtendMd,
        download: "Strata-OS-Modify-And-Extend.md",
    },
    {
        title: "FAQs",
        completedBy: "Brett Waldvogel",
        href: faqsMd,
        download: "Strata-OS-FAQs.md",
    },
    {
        title: "Testing / test cases",
        completedBy: "Donald Chanthirath",
        href: testCasesMd,
        download: "Strata-OS-Test-Cases.md",
    },
];

const Documentation = () => {
    const [docsOpen, setDocsOpen] = useState(false);

    return (
        <div className="flex flex-1 flex-col md:flex-row p-2">
            {/* Left / top - branding */}
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

            {/* Right / bottom - doc content */}
            <div className="flex flex-1 flex-col justify-center p-4 gap-6 max-w-2xl">
                <section className="w-full text-center md:text-left">
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
                    <p className="p-2 text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                        For CS495, we have included the necessary documentation on this site as well. Download each guide
                        in the section below.
                    </p>
                    <h3 className="px-2 pt-2 text-xl font-bold text-light-accentText dark:text-dark-accentText">
                        Who completed each document
                    </h3>
                    <ul className="list-none space-y-2 px-2 pb-2 text-left text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                        {DOC_ITEMS.map((item) => (
                            <li key={item.download}>
                                <span className="text-light-text-primary dark:text-dark-text-primary">{item.title}</span>
                                <span className="text-light-text-secondary dark:text-dark-text-secondary">
                                    {" "}
                                    — completed by {item.completedBy}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-light-accentText dark:text-dark-accentText mb-2 text-center md:text-left">
                        Technical documentation (download)
                    </h2>

                    <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-sm">
                        <button
                            type="button"
                            onClick={() => setDocsOpen((prev) => !prev)}
                            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-black/5 dark:hover:bg-black/20 transition"
                            aria-expanded={docsOpen}
                            aria-controls="technical-docs-panel"
                        >
                            <span className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                                Markdown guides
                            </span>
                            <svg
                                className={`w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary transition-transform duration-300 ${docsOpen ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {docsOpen && (
                            <div
                                id="technical-docs-panel"
                                className="border-t border-light-border dark:border-dark-border px-4 py-3 space-y-4 text-center md:text-left"
                            >
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                    Download copies of the project documentation files.
                                </p>
                                <ul className="list-none space-y-3 text-light-text-secondary dark:text-dark-text-primary">
                                    {DOC_ITEMS.map((item) => (
                                        <li key={item.download}>
                                            <div className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                                                {item.title}
                                            </div>
                                            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">
                                                Completed by {item.completedBy}
                                            </div>
                                            <a
                                                href={item.href}
                                                download={item.download}
                                                className="underline hover:text-light-accentText dark:hover:text-dark-accentText text-base"
                                            >
                                                Download ({item.download})
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Documentation;
