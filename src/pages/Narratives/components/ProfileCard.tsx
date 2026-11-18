export type Profile = {
    id: string;
    role: string;
    name: string;
    position: string;
    title: string;
    text: string;
    tone: "cyan" | "amber" | "violet";
};

type ProfileCardProps = {
    profile: Profile;
};

const ProfileCard = ({ profile }: ProfileCardProps) => {
    const { id, role, name, position, title, text, tone } = profile;

    return (
        <article className={`narratives-card narratives-card--${tone}`} id={id}>
            <div className="narratives-card__identity">
                <span className="narratives-card__icon" aria-hidden="true" />
                <p className="narratives-card__role">{role}</p>
                <h3 className="narratives-card__name">{name}</h3>
                <p className="narratives-card__position">{position}</p>
            </div>
            <h4 className="narratives-card__title">{title}</h4>
            <p className="copy-box">{text}</p>
            <a className="text-link" href={`#${id}`}>
                Read Narrative
                <span className="text-link__arrow" aria-hidden="true">→</span>
            </a>
        </article>
    );
};

export default ProfileCard;
