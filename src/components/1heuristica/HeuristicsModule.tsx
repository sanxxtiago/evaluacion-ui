/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

// -------------------------
// Types & LocalStorage utils
// -------------------------
export type HeuristicKey =
    | "visibility"
    | "match"
    | "control"
    | "consistency"
    | "error_prevention"
    | "recognition"
    | "flexibility"
    | "aesthetic"
    | "error_recovery"
    | "help_doc";

export type SeverityLevel = "Baja" | "Media" | "Alta" | "Crítica";

export type ProblemRecord = {
    id: string;
    screenId: string;
    heuristic: HeuristicKey;
    detail: string;
    severity: SeverityLevel;
    timestamp: string;
};

const STORAGE_KEY = "hw_problems";

function readLS<T>(key: string, fallback: T): T {
    try {
        const v = localStorage.getItem(key);
        return v ? (JSON.parse(v) as T) : fallback;
    } catch {
        return fallback;
    }
}

function writeLS<T>(key: string, value: T) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // ignore
    }
}

// -------------------------
// Heurísticas
// -------------------------
const HEURISTICS: { key: HeuristicKey; label: string; desc: string }[] = [
    {
        key: "visibility",
        label: "Visibilidad del estado del sistema",
        desc: "El sistema debe mantener informados a los usuarios sobre lo que ocurre.",
    },
    {
        key: "match",
        label: "Relación con el mundo real",
        desc: "El sistema debe hablar el lenguaje del usuario.",
    },
    {
        key: "control",
        label: "Control y libertad del usuario",
        desc: "Permitir deshacer/rehacer acciones y cancelar.",
    },
    {
        key: "consistency",
        label: "Consistencia y estándares",
        desc: "Seguir convenciones y mantener consistencia.",
    },
    {
        key: "error_prevention",
        label: "Prevención de errores",
        desc: "Diseñar para prevenir problemas antes de que ocurran.",
    },
    {
        key: "recognition",
        label: "Reconocer mejor que recordar",
        desc: "Minimizar la carga de memoria del usuario.",
    },
    {
        key: "flexibility",
        label: "Flexibilidad y eficiencia de uso",
        desc: "Permitir atajos para usuarios expertos.",
    },
    {
        key: "aesthetic",
        label: "Diseño estético y minimalista",
        desc: "Evitar información irrelevante o ruido visual.",
    },
    {
        key: "error_recovery",
        label: "Ayuda para reconocer y corregir errores",
        desc: "Mensajes claros y acciones para recuperarse del error.",
    },
    {
        key: "help_doc",
        label: "Ayuda y documentación",
        desc: "Facilitar documentación y ayuda contextual.",
    },
];

// -------------------------
// Layout del módulo (nav + Outlet)
// -------------------------
export function HeuristicsLayout() {
    const location = useLocation();
    const base = "/heuristics";

    const isIntro =
        location.pathname === base || location.pathname === `${base}/`;
    const isEval = location.pathname.startsWith(`${base}/evaluate`);
    const isSummary = location.pathname.startsWith(`${base}/summary`);

    return (
        <div className="p-8 text-slate-50 min-h-screen bg-slate-950">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Evaluación heurística
            </h1>
            <p className="text-sm text-slate-400 mb-6 max-w-2xl">
                Módulo aislado para practicar la identificación de problemas de
                usabilidad basados en las heurísticas de Nielsen. Los datos se guardan
                localmente en tu navegador.
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
                <Link
                    to="/heuristics"
                    className={`px-4 py-2 rounded-lg text-sm border transition ${isIntro
                            ? "bg-slate-800 border-slate-600"
                            : "bg-slate-900/60 border-slate-800 hover:border-slate-500"
                        }`}
                >
                    Introducción
                </Link>
                <Link
                    to="/heuristics/evaluate"
                    className={`px-4 py-2 rounded-lg text-sm border transition ${isEval
                            ? "bg-slate-800 border-slate-600"
                            : "bg-slate-900/60 border-slate-800 hover:border-slate-500"
                        }`}
                >
                    Evaluar interfaz
                </Link>
                <Link
                    to="/heuristics/summary"
                    className={`px-4 py-2 rounded-lg text-sm border transition ${isSummary
                            ? "bg-slate-800 border-slate-600"
                            : "bg-slate-900/60 border-slate-800 hover:border-slate-500"
                        }`}
                >
                    Resumen
                </Link>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg">
                <Outlet />
            </div>
        </div>
    );
}

