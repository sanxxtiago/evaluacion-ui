// src/components/4recorridos/cognitive/Task3Page.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readLS, writeLS, SESSIONS_KEY, type Session } from "./cognitiveStore";
import { useTimer } from "./useTimer";
import { useTracker } from "./useTracker";
import { useErrors } from "./useErrors";
import { Button } from "flowbite-react";

type Area = "soporte" | "finanzas" | "rrhh";

export default function Task3Page() {
    const navigate = useNavigate();
    const timer = useTimer(true);
    const tracker = useTracker();
    const errors = useErrors();

    const [area, setArea] = useState<Area>("finanzas");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [refCode, setRefCode] = useState("");

    useEffect(() => {
        tracker.addStep("Usuario entra a Tarea 3 (Enviar mensaje)");
    }, []);

    function finish(result: string) {
        timer.stop();

        const session: Session = {
            id: "s" + Date.now(),
            taskId: "t3",
            taskTitle: "Enviar un mensaje al área adecuada",
            startedAt: timer.startedAt?.toISOString() ?? new Date().toISOString(),
            finishedAt: new Date().toISOString(),
            durationSec: timer.durationSec,
            steps: tracker.steps,
            errors: errors.errors,
            result,
        };

        const prev = readLS<Session[]>(SESSIONS_KEY, []);
        writeLS(SESSIONS_KEY, [session, ...(prev || [])]);
        navigate(`/roads/cognitivo/feedback/${session.id}`);
    }

    const isValidArea = area === "soporte";
    const isValidSubject = subject.trim().length > 0;
    const isValidMessage = message.trim().length >= 30;

    function handleSend() {
        let hasError = false;

        if (!isValidArea) {
            errors.addError(
                "El usuario intentó enviar el mensaje a un área distinta de Soporte"
            );
            hasError = true;
        }
        if (!isValidSubject) {
            errors.addError("El usuario intentó enviar mensaje sin asunto");
            hasError = true;
        }
        if (!isValidMessage) {
            errors.addError(
                "El usuario intentó enviar mensaje con descripción demasiado corta"
            );
            hasError = true;
        }

        if (hasError) {
            finish(
                "Intentó enviar el mensaje sin cumplir todos los requisitos (área Soporte, asunto y mensaje suficientemente descriptivo)"
            );
            return;
        }

        tracker.addStep("Usuario envía mensaje correctamente al área de soporte");
        finish("Envió un mensaje correcto al área de Soporte");
    }

    return (
        <div className="flex flex-col gap-6 p-8 min-h-screen bg-gray-900">
            <div className="max-w-6xl mx-auto w-full bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-8 space-y-6">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-white">
                            Tarea 3: Enviar un mensaje al área correcta
                        </h2>
                        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
                            Objetivo: enviar un mensaje al área de{" "}
                            <b className="text-blue-400">Soporte</b> con un asunto claro y un mensaje de al menos{" "}
                            <b className="text-blue-400">30 caracteres</b>.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg">
                        <span className="text-xs text-gray-400">Tiempo:</span>
                        <span className="text-lg font-bold text-white">{timer.durationSec}s</span>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                {/* Grid principal */}
                <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
                    {/* Formulario */}
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Área de destino
                                </label>
                                <select
                                    value={area}
                                    onChange={(e) => {
                                        const value = e.target.value as Area;
                                        setArea(value);
                                        tracker.addStep(
                                            `Usuario cambia área de destino a: ${value}`
                                        );
                                    }}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    <option value="soporte">Soporte</option>
                                    <option value="finanzas">Finanzas</option>
                                    <option value="rrhh">Recursos Humanos</option>
                                </select>
                                {!isValidArea && (
                                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2">
                                        <p className="text-xs text-yellow-300">
                                            ⚠️ Para esta tarea, el mensaje debe dirigirse al área de Soporte.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Código de referencia <span className="text-gray-500">(opcional)</span>
                                </label>
                                <input
                                    value={refCode}
                                    onChange={(e) => {
                                        setRefCode(e.target.value);
                                        tracker.addStep(
                                            "Usuario escribe en el campo de referencia opcional"
                                        );
                                    }}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Ej: INC-2039"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Asunto
                            </label>
                            <input
                                value={subject}
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                    tracker.addStep("Usuario escribe en el campo Asunto");
                                }}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Ej: Error al guardar mis cambios de perfil"
                            />
                            {!isValidSubject && (
                                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2">
                                    <p className="text-xs text-yellow-300">
                                        ⚠️ Es necesario un asunto breve que resuma el problema.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Mensaje
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    tracker.addStep("Usuario escribe en el campo Mensaje");
                                }}
                                rows={7}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Describe el problema con suficiente detalle para que el equipo de soporte pueda entender qué ocurre..."
                            />
                            <div className="flex justify-between items-center">
                                <div>
                                    {!isValidMessage && (
                                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2 inline-block">
                                            <p className="text-xs text-yellow-300">
                                                ⚠️ El mensaje debe tener al menos 30 caracteres.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <span className="text-xs text-gray-500">
                                    {message.length} caracteres
                                </span>
                            </div>
                        </div>

                        <label className="flex items-center gap-3 bg-gray-800 rounded-lg px-4 py-3 border border-gray-700 cursor-pointer hover:border-gray-600 transition-all group">
                            <input
                                type="checkbox"
                                checked={urgent}
                                onChange={(e) => {
                                    setUrgent(e.target.checked);
                                    tracker.addStep(
                                        `Usuario marca el mensaje como ${e.target.checked ? "urgente" : "no urgente"
                                        }`
                                    );
                                }}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white">
                                Marcar como urgente
                            </span>
                        </label>

                        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                        <div className="flex flex-wrap gap-3">
                            <Button
                                color="blue"
                                className="shadow-lg hover:shadow-xl transition-shadow"
                                onClick={handleSend}
                            >
                                Enviar mensaje
                            </Button>
                            <Button
                                color="failure"
                                outline
                                className="text-red-400 hover:text-white"
                                onClick={() => {
                                    errors.addError(
                                        "Usuario abandona la tarea sin enviar el mensaje"
                                    );
                                    finish("Usuario canceló la tarea sin enviar mensaje");
                                }}
                            >
                                Cancelar y terminar tarea
                            </Button>
                            <Button
                                color="gray"
                                className="ml-auto"
                                onClick={() => navigate("/roads/cognitivo")}
                            >
                                Volver al dashboard
                            </Button>
                        </div>
                    </div>

                    {/* Panel lateral: instrucciones */}
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
                        <div className="space-y-2">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Escenario de la tarea
                            </div>
                            <h3 className="font-semibold text-base text-white">
                                Reporte de problema técnico
                            </h3>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                        <div className="space-y-3 text-sm text-gray-300">
                            <p className="leading-relaxed">
                                Un usuario detectó un problema técnico en la plataforma y desea
                                reportarlo al área correcta. El mensaje debe llegar al equipo de{" "}
                                <b className="text-blue-400">Soporte</b>, no a Finanzas ni a Recursos Humanos.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Procura que el asunto sea claro y que el cuerpo del mensaje
                                entregue suficiente contexto (al menos 30 caracteres) para que
                                Soporte pueda entender qué está fallando.
                            </p>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                            <p className="text-xs text-blue-300 leading-relaxed">
                                💡 Puedes usar el código de referencia si el problema está asociado a
                                un incidente previo, pero no es obligatorio para completar la
                                tarea.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
