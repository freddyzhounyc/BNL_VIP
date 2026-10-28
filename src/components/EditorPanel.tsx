import type { Part } from "../lib/csv";

type Props = {
    parts: Part[];
    selectedId: string | null;
    dirty: boolean;
    status: string;
    onSelect: (id: string) => void;
    onMove: (id: string, x: number, y: number, z: number) => void;
    onSave: () => void;
    onDownload: () => void;
    onRevert: () => void;
};

const EditorPanel = ({ parts, selectedId, dirty, status, onSelect, onMove, onSave, onDownload, onRevert }: Props) => {
    const selected = parts.find(p => p.id === selectedId);
    const setAxis = (axis: "x" | "y" | "z", value: string) => {
        if (!selected || value === "" || Number.isNaN(Number(value))) return;
        onMove(selected.id, ...(["x", "y", "z"] as const).map(a => (a === axis ? Number(value) : selected[a])) as [number, number, number]);
    };

    return (
        <aside className="editor">
            <h3>Hotspot editor</h3>
            <p className="editor-hint">
                Select a part, then <b>drag its orb</b> or <b>click the model</b> to place it. Orbit with a drag on empty space.
            </p>
            <ul className="editor-list">
                {parts.map(p => (
                    <li key={p.id}>
                        <button className={p.id === selectedId ? "active" : ""} onClick={() => onSelect(p.id)}>{p.name}</button>
                    </li>
                ))}
            </ul>
            {selected && (
                <div className="editor-coords">
                    {(["x", "y", "z"] as const).map(axis => (
                        <label key={axis}>
                            {axis}
                            <input type="number" step="0.1" value={selected[axis]} onChange={e => setAxis(axis, e.target.value)} />
                        </label>
                    ))}
                </div>
            )}
            <div className="editor-actions">
                <button className="primary" onClick={onSave} disabled={!dirty}>Save to CSV</button>
                <button onClick={onDownload}>Download CSV</button>
                <button onClick={onRevert} disabled={!dirty}>Revert</button>
            </div>
            <p className="editor-status">{status || (dirty ? "Unsaved changes" : "")}</p>
        </aside>
    );
}
export default EditorPanel;
