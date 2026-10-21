export type Part = {
    id: string;
    name: string;
    category: string;
    function: string;
    description: string;
    x: number;
    y: number;
    z: number;
};

const COLUMNS = ["id", "name", "category", "function", "description", "x", "y", "z"] as const;

const parseRows = (text: string): string[][] => {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = "";
    let quoted = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (quoted) {
            if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
            else if (c === '"') quoted = false;
            else field += c;
        } else if (c === '"') quoted = true;
        else if (c === ",") { row.push(field); field = ""; }
        else if (c === "\n" || c === "\r") {
            if (c === "\r" && text[i + 1] === "\n") i++;
            row.push(field); field = "";
            if (row.some(f => f !== "")) rows.push(row);
            row = [];
        } else field += c;
    }
    row.push(field);
    if (row.some(f => f !== "")) rows.push(row);
    return rows;
};

export const parseParts = (text: string): Part[] => {
    const [header, ...rows] = parseRows(text);
    const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));
    const get = (r: string[], k: string) => r[idx[k]] ?? "";
    return rows.map(r => ({
        id: get(r, "id"),
        name: get(r, "name"),
        category: get(r, "category"),
        function: get(r, "function"),
        description: get(r, "description"),
        x: Number(get(r, "x")) || 0,
        y: Number(get(r, "y")) || 0,
        z: Number(get(r, "z")) || 0,
    }));
};

const escapeField = (v: string | number) => {
    const s = String(v);
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export const serializeParts = (parts: Part[]): string =>
    [COLUMNS.join(","), ...parts.map(p => COLUMNS.map(c => escapeField(p[c])).join(","))].join("\n") + "\n";
