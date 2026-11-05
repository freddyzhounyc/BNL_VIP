import { useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import TimelineCard, { type Milestone } from "./components/TimelineCard";
import "./Timeline.css";

type EraId = Milestone["era"] | "all";

const eras: { id: EraId; label: string }[] = [
    { id: "all", label: "All Eras" },
    { id: "pioneering", label: "Pioneering 1947–1960" },
    { id: "synchrotron", label: "Synchrotron Light 1980s" },
    { id: "heavy-ion", label: "Heavy Ion Collider (2000s)" },
    { id: "eic", label: "EIC Frontier (2030+)" },
];

const milestones: Milestone[] = [
    {
        id: "bnl-founded",
        year: "1947",
        tag: "Founding",
        title: "Brookhaven National Laboratory Established",
        text: "Brookhaven is founded on Long Island as a home for fundamental scientific research.",
        era: "pioneering",
        side: "left",
    },
    {
        id: "cosmotron",
        year: "1952",
        tag: "Cosmotron",
        title: "The Cosmotron Accelerates Protons to 3.3 GeV",
        text: "The Cosmotron becomes the first accelerator to push protons past 1 GeV, reaching 3.3 GeV.",
        era: "pioneering",
        side: "right",
    },
    {
        id: "ags",
        year: "1960",
        tag: "AGS",
        title: "Alternating Gradient Synchrotron (AGS) First Beam",
        text: "The AGS delivers its first beam and opens a higher energy range for particle physics.",
        era: "pioneering",
        side: "left",
    },
    {
        id: "nsls",
        year: "1982",
        tag: "Synchrotron Light",
        title: "National Synchrotron Light Source (NSLS)",
        text: "NSLS begins providing bright X-ray and ultraviolet beams for research across disciplines.",
        era: "synchrotron",
        side: "right",
    },
    {
        id: "rhic",
        year: "2000",
        tag: "RHIC Revolution",
        title: "Relativistic Heavy Ion Collider (RHIC) First Collisions",
        text: "RHIC starts colliding heavy ions and recreates the quark-gluon plasma of the early universe.",
        era: "heavy-ion",
        side: "left",
    },
    {
        id: "nsls-ii",
        year: "2014",
        tag: "Next-Gen Light",
        title: "NSLS-II Ultra-Bright Light Source Commissioned",
        text: "NSLS-II comes online as Brookhaven's next-generation ultra-bright synchrotron light source.",
        era: "synchrotron",
        side: "right",
    },
    {
        id: "sphenix",
        year: "2023",
        tag: "sPHENIX",
        title: "sPHENIX Detector Collects First Collision Data",
        text: "The sPHENIX detector begins recording heavy-ion collisions at RHIC.",
        era: "heavy-ion",
        side: "left",
    },
    {
        id: "eic",
        year: "2030+",
        tag: "Future Frontier",
        title: "The Electron-Ion Collider (EIC)",
        text: "The EIC is planned as BNL's next collider, built to study the inner structure of nuclear matter.",
        era: "eic",
        side: "right",
    },
];

const Timeline = () => {
    const [era, setEra] = useState<EraId>("all");
    const visibleMilestones = milestones.filter((milestone) =>
        era === "all" || milestone.era === era
    );

    return (
        <main className="timeline-page">
            <PageHeader
                eyebrow="Historical Chronology • 1947 to the Future"
                title="BNL Timeline"
                description="Journey through more than seven decades of accelerator innovation at Brookhaven National Lab, from the pioneering Cosmotron to the AGS, RHIC, and the upcoming Electron-Ion Collider (EIC)."
            />

            <div className="filter-row" role="group" aria-label="Filter by era">
                {eras.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        className={
                            option.id === era
                                ? "filter-chip filter-chip--active"
                                : "filter-chip"
                        }
                        aria-pressed={option.id === era}
                        onClick={() => setEra(option.id)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div className="timeline-board">
                <div className="timeline-board__line" aria-hidden="true" />
                <ol className="timeline-list">
                    {visibleMilestones.map((milestone) => (
                        <li
                            key={milestone.id}
                            className={`timeline-item timeline-item--${milestone.side}`}
                        >
                            <TimelineCard milestone={milestone} />
                            <span className="timeline-item__marker" aria-hidden="true" />
                        </li>
                    ))}
                </ol>
            </div>
        </main>
    );
};

export default Timeline;
