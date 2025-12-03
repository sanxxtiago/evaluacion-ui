/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "flowbite-react";
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
        <div className="flex flex-col gap-6 p-8 min-h-screen bg-gray-900">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Evaluación heurística
                </h1>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    Módulo aislado para practicar la identificación de problemas de
                    usabilidad basados en las heurísticas de Nielsen. Los datos se guardan
                    localmente en tu navegador.
                </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

            {/* Navegación de pestañas */}
            <div className="flex flex-wrap gap-3">
                <Link
                    to="/heuristics"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isIntro
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"
                        }`}
                >
                    Introducción
                </Link>
                <Link
                    to="/heuristics/evaluate"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isEval
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"
                        }`}
                >
                    Evaluar interfaz
                </Link>
                <Link
                    to="/heuristics/summary"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isSummary
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white"
                        }`}
                >
                    Resumen
                </Link>
            </div>

            {/* Contenido */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl">
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
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg space-y-5">
            <div className="flex flex-wrap justify-between gap-4 items-start">
                <div className="space-y-1">
                    <h3 className="font-semibold text-white text-base">
                        Mockup: Dashboard de pedidos
                    </h3>
                    <p className="text-sm text-gray-400">
                        Interfaz de gestión con múltiples problemas de usabilidad
                    </p>
                </div>
                <div className="text-xs bg-yellow-500/10 border border-yellow-500/30 px-3 py-2 rounded-lg text-yellow-300">
                    ⚠️ Última sincronización: hace 2 horas
                </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Estado:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="all">Todos</option>
                        <option value="pending">En curso</option>
                        <option value="done">Listo</option>
                        <option value="unknown">?</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Buscar:</span>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[200px]"
                        placeholder="Escribe algo..."
                    />
                </div>

                <label className="flex items-center gap-3 ml-auto bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 cursor-pointer hover:border-gray-600 transition-all group">
                    <input
                        type="checkbox"
                        checked={compact}
                        onChange={(e) => setCompact(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white">
                        Modo comprimido
                    </span>
                </label>
            </div>

            {/* Tabla de pedidos */}
            <div className="border border-gray-700 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-gray-200">
                    <thead className="bg-gray-950 border-b border-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-white">ID</th>
                            <th className="px-4 py-3 text-left font-semibold text-white">Cliente</th>
                            <th className="px-4 py-3 text-left font-semibold text-white">Estado</th>
                            <th className="px-4 py-3 text-left font-semibold text-white">Total</th>
                            <th className="px-4 py-3 text-left font-semibold text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        <tr className="hover:bg-gray-800/60 transition-colors">
                            <td className="px-4 py-3">#1023</td>
                            <td className="px-4 py-3">María López</td>
                            <td className="px-4 py-3">
                                <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/40 text-xs font-medium">
                                    En curso
                                </span>
                            </td>
                            <td className="px-4 py-3">$ 230.000</td>
                            <td className="px-4 py-3">
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs border border-gray-700 transition-all"
                                        onClick={() =>
                                            onReport?.(
                                                "Botones de acciones solo muestran iconos/etiquetas vagas, poco claras para usuarios nuevos."
                                            )
                                        }
                                    >
                                        Ver
                                    </button>
                                    <button
                                        className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs border border-gray-700 transition-all"
                                        onClick={() =>
                                            onReport?.(
                                                "Acción 'Mover' no explica qué implica: ¿cambiar estado, reasignar, archivar?"
                                            )
                                        }
                                    >
                                        Mover
                                    </button>
                                    <button
                                        className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs border border-red-600/40 transition-all"
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
                        <tr className="hover:bg-gray-800/60 transition-colors">
                            <td className="px-4 py-3">#1024</td>
                            <td className="px-4 py-3">Compañía ABC</td>
                            <td className="px-4 py-3">
                                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/40 text-xs font-medium">
                                    Listo
                                </span>
                            </td>
                            <td className="px-4 py-3">$ 1.520.000</td>
                            <td className="px-4 py-3">
                                <button
                                    className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs border border-gray-700 transition-all"
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
                        <tr className="hover:bg-gray-800/60 transition-colors">
                            <td className="px-4 py-3">#1025</td>
                            <td className="px-4 py-3 text-gray-500">—</td>
                            <td className="px-4 py-3">
                                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-300 border border-red-500/40 text-xs font-medium">
                                    ?
                                </span>
                            </td>
                            <td className="px-4 py-3 text-gray-500">$ —</td>
                            <td className="px-4 py-3">
                                <button
                                    className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs border border-gray-700 transition-all"
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
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                <span className="text-red-400 text-xl">❌</span>
                <div className="flex-1">
                    <p className="text-sm text-red-300">
                        Pedidos pendientes de sincronización
                    </p>
                    <button
                        className="mt-2 text-xs text-red-400 underline hover:text-red-300"
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
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg space-y-5">
            <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="space-y-1">
                    <h3 className="font-semibold text-white text-base">
                        Mockup: Registro / Configuración de cuenta
                    </h3>
                    <p className="text-sm text-gray-400">
                        Formulario con problemas de etiquetado y validación
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${step === 1
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600"
                            }`}
                        onClick={() => setStep(1)}
                    >
                        Paso 1
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${step === 2
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600"
                            }`}
                        onClick={() => setStep(2)}
                    >
                        Paso 2
                    </button>
                </div>
            </div>

            {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="block">
                            <span className="text-sm font-medium text-gray-300">
                                Identificador principal
                            </span>
                            <input
                                value={idField}
                                onChange={(e) => setIdField(e.target.value)}
                                className="mt-2 w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Ej: 000123"
                            />
                        </label>
                        <p className="text-xs text-gray-500">
                            Campo ambiguo sin explicación clara
                        </p>
                    </div>
                    <div className="space-y-2">
                        <label className="block">
                            <span className="text-sm font-medium text-gray-300">Nombre visible</span>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Nombre que verán otras personas"
                            />
                        </label>
                    </div>
                    <div className="space-y-2">
                        <label className="block">
                            <span className="text-sm font-medium text-gray-300">
                                Alias público <span className="text-gray-500">(opcional)</span>
                            </span>
                            <input
                                value={alias}
                                onChange={(e) => setAlias(e.target.value)}
                                className="mt-2 w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="@usuario123"
                            />
                        </label>
                    </div>
                    <div className="space-y-2 flex items-end">
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 w-full">
                            <p className="text-xs text-yellow-300">
                                ⚠️ Sin distinción clara entre obligatorios y opcionales
                                <button
                                    className="ml-2 underline hover:text-yellow-200"
                                    onClick={() =>
                                        onReport?.(
                                            "No hay distinción clara entre campos obligatorios y opcionales."
                                        )
                                    }
                                >
                                    Reportar
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
                    <div className="space-y-4">
                        <label className="flex items-start gap-3 bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-gray-600 transition-all group">
                            <input
                                type="checkbox"
                                checked={newsletter}
                                onChange={(e) => setNewsletter(e.target.checked)}
                                className="w-4 h-4 mt-0.5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            />
                            <div className="flex-1">
                                <div className="text-sm text-white font-medium">
                                    Quiero recibir cosas importantes
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Descripción vaga y poco clara
                                </div>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-pointer hover:border-gray-600 transition-all group">
                            <input
                                type="checkbox"
                                checked={terms}
                                onChange={(e) => setTerms(e.target.checked)}
                                className="w-4 h-4 mt-0.5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            />
                            <div className="flex-1">
                                <div className="text-sm text-white font-medium">
                                    Acepto todo lo anterior y lo que venga
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Consentimiento ambiguo sin enlaces
                                    <button
                                        className="ml-2 underline hover:text-gray-300"
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

                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 space-y-4">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Resumen lateral
                        </div>
                        <div className="text-sm text-gray-300">
                            Este resumen intenta mostrar la configuración.
                        </div>
                        <ul className="text-sm text-gray-200 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                <span>Identificador: {idField || "no definido"}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                <span>Nombre visible: {name || "no definido"}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                <span>Alias: {alias || "no definido"}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                <span>
                                    Suscripción:{" "}
                                    {newsletter ? "Activada (no se detalla)" : "Desactivada"}
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                <span>Consentimiento: {terms ? "Marcado" : "Sin marcar"}</span>
                            </li>
                        </ul>
                        <button
                            className="text-xs text-blue-400 underline hover:text-blue-300"
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

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-300">
                    💡 Intenta identificar problemas de etiquetado, consistencia, carga de
                    memoria, agrupación de campos y manejo de errores/validaciones.
                </p>
            </div>
        </div>
    );
}

// -------------------------
// Página: Introducción
// -------------------------
export function HeuristicsIntroPage() {
    return (
        <div className="p-8 space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">
                    Introducción al ejercicio
                </h2>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    En este módulo simulas una evaluación heurística sobre pantallas de
                    ejemplo. Interactúa con los mockups, detecta problemas de usabilidad,
                    asígnales una heurística y una severidad y luego revisa el resumen de
                    hallazgos.
                </p>
            </div>

            <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {HEURISTICS.map((h) => (
                    <div
                        key={h.key}
                        className="bg-gray-900 border border-gray-700 rounded-xl p-5 hover:border-gray-600 transition-all"
                    >
                        <div className="font-semibold text-white text-base mb-2">
                            {h.label}
                        </div>
                        <div className="text-sm text-gray-400 leading-relaxed">{h.desc}</div>
                    </div>
                ))}
            </div>

            <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent" />

            <div className="flex justify-center pt-4">
                <Link
                    to="/heuristics/evaluate"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded-lg text-white shadow-lg hover:shadow-xl transition-all"
                >
                    Empezar a evaluar →
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
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Área principal - Mockups */}
            <div className="lg:col-span-2 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                    <label className="text-sm font-medium text-gray-300">Seleccionar mockup:</label>
                    <select
                        value={screenId}
                        onChange={(e) =>
                            setScreenId(e.target.value as "screen1" | "screen2")
                        }
                        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <span className="text-blue-400 text-xl">💡</span>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-blue-300 mb-1">Sugerencia</p>
                            <p className="text-sm text-blue-200">
                                {hint ??
                                    "Interactúa con la pantalla y usa el panel de la derecha para registrar los problemas detectados (uno por registro)."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel lateral - Formulario de registro */}
            <aside className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-5 h-fit sticky top-8">
                <h3 className="font-semibold text-white text-lg">
                    Registrar problema
                </h3>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Heurística afectada
                    </label>
                    <select
                        value={heuristic}
                        onChange={(e) => setHeuristic(e.target.value as HeuristicKey)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        {HEURISTICS.map((h) => (
                            <option key={h.key} value={h.key}>
                                {h.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Severidad</label>
                    <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                        <option value="Crítica">Crítica</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Descripción del problema
                    </label>
                    <textarea
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        rows={8}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Ej: El mensaje de error no indica cómo recuperarse; el estado del pedido es ambiguo; el usuario no sabe si el cambio se guardó..."
                    />
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                <div className="flex flex-col gap-3">
                    <Button
                        color="blue"
                        className="w-full shadow-lg hover:shadow-xl transition-shadow"
                        onClick={handleSave}
                    >
                        Guardar problema
                    </Button>
                    <Button
                        color="gray"
                        className="w-full"
                        onClick={() => setDetail("")}
                    >
                        Limpiar
                    </Button>
                    <Button
                        color="success"
                        className="w-full shadow-lg hover:shadow-xl transition-shadow text-white"
                        onClick={goToSummary}
                    >
                        Ver resumen
                    </Button>
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
        <div className="p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold text-white">
                        Resumen de problemas detectados
                    </h2>
                    <p className="text-sm text-gray-400">
                        {problems.length} problema{problems.length !== 1 ? 's' : ''} registrado{problems.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        color="blue"
                        className="shadow-lg hover:shadow-xl transition-shadow"
                        onClick={exportCSV}
                    >
                        Exportar CSV
                    </Button>
                    <Button
                        color="failure"
                        className="shadow-lg hover:shadow-xl transition-shadow text-white"
                        onClick={clearAll}
                    >
                        Limpiar todo
                    </Button>
                </div>
            </div>

            {problems.length === 0 && (
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
                    <p className="text-gray-400">
                        No hay problemas registrados todavía. Ve a la pestaña "Evaluar
                        interfaz" para añadir hallazgos.
                    </p>
                </div>
            )}

            <div className="space-y-4">
                {problems.map((p) => {
                    const h = HEURISTICS.find((x) => x.key === p.heuristic);

                    const severityColors = {
                        Baja: "bg-blue-500/10 border-blue-500/30 text-blue-300",
                        Media: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
                        Alta: "bg-orange-500/10 border-orange-500/30 text-orange-300",
                        Crítica: "bg-red-500/10 border-red-500/30 text-red-300",
                    };

                    return (
                        <div
                            key={p.id}
                            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-xl hover:border-gray-600 transition-all"
                        >
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                <div className="space-y-1">
                                    <div className="text-base font-semibold text-white">
                                        {h?.label ?? p.heuristic}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                            {p.screenId === "screen1" ? "Dashboard de pedidos" : "Registro / Configuración"}
                                        </span>
                                        <span>•</span>
                                        <span>{new Date(p.timestamp).toLocaleString()}</span>
                                    </div>
                                </div>
                                <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${severityColors[p.severity]}`}>
                                    {p.severity}
                                </span>
                            </div>
                            <div className="text-sm text-gray-300 leading-relaxed bg-gray-900 border border-gray-700 rounded-lg p-4">
                                {p.detail}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
