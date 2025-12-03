import { useState } from "react";
import { AttrakDiffSelector } from "./AttrakDiffSelector";

export function AttrakDiffForm({ onSubmitResults }: { onSubmitResults: (values: any) => void }) {

    const [values, setValues] = useState({
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        q5: null,
    });

    const handleChange = (question: keyof typeof values, val: number) => {
        setValues((prev) => ({ ...prev, [question]: val }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const hasEmpty = Object.values(values).some(v => v === null);
        if (hasEmpty) {
            alert("Debes responder todas las preguntas antes de continuar.");
            return;
        }

        onSubmitResults(values);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* tus selectores exactos, idénticos */}
            <div>
                <h3 className="text-lg font-semibold mb-2">1. La interfaz te parece…</h3>
                <AttrakDiffSelector
                    name="q1"
                    startLabel="Desagradable"
                    finalLabel="Agradable"
                    value={values.q1}
                    onChange={(v) => handleChange("q1", v)}
                />
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">2. La interacción se siente…</h3>
                <AttrakDiffSelector
                    name="q2"
                    startLabel="Complicada"
                    finalLabel="Simple"
                    value={values.q2}
                    onChange={(v) => handleChange("q2", v)}
                />
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">3. La navegación es…</h3>
                <AttrakDiffSelector
                    name="q3"
                    startLabel="Confusa"
                    finalLabel="Clara"
                    value={values.q3}
                    onChange={(v) => handleChange("q3", v)}
                />
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">4. La estética se percibe…</h3>
                <AttrakDiffSelector
                    name="q4"
                    startLabel="Poco atractiva"
                    finalLabel="Atractiva"
                    value={values.q4}
                    onChange={(v) => handleChange("q4", v)}
                />
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">5. La experiencia general te resulta…</h3>
                <AttrakDiffSelector
                    name="q5"
                    startLabel="Aburrida"
                    finalLabel="Estimulante"
                    value={values.q5}
                    onChange={(v) => handleChange("q5", v)}
                />
            </div>

            <button
                type="submit"
                className="p-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors font-semibold text-lg shadow-md"
            >
                Enviar respuestas
            </button>
        </form>
    );
}
