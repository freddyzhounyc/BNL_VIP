import { useEffect } from "react";
import type { Part } from "../lib/csv";

const PartModal = ({ part, onClose }: { part: Part; onClose: () => void }) => {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
                <span className="modal-category">{part.category}</span>
                <h2 id="modal-title">{part.name}</h2>
                <p className="modal-function">{part.function}</p>
                <p>{part.description}</p>
            </div>
        </div>
    );
}
export default PartModal;
