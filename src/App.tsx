import { useCallback, useEffect, useState } from "react";
import RhicModel from "./components/RhicModel";
import PartModal from "./components/PartModal";
import EditorPanel from "./components/EditorPanel";
import { parseParts, serializeParts, type Part } from "./lib/csv";

const CSV_URL = "rhic_parts.csv";

const App = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [saved, setSaved] = useState<Part[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(CSV_URL, { cache: "no-store" })
      .then(r => r.text())
      .then(text => { const p = parseParts(text); setParts(p); setSaved(p); })
      .catch(() => setStatus("Could not load rhic_parts.csv"));
  }, []);

  const dirty = serializeParts(parts) !== serializeParts(saved);

  const movePart = useCallback((id: string, x: number, y: number, z: number) => {
    setParts(ps => ps.map(p => (p.id === id ? { ...p, x, y, z } : p)));
    setStatus("");
  }, []);

  const download = () => {
    const url = URL.createObjectURL(new Blob([serializeParts(parts)], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "rhic_parts.csv" });
    a.click();
    URL.revokeObjectURL(url);
  };

  const save = async () => {
    try {
      const res = await fetch("/api/save-parts", { method: "POST", body: serializeParts(parts) });
      if (!res.ok) throw new Error(await res.text());
      setSaved(parts);
      setStatus("Saved to public/rhic_parts.csv");
    } catch {
      setStatus("Server save unavailable (dev server only), downloaded the CSV instead. Replace public/rhic_parts.csv with it.");
      download();
    }
  };

  const openPart = parts.find(p => p.id === openId);

  return (
    <div className="app">
      <RhicModel
        parts={parts}
        editMode={editMode}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onOpen={setOpenId}
        onMove={movePart}
      />
      <header className="app-title">
        <h1>RHIC</h1>
        <span>Relativistic Heavy Ion Collider, Brookhaven National Laboratory</span>
      </header>
      <div className="controls-hint">
        <b>W A S D</b> move · <b>Q / E</b> down / up · <b>Shift</b> faster · drag to orbit · scroll to zoom
      </div>
      <button className="edit-toggle" onClick={() => setEditMode(m => !m)}>
        {editMode ? "Done editing" : "Edit hotspots"}
      </button>
      {editMode && (
        <EditorPanel
          parts={parts}
          selectedId={selectedId}
          dirty={dirty}
          status={status}
          onSelect={setSelectedId}
          onMove={movePart}
          onSave={save}
          onDownload={download}
          onRevert={() => setParts(saved)}
        />
      )}
      {openPart && !editMode && <PartModal part={openPart} onClose={() => setOpenId(null)} />}
    </div>
  );
}
export default App;
