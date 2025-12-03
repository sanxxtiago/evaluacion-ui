// src/components/4recorridos/cognitive/CognitiveDashboard.tsx
import { Button } from "flowbite-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function CognitiveDashboard() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-6 p-8 min-h-screen bg-gray-900">
            {/* Header Section */}
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Recorridos cognitivos
                </h1>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    Módulo aislado para simular tareas concretas en una interfaz y registrar
                    pasos, errores y feedback sobre la experiencia de uso.
                </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

            {/* Tareas Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => navigate("/roads/cognitivo/t1")}
                    className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-left hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-200 group"
                >
                    <div className="flex items-start gap-3 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                            <span className="text-blue-400 font-bold text-sm">1</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-base font-semibold text-white mb-2">
                                Encontrar la sección Perfil
                            </div>
                            <div className="text-sm text-gray-400 leading-relaxed">
                                El usuario debe localizar la opción "Perfil" dentro de una vista de
                                navegación.
                            </div>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => navigate("/roads/cognitivo/t2")}
                    className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-left hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-200 group"
                >
                    <div className="flex items-start gap-3 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                            <span className="text-blue-400 font-bold text-sm">2</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-base font-semibold text-white mb-2">
                                Cambiar una preferencia
                            </div>
                            <div className="text-sm text-gray-400 leading-relaxed">
                                El usuario debe ubicar Ajustes y modificar una preferencia sencilla.
                            </div>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => navigate("/roads/cognitivo/t3")}
                    className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-left hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-200 group"
                >
                    <div className="flex items-start gap-3 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                            <span className="text-blue-400 font-bold text-sm">3</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-base font-semibold text-white mb-2">
                                Enviar un mensaje
                            </div>
                            <div className="text-sm text-gray-400 leading-relaxed">
                                El usuario debe completar un formulario simple y enviar un mensaje.
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            {/* Botón de resumen */}
            <div className="flex justify-start">
                <Button
                    color="gray"
                    className="shadow-lg hover:shadow-xl transition-shadow"
                    onClick={() => navigate("/roads/cognitivo/summary")}
                >
                    Ver resumen de sesiones
                </Button>
            </div>

            <Outlet />
        </div>
    );
}
