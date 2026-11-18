export type ColliderReading = {
    count: number;
    rate: number;
};

type Listener = (reading: ColliderReading) => void;

let reading: ColliderReading = { count: 0, rate: 30 };
const listeners = new Set<Listener>();

export function getColliderReading() {
    return reading;
}

export function setColliderReading(next: Partial<ColliderReading>) {
    reading = { ...reading, ...next };
    listeners.forEach((listener) => listener(reading));
}

export function subscribeColliderReading(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

declare global {
    interface Window {
        bnlCollider?: {
            get: () => ColliderReading;
            set: (next: Partial<ColliderReading>) => void;
        };
    }
}

window.bnlCollider = {
    get: getColliderReading,
    set: setColliderReading,
};

window.addEventListener("bnl:collider", (event) => {
    const detail = (event as CustomEvent<Partial<ColliderReading>>).detail;
    if (detail) setColliderReading(detail);
});
