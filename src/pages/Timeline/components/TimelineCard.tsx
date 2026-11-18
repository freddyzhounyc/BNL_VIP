export type Milestone = {
    id: string;
    year: string;
    tag: string;
    title: string;
    text: string;
    era: "pioneering" | "synchrotron" | "heavy-ion" | "eic";
    side: "left" | "right";
};

type TimelineCardProps = {
    milestone: Milestone;
};

const TimelineCard = ({ milestone }: TimelineCardProps) => {
    const { year, tag, title, text } = milestone;

    return (
        <article className="timeline-card">
            <p className="timeline-card__meta">
                <span className="timeline-card__year">{year}</span>
                <span className="timeline-card__tag">{tag}</span>
            </p>
            <h2 className="timeline-card__title">{title}</h2>
            <p className="copy-box">{text}</p>
        </article>
    );
};

export default TimelineCard;
