// src/components/4recorridos/cognitive/FeedbackPage.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FEEDBACK_KEY, readLS, writeLS, type Feedback } from "./cognitiveStore";
import { Button } from "flowbite-react";

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
        <div className="flex flex-col gap-6 p-8 min-h-screen bg-gray-900">
            <div className="max-w-2xl mx-auto w-full bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-8">
                {/* Header */}
                <div className="space-y-2 mb-6">
                    <h2 className="text-2xl font-semibold text-white">
                        Feedback de la tarea realizada
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Evalúa qué tan difícil te resultó la tarea y deja comentarios
                        cualitativos sobre la experiencia.
                    </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6" />

                {/* Form */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Dificultad percibida
                        </label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                            <option value="Muy fácil">Muy fácil</option>
                            <option value="Fácil">Fácil</option>
                            <option value="Media">Media</option>
                            <option value="Difícil">Difícil</option>
                            <option value="Muy difícil">Muy difícil</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Comentarios
                        </label>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            rows={6}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            placeholder="¿Qué fue confuso, claro, fácil o frustrante?"
                        />
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            color="success"
                            className="shadow-lg hover:shadow-xl hover:bg-sky-900 transition-shadow text-white"
                            onClick={handleSave}
                        >
                            Guardar feedback
                        </Button>
                        <Button
                            color="gray"
                            className="shadow-lg hover:shadow-xl transition-shadow"
                            onClick={() => navigate("/roads/cognitivo")}
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
