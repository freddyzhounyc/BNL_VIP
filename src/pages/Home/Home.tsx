import PageHeader from "../../components/PageHeader/PageHeader";
import "./Home.css"

const Home = () => {
    return (
        <main>
            <PageHeader
                eyebrow="Brookhaven National Laboratory • VIP BNL"
                title="Particle Accelerator 3D Interactive Collider Showcase"
                description="A brief introductory narrative describing Brookhaven National Laboratory's particle collider, the frontier of quark-gluor lasma discovery, and the next-generation Electron-lon Collider (EIC)."
            />
        </main>
    );
}

export default Home;
