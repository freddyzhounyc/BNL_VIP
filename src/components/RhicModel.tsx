import "@google/model-viewer";
import type { ModelViewerElement } from "@google/model-viewer";
import { useEffect, useRef } from "react";
import type { Part } from "../lib/csv";

type Props = {
    parts: Part[];
    editMode: boolean;
    selectedId: string | null;
    onSelect: (id: string) => void;
    onOpen: (id: string) => void;
    onMove: (id: string, x: number, y: number, z: number) => void;
};

// Orbs float slightly off the surface they were placed on, so they don't sink into the part.
const SURFACE_OFFSET = 0.15;
const CLICK_SLOP_PX = 5;
const round = (n: number) => Math.round(n * 100) / 100;

const MOVE_KEYS = new Set(["w", "a", "s", "d", "q", "e", "shift"]);
const MOVE_LIMIT = 60;
const MIN_TARGET_Y = 0.5;
const MAX_TARGET_Y = 30;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const RhicModel = ({ parts, editMode, selectedId, onSelect, onOpen, onMove }: Props) => {
    const viewerRef = useRef<ModelViewerElement>(null);
    // Latest props for the native listeners below, which are attached once per edit-mode change.
    const live = useRef({ selectedId, onSelect, onMove });
    useEffect(() => { live.current = { selectedId, onSelect, onMove }; });

    // WASD moves the camera target on the ground plane, Q/E lower/raise it. Directions follow the view.
    useEffect(() => {
        const viewer = viewerRef.current;
        if (!viewer) return;

        const held = new Set<string>();
        let raf = 0;
        let last = 0;
        let goal = { x: 0, y: 0, z: 0 };

        const step = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.1);
            last = now;
            const { theta, radius } = viewer.getCameraOrbit();
            const speed = radius * 0.6 * (held.has("shift") ? 3 : 1) * dt;
            const axis = (pos: string, neg: string) => (held.has(pos) ? 1 : 0) - (held.has(neg) ? 1 : 0);
            const fwd = axis("w", "s");
            const right = axis("d", "a");
            const up = axis("e", "q");
            goal = {
                x: clamp(goal.x + (-Math.sin(theta) * fwd + Math.cos(theta) * right) * speed, -MOVE_LIMIT, MOVE_LIMIT),
                y: clamp(goal.y + up * speed, MIN_TARGET_Y, MAX_TARGET_Y),
                z: clamp(goal.z + (-Math.cos(theta) * fwd - Math.sin(theta) * right) * speed, -MOVE_LIMIT, MOVE_LIMIT),
            };
            viewer.cameraTarget = `${goal.x}m ${goal.y}m ${goal.z}m`;
            raf = requestAnimationFrame(step);
        };

        const moving = () => ["w", "a", "s", "d", "q", "e"].some(k => held.has(k));
        const onKeyDown = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement).tagName;
            if (e.ctrlKey || e.metaKey || e.altKey || tag === "INPUT" || tag === "TEXTAREA") return;
            const k = e.key.toLowerCase();
            if (!MOVE_KEYS.has(k)) return;
            const wasMoving = moving();
            held.add(k);
            if (!wasMoving && moving()) {
                const t = viewer.getCameraTarget();
                goal = { x: t.x, y: t.y, z: t.z };
                last = performance.now();
                raf = requestAnimationFrame(step);
            }
        };
        const onKeyUp = (e: KeyboardEvent) => {
            held.delete(e.key.toLowerCase());
            if (!moving()) cancelAnimationFrame(raf);
        };
        const onBlur = () => { held.clear(); cancelAnimationFrame(raf); };

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        window.addEventListener("blur", onBlur);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
            window.removeEventListener("blur", onBlur);
        };
    }, []);

    useEffect(() => {
        const viewer = viewerRef.current;
        if (!viewer || !editMode) return;

        const hit = (clientX: number, clientY: number) => {
            const h = viewer.positionAndNormalFromPoint(clientX, clientY);
            if (!h) return null;
            const { position: p, normal: n } = h;
            return [
                round(p.x + n.x * SURFACE_OFFSET),
                round(p.y + n.y * SURFACE_OFFSET),
                round(p.z + n.z * SURFACE_OFFSET),
            ] as const;
        };

        let dragId: string | null = null;
        let downAt: { x: number; y: number } | null = null;

        // Capture phase, so grabbing an orb never starts a camera orbit.
        const onDown = (e: PointerEvent) => {
            const orb = (e.target as Element).closest?.<HTMLElement>(".hotspot");
            if (orb?.dataset.id) {
                e.stopImmediatePropagation();
                e.preventDefault();
                dragId = orb.dataset.id;
                live.current.onSelect(dragId);
            } else {
                downAt = { x: e.clientX, y: e.clientY };
            }
        };
        const onPointerMove = (e: PointerEvent) => {
            if (!dragId) return;
            const p = hit(e.clientX, e.clientY);
            if (p) live.current.onMove(dragId, ...p);
        };
        const onUp = (e: PointerEvent) => {
            const { selectedId: sel, onMove: move } = live.current;
            if (dragId) {
                dragId = null;
            } else if (downAt && sel && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) < CLICK_SLOP_PX) {
                const p = hit(e.clientX, e.clientY);
                if (p) move(sel, ...p);
            }
            downAt = null;
        };

        viewer.addEventListener("pointerdown", onDown, true);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onUp);
        return () => {
            viewer.removeEventListener("pointerdown", onDown, true);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onUp);
        };
    }, [editMode]);

    return (
        <model-viewer
            ref={viewerRef}
            className="rhic-viewer"
            src="rhic.glb"
            camera-controls
            autoplay
            skybox-image="env/constellation_sky.jpg"
            environment-image="env/env_light.jpg"
            exposure="1"
            shadow-intensity="1.2"
            shadow-softness="0.8"
            camera-orbit="25deg 80deg 60%"
            max-camera-orbit="auto 88deg auto"
            field-of-view="55deg"
            min-hotspot-opacity="0.2"
        >
            {parts.map(p => (
                <button
                    key={p.id}
                    slot={`hotspot-${p.id}`}
                    className={`hotspot${editMode ? " editing" : ""}${p.id === selectedId ? " selected" : ""}`}
                    data-id={p.id}
                    data-position={`${p.x}m ${p.y}m ${p.z}m`}
                    data-normal="0m 1m 0m"
                    aria-label={p.name}
                    onClick={() => { if (!editMode) onOpen(p.id); }}
                >
                    <span className="hotspot-label">{p.name}</span>
                </button>
            ))}
        </model-viewer>
    );
}
export default RhicModel;
