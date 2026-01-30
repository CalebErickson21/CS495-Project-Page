// Import dependencies
import { useState } from "react";

// Import components
import TeamCard from '@/components/teamCard'

// Import images
import CalebHeadshot from '@/assets/calebHeadshot.jpg'

// Team Page
const Team = () => {

    // Declare team information to pass to each card
    const teamCardInfo = 
    [
        // Caleb
        {
            id: 1,
            image: CalebHeadshot,
            name: "Caleb Erickson",
            title: "Incoming SWE Intern @ CGI",
            description: "Caleb Erickson is a senior Computer Science student at the University of Alabama (STEM to MBA, 4.0 GPA, 2027 graduation) focused on bridging AI research, software engineering, and business strategy. He builds scalable AI systems and full-stack applications that translate cutting-edge research into real-world impact.",
            portfolio: "https://caleberickson21.github.io/",
            linkedin: "https://www.linkedin.com/in/-caleb-erickson/",
        },
        // Brett
        {
            id: 2,
            image: "",
            name: "TODO",
            title: "TODO",
            description: "TODO",
            portfolio: "",
            linkedin: "",
        },
        // Joshua
        {
            id: 3,
            image: "",
            name: "TODO",
            title: "TODO",
            description: "TODO",
            portfolio: "",
            linkedin: "",
        },
        // Donald
        {
            id: 4,
            image: "",
            name: "TODO",
            title: "TODO",
            description: "TODO",
            portfolio: "",
            linkedin: "",
        },
        // Daniel
        {
            id: 5,
            image: "",
            name: "TODO",
            title: "TODO",
            description: "TODO",
            portfolio: "",
            linkedin: "",
        },
    ]

    // States
    const [expanded, setExpanded] = useState<number | null>(null);

    return (
        <div className="flex flex-1 flex-col lg:flex-row">

            {/* Left / Top */}
            <div
            className="flex flex-1 flex-col items-center justify-center text-center px-8 py-8">
                <h1 className="text-4xl font-bold text-light-accentText dark:text-dark-accentText px-2">
                    Meet Our Team
                </h1>
                <h3 className="text-2xl font-bold text-light-text-secondary dark:text-dark-text-secondary p-2">
                Learn more about the Strata OS team and feel free to reach out for feedback,
                improvements, or collaboration.
                </h3>
            </div>

            {/* Right / Bottom */}
            <div className="flex flex-1 flex-col gap-3 w-full items-center justify-center text-center px-12 py-6">
                {
                    teamCardInfo.map((m) => (
                        <TeamCard
                            key={m.id}
                            id={m.id}
                            image={m.image || ''}
                            name={m.name}
                            title={m.title}
                            description={m.description}
                            portfolio={m.portfolio || ''}
                            linkedin={m.linkedin || ''}
                            expanded={expanded}
                            setExpanded={setExpanded}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Team;