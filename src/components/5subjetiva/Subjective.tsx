"use client";

import { useEffect, useState } from "react";
import W10 from "../../res/w10.gif";
import W95 from "../../res/w95.gif";
import { AttrakDiffForm } from "./AttrakDiffForm";
import { Button, Spinner } from "flowbite-react";
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";

export function Subjective() {

    const [evaluate, setEvaluate] = useState(false);

    const [completeW10Form, setCompleteW10Form] = useState(false);
    const [completeW95Form, setCompleteW95Form] = useState(false);

    const [loadingNextForm, setLoadingNextForm] = useState(false);
    const [savingResults, setSavingResults] = useState(false);


    const [w10FormResults, setW10FormResults] = useState(null);
    const [w95FormResults, setW95FormResults] = useState(null);

    // Cuando llegan los resultados de W10 → pasar a W95
    useEffect(() => {
        if (w10FormResults) {
            console.log("Resultados W10:", w10FormResults);
            setCompleteW10Form(true);
        }
    }, [w10FormResults]);

    // Cuando llegan los resultados de W95 → marcar completo
    useEffect(() => {
        if (w95FormResults) {
            console.log("Resultados W95:", w95FormResults);
            setEvaluate(false);
            setCompleteW95Form(true);
        }
    }, [w95FormResults]);

    return (
        <div className="flex flex-col justify-start gap-2 p-8 text-slate-50 min-h-screen bg-slate-950">

            <h3 className="text-3xl md:text-4xl font-bold">
                Evaluación subjetiva
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl">
                En este módulo podrás evaluar tu percepción sobre dos estilos de interfaz muy distintos:
                Windows 10 y Windows 95. Observa sus diferencias visuales, de navegación
                y de interacción, y luego expresa cómo cada una te hace sentir en términos de estética,
                claridad, usabilidad y atractivo general.            </p>

            <hr class="h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10 m-4" />

            {/* GIFS */}
            <div className="flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg p-3 mt-2">

                <div className="w-full mb-4">
                    <h4 className="text-center text-lg font-semibold">
                        Comparación de interfaces
                    </h4>
                    <p className="text-center text-sm text-slate-300 mt-1">
                        Observa las diferencias visuales entre ambas versiones.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-4">

                    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-4 max-w-[420px] mx-auto">
                        <h4 className="text-center text-lg font-semibold mb-3">Windows 10</h4>
                        <img src={W10} className="w-full rounded-xl mx-auto shadow-md" alt="W10" />
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-4 max-w-[420px] mx-auto">
                        <h4 className="text-center text-lg font-semibold mb-3">Windows 95</h4>
                        <img src={W95} className="w-full rounded-xl mx-auto shadow-md" alt="W95" />
                    </div>

                </div>
            </div>

            <hr class="h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10 m-4" />

            <Button
                color="alternative"
                onClick={() => setEvaluate(true)}
                disabled={evaluate}
            >
                Iniciar evaluación
            </Button>


            {/* FORMULARIO W10 */}
            {evaluate && !completeW10Form && !loadingNextForm && (
                <div className="flex flex-col gap-6 max-w-2xl mx-auto mt-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-semibold text-center">
                        Formulario AttrakDiff (Windows 10)
                    </h3>

                    <AttrakDiffForm onSubmitResults={(vals) => {
                        setW10FormResults(vals);
                        setLoadingNextForm(true);

                        setTimeout(() => {
                            setCompleteW10Form(true);
                            setLoadingNextForm(false);
                        }, 1200);
                    }} />
                </div>
            )}

            {/* SPINNER AL CAMBIAR DE FORM */}
            {loadingNextForm && (
                <div className="flex flex-col items-center mt-6 gap-3 text-slate-300">
                    <Spinner size="xl" />
                    <p className="text-sm">Cargando siguiente formulario…</p>
                </div>
            )}

            {/* FORMULARIO W95 */}
            {evaluate && completeW10Form && !completeW95Form && !savingResults && (
                <div className="flex flex-col gap-6 max-w-2xl mx-auto mt-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-2xl font-semibold text-center">
                        Formulario AttrakDiff (Windows 95)
                    </h3>

                    <AttrakDiffForm onSubmitResults={(vals) => {
                        setW95FormResults(vals);
                        setSavingResults(true);

                        setTimeout(() => {
                            setCompleteW95Form(true);
                            setSavingResults(false);
                        }, 1500);
                    }} />
                </div>
            )}

            {/* SPINNER DE GUARDADO FINAL */}
            {savingResults && (
                <div className="flex flex-col items-center mt-6 gap-3 text-slate-300">
                    <Spinner size="xl" />
                    <p className="text-sm">Guardando resultados…</p>
                </div>
            )}

            {/* RESULTADOS FINALES CON RADAR CHART */}
            {completeW10Form && completeW95Form && !savingResults && (
                <div className="flex flex-col items-center mt-10 gap-6">

                    <h3 className="text-2xl font-semibold text-green-400">
                        Evaluación completada ✔
                    </h3>

                    <p className="text-sm text-slate-300 text-center max-w-xl">
                        Comparación de resultados de ambas interfaces según las dimensiones del AttrakDiff.
                    </p>

                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-lg">
                        <RadarChart
                            cx={250}
                            cy={200}
                            outerRadius={150}
                            width={500}
                            height={380}
                            data={[
                                { dimension: "Valoración estética", w10: w10FormResults.q1, w95: w95FormResults.q1 },
                                { dimension: "Interacción", w10: w10FormResults.q2, w95: w95FormResults.q2 },
                                { dimension: "Navegación", w10: w10FormResults.q3, w95: w95FormResults.q3 },
                                { dimension: "Atractivo visual", w10: w10FormResults.q4, w95: w95FormResults.q4 },
                                { dimension: "Estimulación", w10: w10FormResults.q5, w95: w95FormResults.q5 },
                            ]}
                        >
                            <PolarGrid stroke="#64748b" />
                            <PolarAngleAxis dataKey="dimension" stroke="#cbd5e1" />

                            {/* Ajuste clave */}
                            <PolarRadiusAxis stroke="#475569" domain={[0, 5]} />

                            <Radar
                                name="Windows 10"
                                dataKey="w10"
                                stroke="#38bdf8"
                                fill="#38bdf8"
                                fillOpacity={0.45}
                            />

                            <Radar
                                name="Windows 95"
                                dataKey="w95"
                                stroke="#f472b6"
                                fill="#f472b6"
                                fillOpacity={0.45}
                            />

                            <Legend />
                        </RadarChart>

                    </div>
                </div>
            )}


        </div>
    );
}
