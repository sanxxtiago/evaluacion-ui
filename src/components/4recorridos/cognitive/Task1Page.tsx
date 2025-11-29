// src/components/4recorridos/cognitive/Task1Page.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readLS, writeLS, SESSIONS_KEY, type Session } from "./cognitiveStore";
import { useTimer } from "./useTimer";
import { useTracker } from "./useTracker";
import { useErrors } from "./useErrors";

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
        <div className="p-8 text-slate-50 min-h-screen bg-slate-950">
            <div className="max-w-5xl mx-auto bg-slate-900/70 border border-slate-700 rounded-2xl p-6 space-y-6">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Tarea 1: Encontrar la sección de Perfil
                        </h2>
                        <p className="text-xs text-slate-400 mt-1 max-w-xl">
                            Objetivo: localizar el botón <b>“Editar perfil”</b> dentro de una
                            interfaz con varias secciones y pestañas.
                        </p>
                    </div>
                    <div className="text-xs text-slate-400">
                        Tiempo:{" "}
                        <span className="text-slate-100">{timer.durationSec}s</span>
                    </div>
                </div>

                {/* Pestañas superiores */}
                <div className="flex gap-2 border-b border-slate-700 pb-2 text-sm">
                    <button
                        onClick={() => {
                            setTopTab("inicio");
                            tracker.addStep("Usuario cambia pestaña superior a 'Inicio'");
                        }}
                        className={`px-3 py-1 rounded-t-lg ${topTab === "inicio"
                            ? "bg-slate-800 text-slate-50"
                            : "text-slate-400 hover:text-slate-100"
                            }`}
                    >
                        Inicio
                    </button>
                    <button
                        onClick={() => {
                            setTopTab("cuenta");
                            tracker.addStep("Usuario cambia pestaña superior a 'Cuenta'");
                        }}
                        className={`px-3 py-1 rounded-t-lg ${topTab === "cuenta"
                            ? "bg-slate-800 text-slate-50"
                            : "text-slate-400 hover:text-slate-100"
                            }`}
                    >
                        Cuenta
                    </button>
                    <button
                        onClick={() => {
                            setTopTab("ayuda");
                            tracker.addStep("Usuario cambia pestaña superior a 'Ayuda'");
                        }}
                        className={`px-3 py-1 rounded-t-lg ${topTab === "ayuda"
                            ? "bg-slate-800 text-slate-50"
                            : "text-slate-400 hover:text-slate-100"
                            }`}
                    >
                        Ayuda
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-6">
                    {/* Columna izquierda: navega distinta según pestaña */}
                    <div className="space-y-3">
                        {topTab === "inicio" && (
                            <div className="bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm space-y-1">
                                <div className="text-xs text-slate-400 mb-2">
                                    Menú de Inicio
                                </div>
                                <button
                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
                                    onClick={() =>
                                        tracker.addStep("Inicio: usuario abre 'Panel general'")
                                    }
                                >
                                    Panel general
                                </button>
                                <button
                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
                                    onClick={() =>
                                        tracker.addStep("Inicio: usuario abre 'Reportes rápidos'")
                                    }
                                >
                                    Reportes rápidos
                                </button>
                                <button
                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
                                    onClick={() =>
                                        tracker.addStep("Inicio: usuario abre 'Actividad reciente'")
                                    }
                                >
                                    Actividad reciente
                                </button>
                            </div>
                        )}

                        {topTab === "cuenta" && (
                            <div className="bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm space-y-1">
                                <div className="text-xs text-slate-400 mb-2">
                                    Secciones de cuenta
                                </div>
                                <button
                                    className={`w-full text-left px-3 py-2 rounded-lg ${cuentaSection === "resumen"
                                        ? "bg-slate-800"
                                        : "hover:bg-slate-800"
                                        }`}
                                    onClick={() => {
                                        setCuentaSection("resumen");
                                        tracker.addStep("Cuenta: usuario abre 'Resumen'");
                                    }}
                                >
                                    Resumen
                                </button>
                                <button
                                    className={`w-full text-left px-3 py-2 rounded-lg ${cuentaSection === "perfil"
                                        ? "bg-slate-800"
                                        : "hover:bg-slate-800"
                                        }`}
                                    onClick={() => {
                                        setCuentaSection("perfil");
                                        tracker.addStep("Cuenta: usuario abre 'Perfil'");
                                    }}
                                >
                                    Perfil
                                </button>
                                <button
                                    className={`w-full text-left px-3 py-2 rounded-lg ${cuentaSection === "seguridad"
                                        ? "bg-slate-800"
                                        : "hover:bg-slate-800"
                                        }`}
                                    onClick={() => {
                                        setCuentaSection("seguridad");
                                        tracker.addStep("Cuenta: usuario abre 'Seguridad'");
                                    }}
                                >
                                    Seguridad
                                </button>
                                <button
                                    className={`w-full text-left px-3 py-2 rounded-lg ${cuentaSection === "notificaciones"
                                        ? "bg-slate-800"
                                        : "hover:bg-slate-800"
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
                            <div className="bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm space-y-1">
                                <div className="text-xs text-slate-400 mb-2">
                                    Centro de ayuda
                                </div>
                                <button
                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
                                    onClick={() =>
                                        tracker.addStep("Ayuda: usuario abre 'Preguntas frecuentes'")
                                    }
                                >
                                    Preguntas frecuentes
                                </button>
                                <button
                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
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
                    <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm space-y-3">
                        <p className="text-slate-200">
                            Tu objetivo es localizar dónde podrías editar tus datos personales
                            (nombre, foto, descripción) y activar el botón{" "}
                            <b>“Editar perfil”</b>.
                        </p>

                        {topTab !== "cuenta" && (
                            <p className="text-xs text-slate-400">
                                Pista: normalmente la información de perfil se encuentra en
                                alguna sección relacionada con la cuenta del usuario.
                            </p>
                        )}

                        {topTab === "cuenta" && cuentaSection === "resumen" && (
                            <div className="text-xs text-slate-300 space-y-2">
                                <p>
                                    Estás viendo un resumen general de tu cuenta. Aquí se muestran
                                    datos agregados, pero no es el lugar preciso para editar tu
                                    perfil.
                                </p>
                            </div>
                        )}

                        {topTab === "cuenta" && cuentaSection === "perfil" && (
                            <div className="space-y-3">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                    <div>
                                        <div className="text-sm font-semibold">Perfil público</div>
                                        <div className="text-xs text-slate-400">
                                            Nombre, foto, biografía y visibilidad de la cuenta.
                                        </div>
                                    </div>
                                    <button
                                        className="px-3 py-2 text-xs bg-blue-600 hover:bg-blue-700 rounded-lg"
                                        onClick={() => {
                                            tracker.addStep(
                                                "Usuario hace clic en 'Editar perfil' (tarea completada)"
                                            );
                                            finish("Completó la tarea encontrando y activando 'Editar perfil'");
                                        }}
                                    >
                                        Editar perfil
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                                    <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                                        <div className="font-semibold mb-1">Información básica</div>
                                        <p>Nombre, apellido, alias visible y zona horaria.</p>
                                    </div>
                                    <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                                        <div className="font-semibold mb-1">
                                            Preferencias de perfil
                                        </div>
                                        <p>Mostrar foto, estado, enlaces a redes y más.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {topTab === "cuenta" && cuentaSection === "seguridad" && (
                            <p className="text-xs text-slate-300">
                                Aquí solo se gestionan contraseñas y factores de autenticación.
                            </p>
                        )}

                        {topTab === "cuenta" && cuentaSection === "notificaciones" && (
                            <p className="text-xs text-slate-300">
                                Aquí configuras cómo y cuándo recibes alertas del sistema.
                            </p>
                        )}

                        <div className="flex flex-wrap gap-2 pt-4">
                            <button
                                onClick={() => {
                                    errors.addError(
                                        "Usuario declara que no encuentra la opción de Perfil"
                                    );
                                    finish("No pudo encontrar la opción de editar perfil");
                                }}
                                className="px-3 py-2 text-xs border border-red-500/70 text-red-300 rounded-lg hover:bg-red-500/10"
                            >
                                No encuentro dónde editar mi perfil
                            </button>
                            <button
                                onClick={() => navigate("/roads")}
                                className="px-3 py-2 text-xs border border-slate-600 rounded-lg hover:bg-slate-800"
                            >
                                Volver al dashboard
                            </button>
                        </div>

                        {!canSeeEditButton && (
                            <p className="text-[11px] text-slate-500 mt-1">
                                Recuerda: el botón “Editar perfil” aparece solo cuando navegas a
                                la sección correcta.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
