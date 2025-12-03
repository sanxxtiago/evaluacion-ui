// src/components/4recorridos/cognitive/Task1Page.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readLS, writeLS, SESSIONS_KEY, type Session } from "./cognitiveStore";
import { useTimer } from "./useTimer";
import { useTracker } from "./useTracker";
import { useErrors } from "./useErrors";
import { Button } from "flowbite-react";

type TopTab = "inicio" | "cuenta" | "ayuda";
type CuentaSection = "resumen" | "perfil" | "seguridad" | "notificaciones";

export default function Task1Page() {
    const navigate = useNavigate();
    const timer = useTimer(true);
    const tracker = useTracker();
    const errors = useErrors();

    const [topTab, setTopTab] = useState<TopTab>("inicio");
    const [cuentaSection, setCuentaSection] = useState<CuentaSection>("resumen");

    useEffect(() => {
        tracker.addStep("Usuario entra a Tarea 1 (Encontrar Perfil)");
    }, []);

    function finish(result: string) {
        timer.stop();

        const session: Session = {
            id: "s" + Date.now(),
            taskId: "t1",
            taskTitle: "Encontrar Perfil en una estructura compleja",
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

    const canSeeEditButton =
        topTab === "cuenta" && cuentaSection === "perfil";

    return (
        <div className="flex flex-col gap-6 p-8 min-h-screen bg-gray-900">
            <div className="max-w-6xl mx-auto w-full bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-8 space-y-6">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-white">
                            Tarea 1: Encontrar la sección de Perfil
                        </h2>
                        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
                            Objetivo: localizar el botón <b className="text-blue-400">"Editar perfil"</b> dentro de una
                            interfaz con varias secciones y pestañas.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg">
                        <span className="text-xs text-gray-400">Tiempo:</span>
                        <span className="text-lg font-bold text-white">{timer.durationSec}s</span>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                {/* Pestañas superiores */}
                <div className="flex gap-2 border-b border-gray-700 pb-2">
                    <button
                        onClick={() => {
                            setTopTab("inicio");
                            tracker.addStep("Usuario cambia pestaña superior a 'Inicio'");
                        }}
                        className={`px-4 py-2 rounded-t-lg font-medium transition-all ${topTab === "inicio"
                            ? "bg-gray-900 text-white border-b-2 border-blue-500"
                            : "text-gray-400 hover:text-white hover:bg-gray-900/50"
                            }`}
                    >
                        Inicio
                    </button>
                    <button
                        onClick={() => {
                            setTopTab("cuenta");
                            tracker.addStep("Usuario cambia pestaña superior a 'Cuenta'");
                        }}
                        className={`px-4 py-2 rounded-t-lg font-medium transition-all ${topTab === "cuenta"
                            ? "bg-gray-900 text-white border-b-2 border-blue-500"
                            : "text-gray-400 hover:text-white hover:bg-gray-900/50"
                            }`}
                    >
                        Cuenta
                    </button>
                    <button
                        onClick={() => {
                            setTopTab("ayuda");
                            tracker.addStep("Usuario cambia pestaña superior a 'Ayuda'");
                        }}
                        className={`px-4 py-2 rounded-t-lg font-medium transition-all ${topTab === "ayuda"
                            ? "bg-gray-900 text-white border-b-2 border-blue-500"
                            : "text-gray-400 hover:text-white hover:bg-gray-900/50"
                            }`}
                    >
                        Ayuda
                    </button>
                </div>

                {/* Layout principal */}
                <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6">
                    {/* Columna izquierda: navegación */}
                    <div className="space-y-3">
                        {topTab === "inicio" && (
                            <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-2">
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                    Menú de Inicio
                                </div>
                                <button
                                    className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
                                    onClick={() =>
                                        tracker.addStep("Inicio: usuario abre 'Panel general'")
                                    }
                                >
                                    Panel general
                                </button>
                                <button
                                    className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
                                    onClick={() =>
                                        tracker.addStep("Inicio: usuario abre 'Reportes rápidos'")
                                    }
                                >
                                    Reportes rápidos
                                </button>
                                <button
                                    className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
                                    onClick={() =>
                                        tracker.addStep("Inicio: usuario abre 'Actividad reciente'")
                                    }
                                >
                                    Actividad reciente
                                </button>
                            </div>
                        )}

                        {topTab === "cuenta" && (
                            <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-2">
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                    Secciones de cuenta
                                </div>
                                <button
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${cuentaSection === "resumen"
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`}
                                    onClick={() => {
                                        setCuentaSection("resumen");
                                        tracker.addStep("Cuenta: usuario abre 'Resumen'");
                                    }}
                                >
                                    Resumen
                                </button>
                                <button
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${cuentaSection === "perfil"
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`}
                                    onClick={() => {
                                        setCuentaSection("perfil");
                                        tracker.addStep("Cuenta: usuario abre 'Perfil'");
                                    }}
                                >
                                    Perfil
                                </button>
                                <button
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${cuentaSection === "seguridad"
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`}
                                    onClick={() => {
                                        setCuentaSection("seguridad");
                                        tracker.addStep("Cuenta: usuario abre 'Seguridad'");
                                    }}
                                >
                                    Seguridad
                                </button>
                                <button
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${cuentaSection === "notificaciones"
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`}
                                    onClick={() => {
                                        setCuentaSection("notificaciones");
                                        tracker.addStep("Cuenta: usuario abre 'Notificaciones'");
                                    }}
                                >
                                    Notificaciones
                                </button>
                            </div>
                        )}

                        {topTab === "ayuda" && (
                            <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-2">
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                    Centro de ayuda
                                </div>
                                <button
                                    className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
                                    onClick={() =>
                                        tracker.addStep("Ayuda: usuario abre 'Preguntas frecuentes'")
                                    }
                                >
                                    Preguntas frecuentes
                                </button>
                                <button
                                    className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
                                    onClick={() =>
                                        tracker.addStep("Ayuda: usuario abre 'Contactar soporte'")
                                    }
                                >
                                    Contactar soporte
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Panel derecho: contenido contextual */}
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
                        <p className="text-gray-300 leading-relaxed">
                            Tu objetivo es localizar dónde podrías editar tus datos personales
                            (nombre, foto, descripción) y activar el botón{" "}
                            <b className="text-blue-400">"Editar perfil"</b>.
                        </p>

                        {topTab !== "cuenta" && (
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                <p className="text-sm text-blue-300">
                                    💡 <b>Pista:</b> normalmente la información de perfil se encuentra en
                                    alguna sección relacionada con la cuenta del usuario.
                                </p>
                            </div>
                        )}

                        {topTab === "cuenta" && cuentaSection === "resumen" && (
                            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                <p className="text-sm text-gray-300">
                                    Estás viendo un resumen general de tu cuenta. Aquí se muestran
                                    datos agregados, pero no es el lugar preciso para editar tu
                                    perfil.
                                </p>
                            </div>
                        )}

                        {topTab === "cuenta" && cuentaSection === "perfil" && (
                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gray-800 border border-gray-700 rounded-lg p-5">
                                    <div className="space-y-1">
                                        <div className="text-base font-semibold text-white">Perfil público</div>
                                        <div className="text-sm text-gray-400">
                                            Nombre, foto, biografía y visibilidad de la cuenta.
                                        </div>
                                    </div>
                                    <Button
                                        color="blue"
                                        className="shadow-lg hover:shadow-xl transition-shadow"
                                        onClick={() => {
                                            tracker.addStep(
                                                "Usuario hace clic en 'Editar perfil' (tarea completada)"
                                            );
                                            finish("Completó la tarea encontrando y activando 'Editar perfil'");
                                        }}
                                    >
                                        Editar perfil
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                        <div className="font-semibold text-white mb-2">Información básica</div>
                                        <p className="text-sm text-gray-400">Nombre, apellido, alias visible y zona horaria.</p>
                                    </div>
                                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                        <div className="font-semibold text-white mb-2">
                                            Preferencias de perfil
                                        </div>
                                        <p className="text-sm text-gray-400">Mostrar foto, estado, enlaces a redes y más.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {topTab === "cuenta" && cuentaSection === "seguridad" && (
                            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                <p className="text-sm text-gray-300">
                                    Aquí solo se gestionan contraseñas y factores de autenticación.
                                </p>
                            </div>
                        )}

                        {topTab === "cuenta" && cuentaSection === "notificaciones" && (
                            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                                <p className="text-sm text-gray-300">
                                    Aquí configuras cómo y cuándo recibes alertas del sistema.
                                </p>
                            </div>
                        )}

                        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                        <div className="flex flex-wrap gap-3">
                            <Button
                                color="failure"
                                outline
                                className="text-red-400 hover:text-white"
                                onClick={() => {
                                    errors.addError(
                                        "Usuario declara que no encuentra la opción de Perfil"
                                    );
                                    finish("No pudo encontrar la opción de editar perfil");
                                }}
                            >
                                No encuentro dónde editar mi perfil
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => navigate("/roads/cognitivo")}
                            >
                                Volver al dashboard
                            </Button>
                        </div>

                        {!canSeeEditButton && (
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                                <p className="text-xs text-yellow-300">
                                    ⚠️ Recuerda: el botón "Editar perfil" aparece solo cuando navegas a
                                    la sección correcta.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
