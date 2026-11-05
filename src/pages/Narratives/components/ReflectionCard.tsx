export type Reflection = {
    id: string;
    quote: string;
    speaker: string;
    affiliation: string;
};

type ReflectionCardProps = {
    reflection: Reflection;
};

const ReflectionCard = ({ reflection }: ReflectionCardProps) => {
    const { quote, speaker, affiliation } = reflection;

    return (
        <figure className="narratives-quote">
            <span className="narratives-quote__mark" aria-hidden="true">“</span>
            <blockquote className="copy-box narratives-quote__text">
                <p>{quote}</p>
            </blockquote>
            <figcaption className="narratives-quote__speaker">
                <span className="narratives-quote__name">{speaker}</span>
                <span className="narratives-quote__affiliation">{affiliation}</span>
            </figcaption>
        </figure>
    );
};

export default ReflectionCard;
