import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import ColliderStage from "./components/ColliderStage";
import "./Home.css";

const stats = [
    { id: "ring", value: "3.8 km", label: "Ring circumference" },
    { id: "light", value: "99.999%", label: "Speed of light" },
    { id: "energy", value: "255 GeV", label: "Beam energy, proton" },
    { id: "cold", value: "4.2 K", label: "Superconducting operation" },
];

const portals = [
    {
        id: "mechanics",
        to: "/how-it-works",
        eyebrow: "Science & Technology",
        title: "Mechanics",
        text: "How the beam is made, steered, and brought to collision.",
        link: "Read How It Works",
        tone: "cyan",
    },
    {
        id: "narratives",
        to: "/narratives",
        eyebrow: "People & Community",
        title: "Narratives",
        text: "The scientists, engineers, and students behind the collider.",
        link: "Read Narratives",
        tone: "amber",
    },
    {
        id: "timeline",
        to: "/timeline",
        eyebrow: "History & Discovery",
        title: "BNL Timeline",
        text: "From the Cosmotron to RHIC, and on to the EIC.",
        link: "Read Timeline",
        tone: "violet",
    },
];

const Home = () => {
    return (
        <main className="home">
            <PageHeader
                eyebrow="Brookhaven National Laboratory • VIP BNL"
                title="Particle Accelerator 3D Interactive Collider Showcase"
                description="A brief introductory narrative describing Brookhaven National Laboratory's particle collider, the frontier of quark-gluon plasma discovery, and the next-generation Electron-Ion Collider (EIC)."
            />

            <Link className="button button--primary" to="/model">Interact with 3D</Link>

            <ul className="home-stats">
                {stats.map((stat) => (
                    <li key={stat.id} className="home-stat">
                        <p className="home-stat__value">{stat.value}</p>
                        <p className="home-stat__label">{stat.label}</p>
                    </li>
                ))}
            </ul>

            <ColliderStage />

            <ul className="home-portals">
                {portals.map((portal) => (
                    <li key={portal.id}>
                        <article className={`home-portal home-portal--${portal.tone}`}>
                            <p className="home-portal__eyebrow">{portal.eyebrow}</p>
                            <h2 className="home-portal__title">{portal.title}</h2>
                            <p className="copy-box">{portal.text}</p>
                            <Link className="text-link" to={portal.to}>
                                {portal.link}
                                <span className="text-link__arrow" aria-hidden="true">→</span>
                            </Link>
                        </article>
                    </li>
                ))}
            </ul>

            <article className="home-story">
                <div className="home-story__portrait" role="img" aria-label="Project photo" />
                <div>
                    <p className="home-story__kicker">Project narrative</p>
                    <h2>Unlocking the Nuclear Strong Force</h2>
                    <p className="copy-box">
                        The collaboration at Brookhaven, and the students and faculty of the VIP project, working toward the next collider.
                    </p>
                    <Link className="button button--primary" to="/narratives">Explore Full Story</Link>
                </div>
            </article>
        </main>
    );
};

export default Home;
