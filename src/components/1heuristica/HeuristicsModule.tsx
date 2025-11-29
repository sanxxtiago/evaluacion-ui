/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet, useLocation, useNavigate } from "react-router-dom";

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
// Layout del módulo
// -------------------------
export function HeuristicsLayout() {
    const location = useLocation();
    const base = "/heuristics";

    const isIntro = location.pathname === base || location.pathname === `${base}/`;
    const isEval = location.pathname.startsWith(`${base}/evaluate`);
    const isSummary = location.pathname.startsWith(`${base}/summary`);

    return (
        <div className="p-8 text-slate-50 min-h-screen bg-slate-950">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Evaluación heurística</h1>
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
// Mockups más complejos
// -------------------------

/**
 * MockupScreen1:
 * - Dashboard de pedidos con múltiples filtros ambiguos,
 *   avisos poco visibles y acciones poco claras.
 */
function MockupScreen1({ onReport }: { onReport?: (hint: string) => void }) {
    const [statusFilter, setStatusFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [compact, setCompact] = useState(false);

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-sm space-y-4">
            <div className="flex flex-wrap justify-between gap-3 items-start">
                <div>
                    <h3 className="font-semibold mb-1 text-slate-50 text-sm">
                        Mockup: Dashboard de pedidos
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md">

                    </p>
                </div>
                <div className="text-[11px] text-amber-40 bg-amber-500/10 border border-amber-500/40 px-3 py-1 rounded-lg">
                    Última sincronización: hace 2 horas
                </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-3 items-center text-xs">
                <div className="flex items-center gap-2">
                    <span className="text-slate-300">Estado:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="all">Todos</option>
                        <option value="pending">En curso</option>
                        <option value="done">Listo</option>
                        <option value="unknown">? </option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-slate-300">Buscar:</span>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[160px]"
                        placeholder="Escribe algo... "
                    />
                </div>

                <label className="flex items-center gap-2 ml-auto">
                    <input
                        type="checkbox"
                        checked={compact}
                        onChange={(e) => setCompact(e.target.checked)}
                    />
                    <span className="text-slate-300">
                        Modo comprimido
                    </span>
                </label>
            </div>

            {/* Tabla de pedidos */}
            <div className="border border-slate-700 rounded-lg overflow-hidden">
                <table className="w-full text-xs text-slate-200">
                    <thead className="bg-slate-950/80 border-b border-slate-700">
                        <tr>
                            <th className="px-3 py-2 text-left font-medium">ID</th>
                            <th className="px-3 py-2 text-left font-medium">Cliente</th>
                            <th className="px-3 py-2 text-left font-medium">Estado</th>
                            <th className="px-3 py-2 text-left font-medium">Total</th>
                            <th className="px-3 py-2 text-left font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={compact ? "divide-y divide-slate-800" : ""}>
                        <tr className="hover:bg-slate-800/60">
                            <td className="px-3 py-2">#1023</td>
                            <td className="px-3 py-2">María López</td>
                            <td className="px-3 py-2">
                                <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/40 text-[10px]">
                                    En curso
                                </span>
                            </td>
                            <td className="px-3 py-2">$ 230.000</td>
                            <td className="px-3 py-2">
                                <div className="flex gap-1">
                                    <button
                                        className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px]"
                                        onClick={() =>
                                            onReport?.(
                                                "Botones de acciones solo muestran iconos/etiquetas vagas, poco claras para usuarios nuevos."
                                            )
                                        }
                                    >
                                        Ver
                                    </button>
                                    <button
                                        className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px]"
                                        onClick={() =>
                                            onReport?.(
                                                "Acción 'Mover' no explica qué implica: ¿cambiar estado, reasignar, archivar?"
                                            )
                                        }
                                    >
                                        Mover
                                    </button>
                                    <button
                                        className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px]"
                                        onClick={() =>
                                            onReport?.(
                                                "No hay confirmación ni explicación previa antes de eliminar."
                                            )
                                        }
                                    >
                                        X
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-800/60">
                            <td className="px-3 py-2">#1024</td>
                            <td className="px-3 py-2">Compañía ABC</td>
                            <td className="px-3 py-2">
                                <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 text-[10px]">
                                    Listo
                                </span>
                            </td>
                            <td className="px-3 py-2">$ 1.520.000</td>
                            <td className="px-3 py-2">
                                <button
                                    className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px]"
                                    onClick={() =>
                                        onReport?.(
                                            "No se muestra claramente qué pasó con el pedido (no hay histórico ni detalle de cambios)."
                                        )
                                    }
                                >
                                    Detalles
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-800/60">
                            <td className="px-3 py-2">#1025</td>
                            <td className="px-3 py-2">—</td>
                            <td className="px-3 py-2">
                                <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-300 border border-red-500/40 text-[10px]">
                                    ?
                                </span>
                            </td>
                            <td className="px-3 py-2">$ —</td>
                            <td className="px-3 py-2">
                                <button
                                    className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[10px]"
                                    onClick={() =>
                                        onReport?.(
                                            "Fila con información incompleta y estado ambiguo; no se explica qué significa."
                                        )
                                    }
                                >
                                    Investigar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Mensaje de error poco destacado */}
            <div className="text-[11px] text-red-300 bg-red-500/5 border border-red-500/40 rounded-lg px-3 py-2">
                Pedidos pendientes de sincronización
                <button
                    className="ml-2 underline"
                    onClick={() =>
                        onReport?.(
                            "Mensaje de error poco visible y sin acciones claras para recuperarse del problema."
                        )
                    }
                >
                    Reportar como problema
                </button>
            </div>
        </div>
    );
}

