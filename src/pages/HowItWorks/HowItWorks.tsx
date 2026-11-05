import PageHeader from "../../components/PageHeader/PageHeader";
import "./HowItWorks.css"

const HowItWorks = () => {
    return (
        <main>
            <PageHeader
                eyebrow="Accelerator Physics & Mechanics"
                title="How The Accelerator Works"
                description="A comprehensive technical walkthrough explaining how particles are generated, steered with superconducting electro-optics, energized by RF resonators, and recorded at collision."
            />
        </main>
    );
}

export default HowItWorks;