// -------------------------
// Mockups (pantallas simuladas)
// -------------------------
function MockupScreen1(props: { onReport?: (hint: string) => void }) {
    const { onReport } = props;
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-1 text-slate-50">Mockup: Inicio / Login</h3>
            <p className="text-xs text-slate-400 mb-3">
                Pantalla con etiquetas ambiguas, poca claridad de acciones y poca
                visibilidad del estado.
            </p>

            <div className="space-y-3">
                <label className="block text-[11px] text-slate-400">
                    ID de acceso (aunque en realidad pide correo)
                </label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 text-sm bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="ID o correo"
                />

                <label className="block text-[11px] text-slate-400">Clave</label>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    className="w-full p-2 text-sm bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                <div className="flex gap-2">
                    <button
                        onClick={() => onReport?.("El botón 'Entrar' no indica qué ocurrirá")}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-xs text-white rounded-lg"
                    >
                        Entrar
                    </button>
                    <button
                        onClick={() =>
                            onReport?.("La opción de ayuda está poco destacada y poco visible")
                        }
                        className="px-3 py-2 border border-slate-600 text-xs text-slate-200 rounded-lg hover:bg-slate-800"
                    >
                        Ayuda
                    </button>
                </div>
            </div>
        </div>
    );
}

function MockupScreen2(props: { onReport?: (hint: string) => void }) {
    const { onReport } = props;
    const [notif, setNotif] = useState(false);

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold mb-1 text-slate-50">Mockup: Ajustes</h3>
            <p className="text-xs text-slate-400 mb-3">
                Configuración con problemas de agrupación visual, textos vagos y estados
                poco claros.
            </p>

            <label className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-lg border border-slate-700">
                <input
                    type="checkbox"
                    checked={notif}
                    onChange={(e) => setNotif(e.target.checked)}
                    className="w-4 h-4"
                />
                <span className="text-sm text-slate-100">
                    Activar cosas importantes
                </span>
                <button
                    onClick={() =>
                        onReport?.(
                            "El texto 'Activar cosas importantes' es ambiguo y no explica qué cambia"
                        )
                    }
                    className="ml-auto text-[11px] text-blue-400 hover:text-blue-300"
                >
                    Reportar problema
                </button>
            </label>
        </div>
    );
}

// -------------------------
// Página: Introducción
// -------------------------
export function HeuristicsIntroPage() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-slate-50 mb-2">
                    Introducción al ejercicio
                </h2>
                <p className="text-sm text-slate-300 max-w-2xl">
                    En este módulo simulas una evaluación heurística sobre pantallas de
                    ejemplo. Interactúa con los mockups, detecta problemas de
                    usabilidad, asígnales una heurística y una severidad y luego revisa
                    el resumen de hallazgos.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {HEURISTICS.map((h) => (
                    <div
                        key={h.key}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-4"
                    >
                        <div className="font-semibold text-slate-50 text-sm mb-1">
                            {h.label}
                        </div>
                        <div className="text-xs text-slate-400">{h.desc}</div>
                    </div>
                ))}
            </div>

            <div className="pt-4">
                <Link
                    to="/heuristics/evaluate"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-sm rounded-lg"
                >
                    Empezar a evaluar
                </Link>
            </div>
        </div>
    );
}

