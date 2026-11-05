import PageHeader from "../../components/PageHeader/PageHeader";
import ProfileCard, { type Profile } from "./components/ProfileCard";
import ReflectionCard, { type Reflection } from "./components/ReflectionCard";
import "./Narratives.css";

const profileText = "Placeholder narrative describing this person's role, motivation, and contribution to the accelerator project at BNL.";

const profiles: Profile[] = [
    {
        id: "physicist",
        role: "Physicist",
        name: "Name goes here",
        position: "Accelerator Operations Specialist",
        title: "Narrative Title",
        text: profileText,
        tone: "cyan",
    },
    {
        id: "engineer",
        role: "Engineer",
        name: "Name goes here",
        position: "Superconducting Cryo Lead",
        title: "Narrative Title",
        text: profileText,
        tone: "amber",
    },
    {
        id: "researcher",
        role: "Researcher",
        name: "Name goes here",
        position: "Detector Physicist",
        title: "Narrative Title",
        text: profileText,
        tone: "violet",
    },
    {
        id: "theorist",
        role: "Theory & Computing",
        name: "Name goes here",
        position: "Quantum Chromodynamics Theorist",
        title: "Narrative Title",
        text: profileText,
        tone: "cyan",
    },
    {
        id: "computing",
        role: "Data & IT",
        name: "Name goes here",
        position: "Computing & Infrastructure",
        title: "Narrative Title",
        text: profileText,
        tone: "amber",
    },
    {
        id: "operator",
        role: "BNL Operator",
        name: "Name goes here",
        position: "RHIC Shift, Accelerator Operations",
        title: "Narrative Title",
        text: profileText,
        tone: "violet",
    },
];

const reflections: Reflection[] = [
    {
        id: "inquiry",
        quote: "Placeholder quote on the spirit of scientific inquiry at BNL.",
        speaker: "Speaker name goes here",
        affiliation: "Affiliation goes here",
    },
    {
        id: "collaboration",
        quote: "Placeholder quote on what it is like to build a collider with people from across the lab.",
        speaker: "Speaker name goes here",
        affiliation: "Affiliation goes here",
    },
    {
        id: "next-generation",
        quote: "Placeholder quote on training the next generation of accelerator scientists.",
        speaker: "Speaker name goes here",
        affiliation: "Affiliation goes here",
    },
];

const Narratives = () => {
    return (
        <main className="narratives">
            <PageHeader
                eyebrow="Voices of Brookhaven • Human Stories"
                title="Narratives of People Behind the Project"
                description="The dedicated scientists, cryogenic technicians, software engineers, and student fellows whose collaborative passion and ingenuity turn complex quantum physics into real discoveries at BNL."
            />

            <article className="narratives-spotlight" id="spotlight">
                <figure className="narratives-spotlight__media">
                    <div
                        className="narratives-spotlight__portrait"
                        role="img"
                        aria-label="Featured scientist photo"
                    />
                    <figcaption className="narratives-spotlight__caption">
                        Featured Scientist Photo
                    </figcaption>
                </figure>

                <div className="narratives-spotlight__body">
                    <p className="narratives-spotlight__kicker">Featured Spotlight Story</p>
                    <blockquote className="narratives-spotlight__quote">
                        <p>Discovering what holds matter together.</p>
                    </blockquote>
                    <h2 className="narratives-spotlight__title">
                        A Journey from Student Curiosity to Chief Beam Operator
                    </h2>
                    <p className="narratives-spotlight__meta">
                        Name goes here · Senior Accelerator Physicist, Collider-Accelerator Dept
                    </p>
                    <p className="copy-box">
                        Placeholder narrative describing the day-to-day work, the cryogenic systems, and the collaboration behind this story.
                    </p>
                    <a className="text-link" href="#spotlight">
                        Read Full Interview Story
                        <span className="text-link__arrow" aria-hidden="true">→</span>
                    </a>
                </div>
            </article>

            <section className="narratives-profiles" aria-labelledby="profiles-heading">
                <header className="section-heading">
                    <p className="section-heading__eyebrow">Team & Collaboration Profiles</p>
                    <h2 className="section-heading__title" id="profiles-heading">
                        Perspectives Across the Accelerator
                    </h2>
                </header>

                <ul className="narratives-profiles__grid">
                    {profiles.map((profile) => (
                        <li key={profile.id}>
                            <ProfileCard profile={profile} />
                        </li>
                    ))}
                </ul>
            </section>

            <section className="narratives-reflections" aria-labelledby="reflections-heading">
                <header className="section-heading">
                    <p className="section-heading__eyebrow section-heading__eyebrow--amber">Community Reflections</p>
                    <h2 className="section-heading__title" id="reflections-heading">
                        Thoughts from the Collaboration
                    </h2>
                </header>

                <ul className="narratives-reflections__grid">
                    {reflections.map((reflection) => (
                        <li key={reflection.id}>
                            <ReflectionCard reflection={reflection} />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Narratives;
