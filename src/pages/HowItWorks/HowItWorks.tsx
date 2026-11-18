import PageHeader from "../../components/PageHeader/PageHeader";
import StepCard, { type Step } from "./components/StepCard";
import SubsystemCard, { type Subsystem } from "./components/SubsystemCard";
import "./HowItWorks.css";

const steps: Step[] = [
    {
        id: "linac",
        number: "01",
        title: "Particle Injection & Linac",
        label: "Step 1 Pipeline",
        text: "Ions are produced and given their first acceleration in the linear accelerator.",
        tone: "cyan",
    },
    {
        id: "booster",
        number: "02",
        title: "Booster Synchrotron",
        label: "Step 2 Pipeline",
        text: "Bunches are compressed and accelerated to the energy needed for the collider rings.",
        tone: "amber",
    },
    {
        id: "rings",
        number: "03",
        title: "Storage Rings Transfer",
        label: "Step 3 Pipeline",
        text: "Beams are injected into the storage rings and brought onto a stable orbit.",
        tone: "cyan",
    },
    {
        id: "rf",
        number: "04",
        title: "RF Cavity Energy Pumping",
        label: "Step 4 Pipeline",
        text: "Radio-frequency cavities add energy and keep each bunch tightly packed.",
        tone: "amber",
    },
    {
        id: "focus",
        number: "05",
        title: "Superconducting Focus",
        label: "Step 5 Pipeline",
        text: "Superconducting magnets bend the beam and hold it on course around the ring.",
        tone: "cyan",
    },
    {
        id: "collisions",
        number: "06",
        title: "Interaction Point Collisions",
        label: "Step 6 Pipeline",
        text: "The beams cross at STAR and sPHENIX, where the collisions are recorded.",
        tone: "amber",
    },
];

const subsystems: Subsystem[] = [
    {
        id: "magnets",
        title: "Superconducting Magnet Lattice",
        caption: "Synchrotron dipole magnet field (4.05 tesla)",
        text: "Dipole and quadrupole magnets steer and focus the beam around the ring.",
        tone: "cyan",
    },
    {
        id: "rf",
        title: "RF Cavity Energy Boosters",
        caption: "Superconducting RF resonator (2.1 MV / cell)",
        text: "Superconducting cavities add energy to the beam on every pass through the ring.",
        tone: "violet",
    },
    {
        id: "cryo",
        title: "Cryogenic Plant & Ultra-Vacuum",
        caption: "Superfluid helium refrigeration plant",
        text: "Liquid helium keeps the magnets superconducting, and the beam pipe is held at ultra-high vacuum.",
        tone: "cyan",
    },
    {
        id: "detectors",
        title: "Collision Detectors (STAR & sPHENIX)",
        caption: "Multi-layer spectrometer (tracking + calorimetry)",
        text: "Layered detectors track the particles that leave each collision.",
        tone: "amber",
    },
];

const parameters = [
    {
        id: "energy",
        name: "Top beam energy",
        rhic: "255 GeV (p) / 100 GeV/n (Au)",
        eic: "18 GeV (e−) + 275 GeV (p)",
        status: "Text goes here",
    },
    {
        id: "luminosity",
        name: "Peak luminosity",
        rhic: "<5 × 10³¹ cm⁻² s⁻¹",
        eic: "1 × 10³⁴ cm⁻² s⁻¹",
        status: "Text goes here",
    },
    {
        id: "magnets",
        name: "Superconducting magnets",
        rhic: "1,740 total magnets",
        eic: "Advanced high-field SC",
        status: "Text goes here",
    },
];

const HowItWorks = () => {
    return (
        <main>
            <PageHeader
                eyebrow="Accelerator Physics & Mechanics"
                title="How The Accelerator Works"
                description="A comprehensive technical walkthrough explaining how particles are generated, steered with superconducting electro-optics, energized by RF resonators, and recorded at collision."
            />

            <section className="howitworks-sequence" aria-labelledby="sequence-heading">
                <header className="section-heading">
                    <p className="section-heading__eyebrow">Acceleration Sequence (Linac to Detector)</p>
                    <h2 className="section-heading__title" id="sequence-heading">
                        Step-by-Step Beam Lifecycle
                    </h2>
                </header>
                <ul className="howitworks-steps">
                    {steps.map((step) => (
                        <li key={step.id}>
                            <StepCard step={step} />
                        </li>
                    ))}
                </ul>
            </section>

            <section className="howitworks-dive" aria-labelledby="dive-heading">
                <header className="section-heading">
                    <p className="section-heading__eyebrow">Engineering Deep Dive</p>
                    <h2 className="section-heading__title" id="dive-heading">
                        Core Accelerator Subsystems
                    </h2>
                </header>
                <ul className="howitworks-systems">
                    {subsystems.map((subsystem) => (
                        <li key={subsystem.id}>
                            <SubsystemCard subsystem={subsystem} />
                        </li>
                    ))}
                </ul>
            </section>

            <section className="howitworks-matrix" aria-labelledby="parameters-heading">
                <header className="section-heading">
                    <p className="section-heading__eyebrow">System Specifications & Parameters</p>
                    <h2 className="section-heading__title" id="parameters-heading">
                        Operational Parameter Matrix
                    </h2>
                </header>
                <div className="howitworks-table-wrap">
                    <table className="howitworks-table">
                        <thead>
                            <tr>
                                <th scope="col">Collider parameter name</th>
                                <th scope="col">RHIC specification</th>
                                <th scope="col">EIC future specification</th>
                                <th scope="col">Status / notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parameters.map((row) => (
                                <tr key={row.id}>
                                    <th scope="row">{row.name}</th>
                                    <td>{row.rhic}</td>
                                    <td>{row.eic}</td>
                                    <td>{row.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
};

export default HowItWorks;
