// src/components/4recorridos/cognitive/CognitiveDashboard.tsx
import { Outlet, useNavigate } from "react-router-dom";

export default function CognitiveDashboard() {
    const navigate = useNavigate();

    return (
        <div className="p-8 text-slate-50 min-h-screen bg-slate-950">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Recorridos cognitivos
            </h1>
            <p className="text-sm text-slate-400 mb-6 max-w-2xl">
                Módulo aislado para simular tareas concretas en una interfaz y registrar
                pasos, errores y feedback sobre la experiencia de uso.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                    onClick={() => navigate("/roads/cognitivo/t1")}
                    className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-left hover:border-blue-500 transition"
                >
                    <div className="text-sm font-semibold mb-1">
                        Tarea 1: Encontrar la sección Perfil
                    </div>
                    <div className="text-xs text-slate-400">
                        El usuario debe localizar la opción “Perfil” dentro de una vista de
                        navegación.
                    </div>
                </button>

                <button
                    onClick={() => navigate("/roads/cognitivo/t2")}
                    className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-left hover:border-blue-500 transition"
                >
                    <div className="text-sm font-semibold mb-1">
                        Tarea 2: Cambiar una preferencia
                    </div>
                    <div className="text-xs text-slate-400">
                        El usuario debe ubicar Ajustes y modificar una preferencia sencilla.
                    </div>
                </button>

                <button
                    onClick={() => navigate("/roads/cognitivo/t3")}
                    className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-left hover:border-blue-500 transition"
                >
                    <div className="text-sm font-semibold mb-1">
                        Tarea 3: Enviar un mensaje
                    </div>
                    <div className="text-xs text-slate-400">
                        El usuario debe completar un formulario simple y enviar un mensaje.
                    </div>
                </button>
            </div>

            <div className="mt-6">
                <button
                    onClick={() => navigate("/roads/cognitivo/summary")}
                    className="px-4 py-2 text-xs bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700"
                >
                    Ver resumen de sesiones
                </button>
            </div>
            <Outlet />
        </div>
    );
}
