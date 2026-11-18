import type { ReactNode } from "react";

export type Study = {
    id: string;
    discipline: "nuclear" | "energy" | "space" | "quantum" | "biology";
    tag: string;
    title: string;
    text: string;
    tone: "cyan" | "amber" | "violet";
};

type StudyCardProps = {
    study: Study;
};

const icons: Record<string, ReactNode> = {
    isotopes: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
        </svg>
    ),
    batteries: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2 3 14h8l-1 8 11-14h-8z" />
        </svg>
    ),
    astronauts: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4 20 19H4z" />
        </svg>
    ),
    quantum: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 3 20 12 12 21 4 12z" />
        </svg>
    ),
    lithography: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="7" y="7" width="10" height="10" rx="1" />
        </svg>
    ),
    proteins: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M8 3c6 3 6 6 0 9s-6 6 0 9M16 3c-6 3-6 6 0 9s6 6 0 9" />
        </svg>
    ),
};

const StudyCard = ({ study }: StudyCardProps) => {
    const { id, tag, title, text, tone } = study;

    return (
        <article className={`applications-card applications-card--${tone}`} id={id}>
            <div className="applications-card__head">
                <span className="applications-card__icon" aria-hidden="true">{icons[id]}</span>
                <p className="applications-card__tag">{tag}</p>
            </div>
            <h3 className="applications-card__title">{title}</h3>
            <p className="copy-box">{text}</p>
            <a className="text-link" href={`#${id}`}>
                Read Impact Study
                <span className="text-link__arrow" aria-hidden="true">→</span>
            </a>
        </article>
    );
};

export default StudyCard;