/**
 * MockupScreen2:
 * - Formulario de registro / configuración con etiquetas ambiguas,
 *   validación poco visible y secciones mal agrupadas.
 */
function MockupScreen2({ onReport }: { onReport?: (hint: string) => void }) {
    const [step, setStep] = useState<1 | 2>(1);
    const [name, setName] = useState("");
    const [idField, setIdField] = useState("");
    const [alias, setAlias] = useState("");
    const [newsletter, setNewsletter] = useState(false);
    const [terms, setTerms] = useState(false);

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-sm space-y-4">
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="font-semibold mb-1 text-slate-50 text-sm">
                        Mockup: Registro / Configuración de cuenta
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md">

                    </p>
                </div>
                <div className="flex gap-2 text-[11px]">
                    <button
                        className={`px-2 py-1 rounded-md border ${step === 1
                            ? "bg-blue-600 border-blue-500"
                            : "border-slate-700 bg-slate-900"
                            }`}
                        onClick={() => setStep(1)}
                    >
                        Paso 1
                    </button>
                    <button
                        className={`px-2 py-1 rounded-md border ${step === 2
                            ? "bg-blue-600 border-blue-500"
                            : "border-slate-700 bg-slate-900"
                            }`}
                        onClick={() => setStep(2)}
                    >
                        Paso 2
                    </button>
                </div>
            </div>

            {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                        <label className="block">
                            <span className="text-slate-300 text-[11px]">
                                Identificador principal
                            </span>
                            <input
                                value={idField}
                                onChange={(e) => setIdField(e.target.value)}
                                className="mt-1 w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Ej: 000123"
                            />
                        </label>
                        <p className="text-[11px] text-slate-500">
                        </p>
                    </div>
                    <div className="space-y-2">
                        <label className="block">
                            <span className="text-slate-300 text-[11px]">Nombre visible</span>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Nombre que verán otras personas "
                            />
                        </label>
                    </div>
                    <div className="space-y-2">
                        <label className="block">
                            <span className="text-slate-300 text-[11px]">
                                Alias público (opcional)
                            </span>
                            <input
                                value={alias}
                                onChange={(e) => setAlias(e.target.value)}
                                className="mt-1 w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="@usuario123"
                            />
                        </label>
                    </div>
                    <div className="space-y-2">
                        <div className="text-[11px] text-slate-400">

                            <button
                                className="ml-1 underline"
                                onClick={() =>
                                    onReport?.(
                                        "No hay distinción clara entre campos obligatorios y opcionales."
                                    )
                                }
                            >
                                Reportar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-[2fr,1.2fr] gap-4 text-xs">
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2">
                            <input
                                type="checkbox"
                                checked={newsletter}
                                onChange={(e) => setNewsletter(e.target.checked)}
                            />
                            <div>
                                <div className="text-slate-200">
                                    Quiero recibir cosas importantes
                                </div>
                                <div className="text-[11px] text-slate-500">

                                </div>
                            </div>
                        </label>

                        <label className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2">
                            <input
                                type="checkbox"
                                checked={terms}
                                onChange={(e) => setTerms(e.target.checked)}
                            />
                            <div>
                                <div className="text-slate-200">
                                    Acepto todo lo anterior y lo que venga
                                </div>
                                <div className="text-[11px] text-slate-500">

                                    <button
                                        className="ml-1 underline"
                                        onClick={() =>
                                            onReport?.(
                                                "El consentimiento es ambiguo y no remite claramente a la documentación de términos."
                                            )
                                        }
                                    >
                                        Reportar
                                    </button>
                                </div>
                            </div>
                        </label>
                    </div>

                    <div className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 space-y-2">
                        <div className="text-[11px] text-slate-400 uppercase tracking-wide">
                            Resumen lateral
                        </div>
                        <div className="text-[11px] text-slate-300">
                            Este resumen intenta mostrar la configuración.
                        </div>
                        <ul className="text-[11px] text-slate-200 list-disc list-inside space-y-1">
                            <li>Identificador: {idField || "no definido"}</li>
                            <li>Nombre visible: {name || "no definido"}</li>
                            <li>Alias: {alias || "no definido"}</li>
                            <li>
                                Suscripción:{" "}
                                {newsletter ? "Activada (no se detalla)" : "Desactivada"}
                            </li>
                            <li>Consentimiento general: {terms ? "Marcado" : "Sin marcar"}</li>
                        </ul>
                        <button
                            className="mt-1 text-[11px] underline"
                            onClick={() =>
                                onReport?.(
                                    "Resumen poco estructurado, difícil de verificar antes de confirmar."
                                )
                            }
                        >
                            Reportar problema en el resumen
                        </button>
                    </div>
                </div>
            )}

            <div className="text-[11px] text-slate-400">
                Intenta identificar problemas de etiquetado, consistencia, carga de
                memoria, agrupación de campos y manejo de errores/validaciones.
            </div>
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
                    ejemplo. Interactúa con los mockups, detecta problemas de usabilidad,
                    asígnales una heurística y una severidad y luego revisa el resumen de
                    hallazgos.
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
                <div className="flex flex-wrap items-center gap-2">
                    <label className="text-xs text-slate-300">Seleccionar mockup:</label>
                    <select
                        value={screenId}
                        onChange={(e) =>
                            setScreenId(e.target.value as "screen1" | "screen2")
                        }
                        className="p-2 text-sm bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="screen1">Dashboard de pedidos</option>
                        <option value="screen2">Registro / Configuración</option>
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
                                "Interactúa con la pantalla y usa el panel de la derecha para registrar los problemas detectados (uno por registro)."}
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
                        onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
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
                        rows={7}
                        className="mt-1 w-full p-2 text-sm bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                        placeholder="Ej: El mensaje de error no indica cómo recuperarse; el estado del pedido es ambiguo; el usuario no sabe si el cambio se guardó..."
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
        writeLS(STORAGE_KEY, [] as ProblemRecord[]);
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
                                        {p.screenId} — {new Date(p.timestamp).toLocaleString()}
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

// -------------------------
// Router local del módulo (por si lo usas aislado)
// -------------------------
export default function HeuristicsModule() {
    return (
        <Routes>
            <Route path="/" element={<HeuristicsIntroPage />} />
            <Route path="/evaluate" element={<HeuristicsEvaluatePage />} />
            <Route path="/summary" element={<HeuristicsSummaryPage />} />
        </Routes>
    );
}
