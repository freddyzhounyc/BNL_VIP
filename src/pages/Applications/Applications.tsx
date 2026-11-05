import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import StudyCard, { type Study } from "./components/StudyCard";
import "./Applications.css";

type DisciplineId = Study["discipline"] | "all";

const disciplines: { id: DisciplineId; label: string }[] = [
    { id: "all", label: "All Disciplines" },
    { id: "nuclear", label: "Nuclear Medicine" },
    { id: "energy", label: "Clean Energy & Materials" },
    { id: "space", label: "Space Exploration" },
    { id: "quantum", label: "Quantum & Microelectronics" },
    { id: "biology", label: "Structural Biology" },
];

type Stat = {
    id: string;
    value: string;
    label: string;
};

type Transfer = {
    id: string;
    capability: string;
    facility: string;
    transfer: string;
    impact: string;
};

const stats: Stat[] = [
    { id: "nobels", value: "07", label: "Nobel Prizes related to BNL physics" },
    { id: "spect", value: "80%+", label: "Of SPECT scans in the U.S." },
    { id: "temperature", value: "4.0T °C", label: "Quark-gluon plasma temperature scale" },
    { id: "visitors", value: "2,500+", label: "Annual visiting scientists and partners" },
    { id: "open", value: "—", label: "Text goes here" },
];

const studies: Study[] = [
    {
        id: "isotopes",
        discipline: "nuclear",
        tag: "Nuclear Medicine & Health",
        title: "Diagnostic Isotopes for Cancer Care",
        text: "Placeholder summary of how accelerator-produced isotopes support medical imaging and treatment.",
        tone: "cyan",
    },
    {
        id: "batteries",
        discipline: "energy",
        tag: "Clean Energy & Materials",
        title: "Atomic-Resolution Imaging of Energy Materials",
        text: "Placeholder summary of how light-source imaging guides longer-lived battery materials.",
        tone: "amber",
    },
    {
        id: "astronauts",
        discipline: "space",
        tag: "Space Exploration & Safety",
        title: "Protecting Astronauts Beyond Earth",
        text: "Placeholder summary of how accelerator radiation studies inform shielding for deep-space travel.",
        tone: "violet",
    },
    {
        id: "quantum",
        discipline: "quantum",
        tag: "Quantum & Microelectronics",
        title: "High-Coherence Quantum Devices",
        text: "Placeholder summary of how accelerator science supports quantum sensors and devices.",
        tone: "cyan",
    },
    {
        id: "lithography",
        discipline: "quantum",
        tag: "Microelectronics & Nanofabrication",
        title: "Extreme-Ultraviolet Lithography",
        text: "Placeholder summary of how accelerator light sources support advanced chip fabrication.",
        tone: "amber",
    },
    {
        id: "proteins",
        discipline: "biology",
        tag: "Structural Biology & Drug Discovery",
        title: "Deciphering Viral Protein Structures",
        text: "Placeholder summary of how crystallography at BNL light sources reveals the structure of disease-related proteins.",
        tone: "violet",
    },
];

const transfers: Transfer[] = [
    {
        id: "magnets",
        capability: "Superconducting magnet technology",
        facility: "RHIC magnet lattice",
        transfer: "Clinical MRI systems",
        impact: "Medical imaging",
    },
    {
        id: "isotopes",
        capability: "Radioisotope production",
        facility: "Brookhaven Linac Isotope Producer (BLIP)",
        transfer: "Diagnostic imaging agents",
        impact: "Cancer detection and treatment",
    },
    {
        id: "batteries",
        capability: "Materials characterization",
        facility: "National Synchrotron Light Source II",
        transfer: "Longer-lived energy storage",
        impact: "Clean energy",
    },
    {
        id: "nmr",
        capability: "High-field magnet specifications",
        facility: "Superconducting magnet R&D",
        transfer: "NMR instruments",
        impact: "Drug discovery and materials science",
    },
];

