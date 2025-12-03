// src/components/4recorridos/cognitive/Task2Page.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readLS, writeLS, SESSIONS_KEY, type Session } from "./cognitiveStore";
import { useTimer } from "./useTimer";
import { useTracker } from "./useTracker";
import { useErrors } from "./useErrors";
import { Button } from "flowbite-react";

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
        <div className="flex flex-col gap-6 p-8 min-h-screen bg-gray-900">
            <div className="max-w-6xl mx-auto w-full bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-8 space-y-6">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-white">
                            Tarea 2: Configurar preferencias
                        </h2>
                        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
                            Objetivo: configurar la cuenta para un usuario que trabaja de
                            noche, habla español y necesita recibir resúmenes semanales por
                            correo.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg">
                        <span className="text-xs text-gray-400">Tiempo:</span>
                        <span className="text-lg font-bold text-white">{timer.durationSec}s</span>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                {/* Grid de configuraciones */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Columna 1: Apariencia */}
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-5">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Apariencia
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-300">
                                Tema de la interfaz
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {(["claro", "oscuro", "auto"] as ThemeOption[]).map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => {
                                            setTheme(opt);
                                            tracker.addStep(
                                                `Usuario selecciona tema: ${opt.toUpperCase()}`
                                            );
                                        }}
                                        className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${theme === opt
                                            ? "border-blue-500 bg-blue-600 text-white shadow-lg"
                                            : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600 hover:bg-gray-750"
                                            }`}
                                    >
                                        {opt === "claro"
                                            ? "Claro"
                                            : opt === "oscuro"
                                                ? "Oscuro"
                                                : "Auto"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-300">
                                Idioma principal
                            </label>
                            <select
                                value={language}
                                onChange={(e) => {
                                    const value = e.target.value as LanguageOption;
                                    setLanguage(value);
                                    tracker.addStep(`Usuario cambia idioma a: ${value}`);
                                }}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="es">Español</option>
                                <option value="en">Inglés</option>
                                <option value="pt">Portugués</option>
                            </select>
                        </div>
                    </div>

                    {/* Columna 2: Notificaciones */}
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-5">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Notificaciones
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-center justify-between gap-3 bg-gray-800 rounded-lg px-4 py-3 border border-gray-700 cursor-pointer hover:border-gray-600 transition-all group">
                                <span className="text-sm text-gray-300 group-hover:text-white">
                                    Notificaciones por correo
                                </span>
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
                                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                />
                            </label>

                            <label className="flex items-center justify-between gap-3 bg-gray-800 rounded-lg px-4 py-3 border border-gray-700 cursor-pointer hover:border-gray-600 transition-all group">
                                <span className="text-sm text-gray-300 group-hover:text-white">
                                    Notificaciones push
                                </span>
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
                                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                />
                            </label>

                            <label className="flex items-center justify-between gap-3 bg-gray-800 rounded-lg px-4 py-3 border border-gray-700 cursor-pointer hover:border-gray-600 transition-all group">
                                <span className="text-sm text-gray-300 group-hover:text-white">
                                    Resumen semanal por correo
                                </span>
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
                                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                />
                            </label>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                            <p className="text-xs text-blue-300 leading-relaxed">
                                💡 El usuario necesita recibir un resumen semanal por
                                correo. Asegúrate de activar esta opción.
                            </p>
                        </div>
                    </div>

                    {/* Columna 3: Contexto y acciones */}
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col justify-between space-y-5">
                        <div className="space-y-4">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Escenario
                            </div>

                            <div className="space-y-3 text-sm text-gray-300">
                                <p className="leading-relaxed">
                                    El usuario trabaja de noche y prefiere un entorno visual que
                                    reduzca el brillo. Además, su idioma de trabajo es el español y
                                    espera recibir un correo semanal con un resumen de actividad.
                                </p>
                                <p className="text-gray-400 leading-relaxed">
                                    Ajusta los parámetros de apariencia y notificaciones para
                                    cumplir con este escenario antes de guardar.
                                </p>
                            </div>

                            {!isConfigCorrect && (
                                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                                    <p className="text-xs text-yellow-300">
                                        ⚠️ La configuración actual todavía no coincide completamente con
                                        el escenario descrito.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                            <div className="flex flex-col gap-3">
                                <Button
                                    color="success"
                                    className="w-full shadow-lg hover:shadow-xl  hover:bg-sky-900 transition-shadow text-white"
                                    onClick={handleSave}
                                >
                                    Guardar configuración
                                </Button>
                                <Button
                                    color="gray"
                                    className="w-full shadow-lg hover:shadow-xl transition-shadow"
                                    onClick={() => navigate("/roads/cognitivo")}
                                >
                                    Cancelar y volver
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
