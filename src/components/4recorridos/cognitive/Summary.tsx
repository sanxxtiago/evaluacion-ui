// src/components/4recorridos/cognitive/Summary.tsx
import { Button } from "flowbite-react";
import {
    readLS,
    writeLS,
    SESSIONS_KEY,
    FEEDBACK_KEY,
    type Session,
    type Feedback,
} from "./cognitiveStore";

export default function Summary() {
    const sessions = readLS<Session[]>(SESSIONS_KEY, []);
    const feedbacks = readLS<Feedback[]>(FEEDBACK_KEY, []);

    const rows: (string | number)[][] = [
        [
            "sessionId",
            "taskId",
            "taskTitle",
            "startedAt",
            "finishedAt",
            "durationSec",
            "steps",
            "errors",
            "difficulty",
            "comments",
        ],
    ];

    sessions.forEach((s) => {
        const fb = feedbacks.find((f) => f.sessionId === s.id);
        rows.push([
            s.id,
            s.taskId,
            s.taskTitle,
            s.startedAt,
            s.finishedAt,
            s.durationSec,
            s.steps.map((st) => st.detail).join("||"),
            s.errors.map((er) => er.detail).join("||"),
            fb?.difficulty ?? "",
            fb?.comments ?? "",
        ]);
    });

    function clearAll() {
        const confirmClear = window.confirm("¿Limpiar datos de recorridos?");
        if (confirmClear) {
            writeLS(SESSIONS_KEY, [] as Session[]);
            writeLS(FEEDBACK_KEY, [] as Feedback[]);
            window.location.reload();
        }
    }

    function exportCSV() {
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
        a.download = "recorridos_summary.csv";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="flex flex-col gap-6 p-8 min-h-screen bg-gray-900">
            {/* Header con botones */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Resumen de recorridos cognitivos
                    </h2>
                    <p className="text-sm text-gray-400">
                        Historial completo de sesiones realizadas
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
                        className="shadow-lg hover:shadow-xl transition-shadow"
                        onClick={clearAll}
                    >
                        Limpiar
                    </Button>
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

            {/* Empty state */}
            {sessions.length === 0 && (
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
                    <p className="text-gray-400">
                        No hay sesiones registradas. Realiza alguna tarea desde el dashboard
                        de recorridos.
                    </p>
                </div>
            )}

            {/* Lista de sesiones */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                {sessions.map((s) => {
                    const fb = feedbacks.find((f) => f.sessionId === s.id);
                    return (
                        <div
                            key={s.id}
                            className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-gray-600 transition-all"
                        >
                            {/* Header de la sesión */}
                            <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                                <div className="space-y-1">
                                    <div className="font-semibold text-lg text-white">
                                        {s.taskTitle}
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center gap-2">
                                        <span>{s.startedAt}</span>
                                        <span>→</span>
                                        <span>{s.finishedAt}</span>
                                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-md font-medium">
                                            {s.durationSec}s
                                        </span>
                                    </div>
                                </div>
                                <div className="text-xs">
                                    <span className="text-gray-500">ID: </span>
                                    <span className="text-gray-300 font-mono bg-gray-900 px-2 py-1 rounded">
                                        {s.taskId}
                                    </span>
                                </div>
                            </div>

                            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4" />

                            {/* Detalles de la sesión */}
                            <div className="space-y-4 text-sm">
                                {/* Pasos */}
                                <div>
                                    <div className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Pasos realizados
                                    </div>
                                    <div className="space-y-1 pl-4">
                                        {s.steps.map((st, i) => (
                                            <div key={i} className="text-gray-400 flex items-start gap-2">
                                                <span className="text-gray-600 font-mono text-xs mt-0.5">
                                                    {i + 1}.
                                                </span>
                                                <span>{st.detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Errores */}
                                <div>
                                    <div className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        Errores encontrados
                                    </div>
                                    <div className="space-y-1 pl-4">
                                        {s.errors.length === 0 ? (
                                            <div className="text-gray-500 italic">Sin errores</div>
                                        ) : (
                                            s.errors.map((er, i) => (
                                                <div key={i} className="text-red-400 flex items-start gap-2">
                                                    <span className="text-red-600 font-mono text-xs mt-0.5">
                                                        {i + 1}.
                                                    </span>
                                                    <span>{er.detail}</span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Feedback */}
                                <div>
                                    <div className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        Feedback del usuario
                                    </div>
                                    <div className="pl-4 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500">Dificultad:</span>
                                            <span className="px-2 py-1 bg-gray-900 text-gray-300 rounded-md text-xs font-medium">
                                                {fb?.difficulty ?? "No proporcionada"}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 block mb-1">Comentarios:</span>
                                            <p className="text-gray-400 bg-gray-900 p-3 rounded-lg text-xs italic">
                                                {fb?.comments || "Sin comentarios"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