const Applications = () => {
    const [discipline, setDiscipline] = useState<DisciplineId>("all");
    const visibleStudies = studies.filter((study) =>
        discipline === "all" || study.discipline === discipline
    );

    return (
        <main className="applications">
            <PageHeader
                eyebrow="Scientific Discovery & Real-World Impact"
                title="Major Discoveries & Real World Applications"
                description="From recreating the primordial quark-gluon plasma of the early universe to pioneering life-saving cancer radioisotopes, clean energy battery materials, deep-space radiation protection, and quantum computing networks."
            />

            <div className="filter-row" role="group" aria-label="Filter by discipline">
                {disciplines.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        className={
                            option.id === discipline
                                ? "filter-chip filter-chip--active"
                                : "filter-chip"
                        }
                        aria-pressed={option.id === discipline}
                        onClick={() => setDiscipline(option.id)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <ul className="applications-stats">
                {stats.map((stat) => (
                    <li key={stat.id} className="applications-stat">
                        <p className="applications-stat__value">{stat.value}</p>
                        <p className="applications-stat__label">{stat.label}</p>
                    </li>
                ))}
            </ul>

            <article className="applications-feature">
                <figure className="applications-feature__diagram">
                    <div
                        className="applications-feature__art"
                        role="img"
                        aria-label="Gold ions colliding at RHIC, reaching about 4 trillion kelvin"
                    >
                        <svg className="applications-feature__burst" viewBox="0 0 280 160" aria-hidden="true">
                            <g fill="none" strokeWidth="1.5" strokeDasharray="3 3.5" strokeLinecap="round">
                                <line x1="140" y1="80" x2="140" y2="10" stroke="#3ad7ff" />
                                <line x1="140" y1="80" x2="198" y2="22" stroke="#f0b429" />
                                <line x1="140" y1="80" x2="266" y2="80" stroke="#3ad7ff" />
                                <line x1="140" y1="80" x2="198" y2="138" stroke="#f0b429" />
                                <line x1="140" y1="80" x2="140" y2="150" stroke="#3ad7ff" />
                                <line x1="140" y1="80" x2="82" y2="138" stroke="#f0b429" />
                                <line x1="140" y1="80" x2="14" y2="80" stroke="#3ad7ff" />
                                <line x1="140" y1="80" x2="82" y2="22" stroke="#f0b429" />
                            </g>
                            <circle cx="140" cy="80" r="28" fill="#f0b429" />
                            <circle cx="151" cy="71" r="10" fill="#f4f1ea" />
                            <circle cx="127" cy="90" r="5" fill="#3ad7ff" />
                            <circle cx="142" cy="99" r="4.5" fill="#b7a6ff" />
                            <circle cx="157" cy="94" r="4" fill="#5ddea0" />
                            <text x="14" y="80" fill="#3ad7ff" fontSize="12" fontFamily="system-ui, sans-serif" dominantBaseline="middle" stroke="#10192a" strokeWidth="4" paintOrder="stroke">Au⁷⁹⁺ →</text>
                            <text x="198" y="80" fill="#3ad7ff" fontSize="12" fontFamily="system-ui, sans-serif" dominantBaseline="middle" stroke="#10192a" strokeWidth="4" paintOrder="stroke">← Au⁷⁹⁺</text>
                        </svg>
                        <p className="applications-feature__temp">4 trillion kelvin · 250,000× hotter than sun</p>
                        <p className="applications-feature__caption">RHIC gold-gold collision (√s<sub>NN</sub> = 200 GeV)</p>
                    </div>
                </figure>

                <div className="applications-feature__body">
                    <p className="applications-feature__kicker">Landmark Fundamental Discovery</p>
                    <blockquote className="applications-feature__quote">
                        <p>Quote goes here.</p>
                    </blockquote>
                    <h2 className="applications-feature__title">
                        Relativistic Heavy Ion Collider (RHIC)
                    </h2>
                    <p className="copy-box">
                        Placeholder summary of the quark-gluon plasma measurements at RHIC, and of the Electron-Ion Collider planned to follow.
                    </p>
                    <div className="applications-feature__actions">
                        <button type="button" className="button button--primary">
                            Explore Discovery Paper
                        </button>
                        <Link to="/model" className="button button--secondary">
                            View 3D Collider
                        </Link>
                    </div>
                </div>
            </article>

            <section className="applications-studies" aria-labelledby="studies-heading">
                <header className="section-heading">
                    <p className="section-heading__eyebrow">Cross-Disciplinary Societal Impact</p>
                    <h2 className="section-heading__title" id="studies-heading">
                        Practical Technologies Derived from Accelerator Science
                    </h2>
                    <p className="section-heading__text">
                        Accelerator innovations at BNL drive breakthroughs across healthcare, clean energy, aerospace, and quantum hardware.
                    </p>
                </header>

                <ul className="applications-studies__grid">
                    {visibleStudies.map((study) => (
                        <li key={study.id}>
                            <StudyCard study={study} />
                        </li>
                    ))}
                </ul>
            </section>

            <section className="applications-matrix" aria-labelledby="matrix-heading">
                <header className="section-heading">
                    <p className="section-heading__eyebrow">Technology Transfer Matrix</p>
                    <h2 className="section-heading__title" id="matrix-heading">
                        Fundamental Accelerator Physics to Societal Impact
                    </h2>
                </header>

                <div className="applications-table-wrap">
                    <table className="applications-table">
                        <thead>
                            <tr>
                                <th scope="col">Accelerator capability</th>
                                <th scope="col">BNL facility</th>
                                <th scope="col">Commercial and clinical transfer</th>
                                <th scope="col">Societal impact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transfers.map((row) => (
                                <tr key={row.id}>
                                    <th scope="row">{row.capability}</th>
                                    <td>{row.facility}</td>
                                    <td>{row.transfer}</td>
                                    <td><span className="applications-table__pill">{row.impact}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
};

export default Applications;
