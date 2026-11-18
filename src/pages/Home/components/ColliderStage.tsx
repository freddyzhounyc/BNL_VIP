import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getColliderReading,
    subscribeColliderReading,
    type ColliderReading,
} from "../../../lib/colliderCounter";

type View = "full" | "detector" | "rf";

const views: { id: View; label: string }[] = [
    { id: "full", label: "Full Ring" },
    { id: "detector", label: "Detector IR" },
    { id: "rf", label: "RF Cavity" },
];

const ColliderStage = () => {
    const [reading, setReading] = useState<ColliderReading>(getColliderReading);
    const [view, setView] = useState<View>("full");
    const [wireframe, setWireframe] = useState(false);
    const [pulsing, setPulsing] = useState(false);

    useEffect(() => subscribeColliderReading(setReading), []);

    const triggerBeam = () => {
        setPulsing(true);
        window.setTimeout(() => setPulsing(false), 900);
    };

    return (
        <section className={`home-stage${wireframe ? " home-stage--wire" : ""}${pulsing ? " home-stage--pulse" : ""}`} aria-label="Collider ring">
            <div className="home-stage__bar">
                <p className="home-stage__title">
                    <span className="home-stage__dots" aria-hidden="true" />
                    RHIC / EIC ring
                </p>
                <p className="home-stage__live">
                    <span className="home-stage__live-dot" aria-hidden="true" />
                    Live
                    <span>Collision rate {reading.rate} Hz</span>
                </p>
            </div>

            <div className="home-stage__view" data-view={view}>
                <svg className="home-stage__ring" viewBox="0 0 640 300" role="img" aria-label="Diagram of the RHIC collider ring">
                    <line className="home-stage__inject" x1="70" y1="48" x2="150" y2="118" />
                    <text x="78" y="40" className="home-stage__inject-label">Injection beamline</text>
                    <ellipse className="home-stage__beam home-stage__beam--gold" cx="330" cy="168" rx="210" ry="86" />
                    <ellipse className="home-stage__beam home-stage__beam--cyan" cx="330" cy="168" rx="196" ry="74" />
                    <g className="home-stage__node home-stage__node--rf">
                        <rect x="508" y="150" width="28" height="28" rx="6" />
                    </g>
                    <g className="home-stage__node home-stage__node--detector">
                        <rect x="316" y="232" width="28" height="28" rx="6" />
                        <circle cx="330" cy="246" r="4" />
                    </g>
                </svg>
                <p className="home-stage__caption">
                    <strong>3D collider ring</strong>
                    RHIC ring, shown as the two circulating beams
                </p>
                <p className="home-stage__counter">
                    <span>{reading.count.toLocaleString()}</span>
                    Collisions
                </p>
            </div>

            <div className="home-stage__controls">
                <div className="home-stage__presets" role="group" aria-label="Camera preset">
                    {views.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            className={view === option.id ? "is-selected" : undefined}
                            aria-pressed={view === option.id}
                            onClick={() => setView(option.id)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                <div className="home-stage__actions">
                    <button type="button" onClick={triggerBeam}>Trigger Beam</button>
                    <button type="button" aria-pressed={wireframe} onClick={() => setWireframe((on) => !on)}>
                        Wireframe Mode
                    </button>
                    <Link to="/model">Open 3D Model</Link>
                </div>
            </div>
        </section>
    );
};

export default ColliderStage;
