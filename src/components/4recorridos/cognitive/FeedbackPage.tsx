// src/components/4recorridos/cognitive/FeedbackPage.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FEEDBACK_KEY, readLS, writeLS, type Feedback } from "./cognitiveStore";

export default function FeedbackPage() {
    const { sessionId } = useParams<{ sessionId: string }>();
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState("Media");
    const [comments, setComments] = useState("");

    function handleSave() {
        if (!sessionId) {
            navigate("/roads/cognitivo");
            return;
        }

        const prev = readLS<Feedback[]>(FEEDBACK_KEY, []);
        const filtered = prev.filter((f) => f.sessionId !== sessionId);

        const fb: Feedback = {
            sessionId,
            difficulty,
            comments,
        };

        writeLS(FEEDBACK_KEY, [fb, ...filtered]);
        navigate("/roads/cognitivo/summary");
    }

    return (
        <div className="p-8 text-slate-50 min-h-screen bg-slate-950">
            <div className="max-w-xl mx-auto bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-2">
                    Feedback de la tarea realizada
                </h2>
                <p className="text-xs text-slate-400 mb-4">
                    Evalúa qué tan difícil te resultó la tarea y deja comentarios
                    cualitativos sobre la experiencia.
                </p>

                <div className="space-y-4 text-sm">
                    <div>
                        <label className="block text-xs text-slate-300 mb-1">
                            Dificultad percibida
                        </label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="Muy fácil">Muy fácil</option>
                            <option value="Fácil">Fácil</option>
                            <option value="Media">Media</option>
                            <option value="Difícil">Difícil</option>
                            <option value="Muy difícil">Muy difícil</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs text-slate-300 mb-1">
                            Comentarios
                        </label>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            rows={5}
                            className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                            placeholder="¿Qué fue confuso, claro, fácil o frustrante?"
                        />
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={handleSave}
                            className="px-3 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                        >
                            Guardar feedback
                        </button>
                        <button
                            onClick={() => navigate("/roads/cognitivo")}
                            className="px-3 py-2 text-xs border border-slate-600 rounded-lg hover:bg-slate-800"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
