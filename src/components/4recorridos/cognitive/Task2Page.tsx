// src/components/4recorridos/cognitive/Task2Page.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readLS, writeLS, SESSIONS_KEY, type Session } from "./cognitiveStore";
import { useTimer } from "./useTimer";
import { useTracker } from "./useTracker";
import { useErrors } from "./useErrors";

type ThemeOption = "claro" | "oscuro" | "auto";
type LanguageOption = "es" | "en" | "pt";

export default function Task2Page() {
    const navigate = useNavigate();
    const timer = useTimer(true);
    const tracker = useTracker();
    const errors = useErrors();

    const [theme, setTheme] = useState<ThemeOption>("auto");
    const [language, setLanguage] = useState<LanguageOption>("en");
    const [emailNotif, setEmailNotif] = useState(false);
    const [pushNotif, setPushNotif] = useState(true);
    const [weeklySummary, setWeeklySummary] = useState(false);

    useEffect(() => {
        tracker.addStep("Usuario entra a Tarea 2 (Cambiar una preferencia)");
    }, []);

    function finish(result: string) {
        timer.stop();

        const session: Session = {
            id: "s" + Date.now(),
            taskId: "t2",
            taskTitle: "Configurar preferencias de uso",
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

    const isConfigCorrect =
        theme === "oscuro" && language === "es" && emailNotif && weeklySummary;

    function handleSave() {
        if (!isConfigCorrect) {
            errors.addError(
                "Usuario guarda configuración sin coincidir con los requisitos indicados"
            );
            finish("Guardó configuración pero no cumplió las preferencias objetivo");
            return;
        }
        finish(
            "Completó la tarea configurando modo oscuro, idioma español y notificaciones requeridas"
        );
    }

    return (
        <div className="p-8 text-slate-50 min-h-screen bg-slate-950">
            <div className="max-w-5xl mx-auto bg-slate-900/70 border border-slate-700 rounded-2xl p-6 space-y-6">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Tarea 2: Configurar preferencias
                        </h2>
                        <p className="text-xs text-slate-400 mt-1 max-w-xl">
                            Objetivo: configurar la cuenta para un usuario que trabaja de
                            noche, habla español y necesita recibir resúmenes semanales por
                            correo.
                        </p>
                    </div>
                    <div className="text-xs text-slate-400">
                        Tiempo:{" "}
                        <span className="text-slate-100">{timer.durationSec}s</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Columna 1: Apariencia */}
                    <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm space-y-3">
                        <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                            Apariencia
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs text-slate-300 mb-1">
                                Tema de la interfaz
                            </label>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                                {(["claro", "oscuro", "auto"] as ThemeOption[]).map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => {
                                            setTheme(opt);
                                            tracker.addStep(
                                                `Usuario selecciona tema: ${opt.toUpperCase()}`
                                            );
                                        }}
                                        className={`px-2 py-2 rounded-lg border ${theme === opt
                                            ? "border-blue-500 bg-blue-600/20"
                                            : "border-slate-700 bg-slate-900 hover:border-slate-500"
                                            }`}
                                    >
                                        {opt === "claro"
                                            ? "Claro"
                                            : opt === "oscuro"
                                                ? "Oscuro"
                                                : "Automático"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs text-slate-300 mb-1">
                                Idioma principal
                            </label>
                            <select
                                value={language}
                                onChange={(e) => {
                                    const value = e.target.value as LanguageOption;
                                    setLanguage(value);
                                    tracker.addStep(`Usuario cambia idioma a: ${value}`);
                                }}
                                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="es">Español</option>
                                <option value="en">Inglés</option>
                                <option value="pt">Portugués</option>
                            </select>
                        </div>
                    </div>

                    {/* Columna 2: Notificaciones */}
                    <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm space-y-3">
                        <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                            Notificaciones
                        </div>

                        <label className="flex items-center justify-between gap-2 text-xs bg-slate-900 rounded-lg px-3 py-2 border border-slate-700">
                            <span>Notificaciones por correo</span>
                            <input
                                type="checkbox"
                                checked={emailNotif}
                                onChange={(e) => {
                                    setEmailNotif(e.target.checked);
                                    tracker.addStep(
                                        `Usuario ${e.target.checked ? "activa" : "desactiva"
                                        } notificaciones por correo`
                                    );
                                }}
                            />
                        </label>

                        <label className="flex items-center justify-between gap-2 text-xs bg-slate-900 rounded-lg px-3 py-2 border border-slate-700">
                            <span>Notificaciones push en el navegador</span>
                            <input
                                type="checkbox"
                                checked={pushNotif}
                                onChange={(e) => {
                                    setPushNotif(e.target.checked);
                                    tracker.addStep(
                                        `Usuario ${e.target.checked ? "activa" : "desactiva"
                                        } notificaciones push`
                                    );
                                }}
                            />
                        </label>

                        <label className="flex items-center justify-between gap-2 text-xs bg-slate-900 rounded-lg px-3 py-2 border border-slate-700">
                            <span>Resumen semanal por correo</span>
                            <input
                                type="checkbox"
                                checked={weeklySummary}
                                onChange={(e) => {
                                    setWeeklySummary(e.target.checked);
                                    tracker.addStep(
                                        `Usuario ${e.target.checked ? "activa" : "desactiva"
                                        } resumen semanal`
                                    );
                                }}
                            />
                        </label>

                        <p className="text-[11px] text-slate-500 mt-2">
                            El usuario objetivo necesita recibir un resumen semanal por
                            correo. Asegúrate de que esta opción esté alineada con el
                            escenario planteado.
                        </p>
                    </div>

                    {/* Columna 3: Contexto y acciones */}
                    <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm flex flex-col justify-between">
                        <div className="space-y-2 text-xs text-slate-300">
                            <p>
                                El usuario trabaja de noche y prefiere un entorno visual que
                                reduzca el brillo. Además, su idioma de trabajo es el español y
                                espera recibir un correo semanal con un resumen de actividad.
                            </p>
                            <p className="text-slate-400">
                                Ajusta los parámetros de apariencia y notificaciones para
                                cumplir con este escenario antes de guardar.
                            </p>
                            {!isConfigCorrect && (
                                <p className="text-[11px] text-amber-300 mt-2">
                                    La configuración actual todavía no coincide completamente con
                                    el escenario descrito.
                                </p>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4">
                            <button
                                onClick={handleSave}
                                className="px-3 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                            >
                                Guardar configuración
                            </button>
                            <button
                                onClick={() => navigate("/roads")}
                                className="px-3 py-2 text-xs border border-slate-600 rounded-lg hover:bg-slate-800"
                            >
                                Cancelar y volver
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
