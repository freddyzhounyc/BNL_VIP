export type Subsystem = {
    id: "magnets" | "rf" | "cryo" | "detectors";
    title: string;
    caption: string;
    text: string;
    tone: "cyan" | "amber" | "violet";
};

type SubsystemCardProps = {
    subsystem: Subsystem;
};

const Diagram = ({ id }: { id: Subsystem["id"] }) => {
    if (id === "cryo") {
        return (
            <p className="howitworks-system__pill">
                Ultra-high vacuum (10⁻¹¹ torr) · 4.5 kelvin helium
            </p>
        );
    }

    if (id === "magnets") {
        return (
            <svg className="howitworks-system__svg" viewBox="0 0 320 88" aria-hidden="true">
                <line x1="58" y1="44" x2="262" y2="44" stroke="currentColor" strokeWidth="1.5" />
                <rect x="18" y="22" width="46" height="44" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <rect x="256" y="22" width="46" height="44" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="160" cy="44" r="14" fill="#f0b429" />
            </svg>
        );
    }

    if (id === "rf") {
        return (
            <svg className="howitworks-system__svg" viewBox="0 0 320 88" aria-hidden="true">
                {[40, 100, 160, 220, 280].map((x) => (
                    <g key={x}>
                        <circle cx={x} cy="44" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx={x} cy="44" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx={x} cy="44" r="3" fill="currentColor" />
                    </g>
                ))}
            </svg>
        );
    }

    return (
        <svg className="howitworks-system__svg" viewBox="0 0 320 88" aria-hidden="true">
            <circle cx="160" cy="44" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="160" cy="44" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="160" cy="44" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="160" cy="44" r="3" fill="currentColor" />
        </svg>
    );
};

const SubsystemCard = ({ subsystem }: SubsystemCardProps) => {
    const { id, title, caption, text, tone } = subsystem;

    return (
        <article className={`howitworks-system howitworks-system--${tone}`}>
            <div className="howitworks-system__art">
                <Diagram id={id} />
                <p className="howitworks-system__caption">{caption}</p>
            </div>
            <h3 className="howitworks-system__title">{title}</h3>
            <p className="copy-box">{text}</p>
        </article>
    );
};

export default SubsystemCard;
