// src/components/4recorridos/cognitive/Summary.tsx
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
        <div className="p-8 text-slate-50 min-h-screen bg-slate-950">
            <div className="flex flex-wrap items-center gap-3 mb-4">
                <h2 className="text-2xl font-semibold">
                    Resumen de recorridos cognitivos
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

            {sessions.length === 0 && (
                <p className="text-sm text-slate-400">
                    No hay sesiones registradas. Realiza alguna tarea desde el dashboard
                    de recorridos.
                </p>
            )}

            <div className="mt-4 space-y-3 max-h-[420px] overflow-auto">
                {sessions.map((s) => {
                    const fb = feedbacks.find((f) => f.sessionId === s.id);
                    return (
                        <div
                            key={s.id}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm"
                        >
                            <div className="flex justify-between gap-3">
                                <div>
                                    <div className="font-semibold text-slate-50">
                                        {s.taskTitle} ({s.taskId})
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                        {s.startedAt} → {s.finishedAt} ({s.durationSec}s)
                                    </div>
                                </div>
                                <div className="text-[11px] text-slate-400">
                                    Sesión: <span className="text-slate-200">{s.id}</span>
                                </div>
                            </div>

                            <div className="mt-2 text-xs text-slate-300">
                                <div className="font-semibold">Pasos</div>
                                {s.steps.map((st, i) => (
                                    <div key={i}>- {st.detail}</div>
                                ))}

                                <div className="font-semibold mt-2">Errores</div>
                                {s.errors.length === 0 && <div>—</div>}
                                {s.errors.map((er, i) => (
                                    <div key={i} className="text-red-300">
                                        - {er.detail}
                                    </div>
                                ))}

                                <div className="font-semibold mt-2">Feedback</div>
                                <div>
                                    Dificultad: {fb?.difficulty ?? "—"} | Comentarios:{" "}
                                    {fb?.comments ?? "—"}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
