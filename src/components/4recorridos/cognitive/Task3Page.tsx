// src/components/4recorridos/cognitive/Task3Page.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readLS, writeLS, SESSIONS_KEY, type Session } from "./cognitiveStore";
import { useTimer } from "./useTimer";
import { useTracker } from "./useTracker";
import { useErrors } from "./useErrors";

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
        <div className="p-8 text-slate-50 min-h-screen bg-slate-950">
            <div className="max-w-5xl mx-auto bg-slate-900/70 border border-slate-700 rounded-2xl p-6 space-y-6">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Tarea 3: Enviar un mensaje al área correcta
                        </h2>
                        <p className="text-xs text-slate-400 mt-1 max-w-xl">
                            Objetivo: enviar un mensaje al área de{" "}
                            <b>Soporte</b> con un asunto claro y un mensaje de al menos{" "}
                            <b>30 caracteres</b>.
                        </p>
                    </div>
                    <div className="text-xs text-slate-400">
                        Tiempo:{" "}
                        <span className="text-slate-100">{timer.durationSec}s</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[2fr,1.1fr] gap-6 text-sm">
                    {/* Formulario */}
                    <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-slate-300 mb-1">
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
                                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="soporte">Soporte</option>
                                    <option value="finanzas">Finanzas</option>
                                    <option value="rrhh">Recursos Humanos</option>
                                </select>
                                {!isValidArea && (
                                    <p className="text-[11px] text-amber-300 mt-1">
                                        Para esta tarea, el mensaje debe dirigirse al área de
                                        Soporte.
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs text-slate-300 mb-1">
                                    Código de referencia (opcional)
                                </label>
                                <input
                                    value={refCode}
                                    onChange={(e) => {
                                        setRefCode(e.target.value);
                                        tracker.addStep(
                                            "Usuario escribe en el campo de referencia opcional"
                                        );
                                    }}
                                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="Ej: INC-2039"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-slate-300 mb-1">
                                Asunto
                            </label>
                            <input
                                value={subject}
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                    tracker.addStep("Usuario escribe en el campo Asunto");
                                }}
                                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Ej: Error al guardar mis cambios de perfil"
                            />
                            {!isValidSubject && (
                                <p className="text-[11px] text-amber-300 mt-1">
                                    Es necesario un asunto breve que resuma el problema.
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs text-slate-300 mb-1">
                                Mensaje
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    tracker.addStep("Usuario escribe en el campo Mensaje");
                                }}
                                rows={6}
                                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                                placeholder="Describe el problema con suficiente detalle para que el equipo de soporte pueda entender qué ocurre..."
                            />
                            {!isValidMessage && (
                                <p className="text-[11px] text-amber-300 mt-1">
                                    El mensaje debe tener al menos 30 caracteres para ser claro.
                                </p>
                            )}
                        </div>

                        <label className="flex items-center gap-2 text-xs text-slate-300">
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
                            />
                            Marcar como urgente
                        </label>

                        <div className="flex flex-wrap gap-2 pt-3">
                            <button
                                onClick={handleSend}
                                className="px-3 py-2 text-xs bg-blue-600 hover:bg-blue-700 rounded-lg"
                            >
                                Enviar mensaje
                            </button>
                            <button
                                onClick={() => {
                                    errors.addError(
                                        "Usuario abandona la tarea sin enviar el mensaje"
                                    );
                                    finish("Usuario canceló la tarea sin enviar mensaje");
                                }}
                                className="px-3 py-2 text-xs border border-slate-600 rounded-lg hover:bg-slate-800"
                            >
                                Cancelar y terminar tarea
                            </button>
                            <button
                                onClick={() => navigate("/roads")}
                                className="px-3 py-2 text-xs border border-slate-600 rounded-lg hover:bg-slate-800 ml-auto"
                            >
                                Volver al dashboard
                            </button>
                        </div>
                    </div>

                    {/* Panel lateral: instrucciones */}
                    <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs text-slate-300 space-y-3">
                        <div className="font-semibold text-sm mb-1">
                            Escenario de la tarea
                        </div>
                        <p>
                            Un usuario detectó un problema técnico en la plataforma y desea
                            reportarlo al área correcta. El mensaje debe llegar al equipo de{" "}
                            <b>Soporte</b>, no a Finanzas ni a Recursos Humanos.
                        </p>
                        <p className="text-slate-400">
                            Procura que el asunto sea claro y que el cuerpo del mensaje
                            entregue suficiente contexto (al menos 30 caracteres) para que
                            Soporte pueda entender qué está fallando.
                        </p>
                        <p className="text-slate-500">
                            Puedes usar el código de referencia si el problema está asociado a
                            un incidente previo, pero no es obligatorio para completar la
                            tarea.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
