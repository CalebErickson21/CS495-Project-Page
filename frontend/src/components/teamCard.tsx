// Import dependencies
import { useState } from "react";

// Import props
import type { TeamCardProps } from '@/utils/types.ts'

// Import images
import BlankUser from '@/assets/blankUser.jpg'

// Team Card
const TeamCard = ({ id, image, name, title, description, portfolio, linkedin, expanded, setExpanded }: TeamCardProps) => {

    // States
    const [hover, setHover] = useState(false)

    const handleExpandButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (id === expanded) {
            setExpanded(0);
        }
        else {
            setExpanded(id)
        }
    }

    return (
        <div
        className="
        flex flex-row w-full px-4 py-2
        bg-light-surface dark:bg-dark-surface
        rounded-xl
        hover:brightness-95
        transition duration-300 ease-in-ease-out"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        >
            {/* Left Image */}
            <div className="aspect-square items-center justify-center">
                <img
                src={image === "" ? BlankUser : image}
                className="max-h-[12dvh] w-full rounded-full object-cover"
                alt={`Profile picture of ${name}`}
                >
                </img>

            
            </div>

            {/* Right Information */}
            <div
            className="flex flex-1 flex-col items-center justify-center"
            >
                <h1
                className={`
                text-2xl font-bold
                ${hover || expanded === id ? "text-light-accentText dark:text-dark-accentText [text-shadow:0_0_1px]" : "text-light-text-primary dark:text-dark-text-primary"}
                transition duration-300 ease-in-ease-out
                `}>
                    {name}
                </h1>
                <h3
                className="text-xl font-semibold text-light-text-secondary dark:text-dark-text-secondary">
                    {title}
                </h3>

                {/* Expanded content */}
                {expanded === id &&
                    <div className="flex flex-col gap-2 w-full">
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">
                            {description}
                        </p>

                        <div className="flex flex-row gap-4 w-full justify-center items-end p-2">
                            {/* Portfolio button */}
                            {portfolio !== "" && (
                                <button className="
                                px-2 py-1 rounded-lg 
                                bg-accent/50
                                text-light-text-secondary dark:text-dark-text-secondary font-semibold
                                transition duration-200">
                                    <a
                                    href={portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    Portfolio
                                    </a>
                                </button>
                            )}
                            
                            {/* Linkedin button */}
                            {linkedin !== "" && (
                                <button className="
                                px-2 py-1 rounded-lg 
                                bg-accent/50
                                text-light-text-secondary dark:text-dark-text-secondary font-semibold
                                transition duration-200">
                                    <a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener norefferer"
                                    >
                                        LinkedIn
                                    </a>
                                </button>
                            )}

                        </div>
                    </div>
                }

                {/* Expand button */}
                <button
                type="button"
                onClick={(e) => (handleExpandButton(e))}
                className="self-center p-0.5 -ml-0.5 rounded hover:bg-black/5 dark:hover:bg-black/20 transition"
                aria-expanded={expanded === id}
                aria-label={expanded === id ? "Collapse" : "Expand"}
                >
                    <svg
                        className={`w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary transition-transform duration-300 ${expanded === id ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

        </div>
    )
}

export default TeamCard;