// -------------------------
// Página: Evaluar
// -------------------------
export function HeuristicsEvaluatePage() {
    const navigate = useNavigate();
    const [screenId, setScreenId] = useState<"screen1" | "screen2">("screen1");
    const [heuristic, setHeuristic] = useState<HeuristicKey>("visibility");
    const [detail, setDetail] = useState("");
    const [severity, setSeverity] = useState<SeverityLevel>("Media");
    const [hint, setHint] = useState<string | undefined>(undefined);

    useEffect(() => {
        setHint(undefined);
    }, [screenId]);

    function handleSave() {
        if (!detail.trim()) {
            alert("Describe brevemente el problema antes de guardar.");
            return;
        }

        const item: ProblemRecord = {
            id: `p${Date.now()}`,
            screenId,
            heuristic,
            detail: detail.trim(),
            severity,
            timestamp: new Date().toISOString(),
        };

        const prev = readLS<ProblemRecord[]>(STORAGE_KEY, []);
        writeLS(STORAGE_KEY, [item, ...(prev || [])]);

        setDetail("");
        alert("Problema registrado. Puedes seguir añadiendo o ver el resumen.");
    }

    function goToSummary() {
        navigate("/heuristics/summary");
    }

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-300">Seleccionar mockup:</label>
                    <select
                        value={screenId}
                        onChange={(e) =>
                            setScreenId(e.target.value as "screen1" | "screen2")
                        }
                        className="p-2 text-sm bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="screen1">Perfil / Inicio</option>
                        <option value="screen2">Ajustes</option>
                    </select>
                </div>

                <div>
                    {screenId === "screen1" && (
                        <MockupScreen1 onReport={(h) => setHint(h)} />
                    )}
                    {screenId === "screen2" && (
                        <MockupScreen2 onReport={(h) => setHint(h)} />
                    )}
                </div>

                <div className="mt-2 bg-slate-900 border border-slate-800 rounded-xl p-3">
                    <div className="text-xs text-slate-400">
                        Sugerencia:{" "}
                        <span className="text-slate-200">
                            {hint ??
                                "Interactúa con la pantalla y usa el panel de la derecha para registrar los problemas detectados."}
                        </span>
                    </div>
                </div>
            </div>

            <aside className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <h3 className="font-semibold text-slate-50 text-sm">
                    Registrar problema
                </h3>

                <div>
                    <label className="block text-xs text-slate-300">
                        Heurística afectada
                    </label>
                    <select
                        value={heuristic}
                        onChange={(e) => setHeuristic(e.target.value as HeuristicKey)}
                        className="mt-1 w-full p-2 text-sm bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        {HEURISTICS.map((h) => (
                            <option key={h.key} value={h.key}>
                                {h.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs text-slate-300">Severidad</label>
                    <select
                        value={severity}
                        onChange={(e) =>
                            setSeverity(e.target.value as SeverityLevel)
                        }
                        className="mt-1 w-full p-2 text-sm bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                        <option value="Crítica">Crítica</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs text-slate-300">
                        Descripción del problema
                    </label>
                    <textarea
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        rows={6}
                        className="mt-1 w-full p-2 text-sm bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                    />
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                    <button
                        onClick={handleSave}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-xs rounded-lg"
                    >
                        Guardar problema
                    </button>
                    <button
                        onClick={() => setDetail("")}
                        className="px-3 py-2 border border-slate-600 text-xs rounded-lg hover:bg-slate-800"
                    >
                        Limpiar
                    </button>
                    <button
                        onClick={goToSummary}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-xs rounded-lg ml-auto"
                    >
                        Ver resumen
                    </button>
                </div>
            </aside>
        </div>
    );
}

// -------------------------
// Página: Resumen
// -------------------------
export function HeuristicsSummaryPage() {
    const problems = readLS<ProblemRecord[]>(STORAGE_KEY, []);

    function clearAll() {
        if (!window.confirm("¿Limpiar todos los problemas registrados?")) return;
        writeLS<ProblemRecord[]>(STORAGE_KEY, []);
        window.location.reload();
    }

    function exportCSV() {
        const rows: (string | number)[][] = [
            ["id", "screenId", "heuristic", "detail", "severity", "timestamp"],
            ...problems.map((p) => [
                p.id,
                p.screenId,
                p.heuristic,
                p.detail,
                p.severity,
                p.timestamp,
            ]),
        ];

        const csv = rows
            .map((r) =>
                r
                    .map((c) => `"${String(c).replace(/"/g, '""')}"`)
                    .join(",")
            )
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "heuristica_problems.csv";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="p-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold text-slate-50">
                    Resumen de problemas detectados
                </h2>
                <div className="flex gap-2 ml-auto">
                    <button
                        onClick={exportCSV}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-xs rounded-lg"
                    >
                        Exportar CSV
                    </button>
                    <button
                        onClick={clearAll}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-xs rounded-lg"
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            {problems.length === 0 && (
                <p className="text-sm text-slate-400">
                    No hay problemas registrados todavía. Ve a la pestaña “Evaluar
                    interfaz” para añadir hallazgos.
                </p>
            )}

            <div className="mt-4 space-y-3">
                {problems.map((p) => {
                    const h = HEURISTICS.find((x) => x.key === p.heuristic);
                    return (
                        <div
                            key={p.id}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-4"
                        >
                            <div className="flex justify-between items-start gap-3">
                                <div>
                                    <div className="text-sm font-semibold text-slate-50">
                                        {h?.label ?? p.heuristic}
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                        {p.screenId} —{" "}
                                        {new Date(p.timestamp).toLocaleString()}
                                    </div>
                                </div>
                                <span className="text-[11px] px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/40 text-yellow-300">
                                    {p.severity}
                                </span>
                            </div>
                            <div className="mt-2 text-sm text-slate-200">{p.detail}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
