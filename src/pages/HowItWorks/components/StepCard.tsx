export type Step = {
    id: string;
    number: string;
    title: string;
    label: string;
    text: string;
    tone: "cyan" | "amber";
};

type StepCardProps = {
    step: Step;
};

const StepCard = ({ step }: StepCardProps) => {
    const { number, title, label, text, tone } = step;

    return (
        <article className={`howitworks-step howitworks-step--${tone}`}>
            <div className="howitworks-step__head">
                <h3 className="howitworks-step__title">
                    <span className="howitworks-step__number">{number}</span>
                    {title}
                </h3>
                <p className="howitworks-step__label">{label}</p>
            </div>
            <p className="copy-box">{text}</p>
        </article>
    );
};

export default StepCard;
