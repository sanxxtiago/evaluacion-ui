"use client";

import { useEffect, useState } from "react";
import W10 from "../../res/w10.gif";
import W95 from "../../res/w95.gif";
import { AttrakDiffForm } from "./AttrakDiffForm";
import { Button, Spinner } from "flowbite-react";
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { HiCheckCircle } from "react-icons/hi";

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
        <div className="flex flex-col gap-6 p-8 min-h-screen bg-gray-900">
            {/* Header Section */}
            <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                    Evaluación subjetiva
                </h3>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    En este módulo podrás evaluar tu percepción sobre dos estilos de interfaz muy distintos:
                    Windows 10 y Windows 95. Observa sus diferencias visuales, de navegación
                    y de interacción, y luego expresa cómo cada una te hace sentir en términos de estética,
                    claridad, usabilidad y atractivo general.
                </p>
            </div>

            <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent" />

            {/* Comparación de interfaces */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6">
                <div className="w-full mb-6 text-center space-y-2">
                    <h4 className="text-xl font-semibold text-white">
                        Comparación de interfaces
                    </h4>
                    <p className="text-sm text-gray-400">
                        Observa las diferencias visuales entre ambas versiones.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-5 space-y-3">
                        <h4 className="text-center text-lg font-semibold text-white">Windows 10</h4>
                        <img
                            src={W10}
                            className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            alt="Windows 10 Interface"
                        />
                    </div>

                    <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-5 space-y-3">
                        <h4 className="text-center text-lg font-semibold text-white">Windows 95</h4>
                        <img
                            src={W95}
                            className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            alt="Windows 95 Interface"
                        />
                    </div>
                </div>
            </div>

            <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent" />

            <Button
                color="blue"
                className="shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => setEvaluate(true)}
                disabled={evaluate}
            >
                {evaluate ? 'Evaluación iniciada' : 'Iniciar evaluación'}
            </Button>

            {/* FORMULARIO W10 */}
            {evaluate && !completeW10Form && !loadingNextForm && (
                <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-xl text-white">
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-semibold text-white">
                            Formulario AttrakDiff
                        </h3>
                        <p className="text-sm text-gray-400">Windows 10</p>
                    </div>

                    <div className="text-gray-200">
                        <AttrakDiffForm onSubmitResults={(vals) => {
                            setW10FormResults(vals);
                            setLoadingNextForm(true);

                            setTimeout(() => {
                                setCompleteW10Form(true);
                                setLoadingNextForm(false);
                            }, 1200);
                        }} />
                    </div>
                </div>
            )}

            {/* SPINNER AL CAMBIAR DE FORM */}
            {loadingNextForm && (
                <div className="flex flex-col items-center mt-6 gap-4">
                    <Spinner size="xl" color="info" />
                    <p className="text-sm text-gray-400">Cargando siguiente formulario…</p>
                </div>
            )}

            {/* FORMULARIO W95 */}
            {evaluate && completeW10Form && !completeW95Form && !savingResults && (
                <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-xl text-white">
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-semibold text-white">
                            Formulario AttrakDiff
                        </h3>
                        <p className="text-sm text-gray-400">Windows 95</p>
                    </div>

                    <div className="text-gray-200">
                        <AttrakDiffForm onSubmitResults={(vals) => {
                            setW95FormResults(vals);
                            setSavingResults(true);

                            setTimeout(() => {
                                setCompleteW95Form(true);
                                setSavingResults(false);
                            }, 1500);
                        }} />
                    </div>
                </div>
            )}
            {/* SPINNER DE GUARDADO FINAL */}
            {savingResults && (
                <div className="flex flex-col items-center mt-6 gap-4">
                    <Spinner size="xl" color="success" />
                    <p className="text-sm text-gray-400">Guardando resultados…</p>
                </div>
            )}

            {/* RESULTADOS FINALES CON RADAR CHART */}
            {completeW10Form && completeW95Form && !savingResults && (
                <div className="flex flex-col items-center mt-10 gap-8">
                    <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-2">
                            <HiCheckCircle className="w-12 h-12 text-green-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white">
                            Evaluación completada
                        </h3>
                        <p className="text-sm text-gray-400 max-w-xl">
                            Comparación de resultados de ambas interfaces según las dimensiones del AttrakDiff.
                        </p>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-2xl">
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
