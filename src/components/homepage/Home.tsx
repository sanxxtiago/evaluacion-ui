// src/components/homepage/Home.tsx
import { Link } from "react-router-dom";
import {
    HiPuzzle,
    HiUserGroup,
    HiChartSquareBar,
    HiLightBulb,
    HiEmojiHappy,
} from "react-icons/hi";

export function Home() {
    const cards = [
        {
            id: "heuristics",
            title: "1. Métodos heurísticos",
            icon: HiPuzzle,
            to: "/heuristics",
            desc:
                "Módulo para identificar problemas de usabilidad en interfaces simuladas usando las heurísticas de Nielsen. Se registran hallazgos, severidad y tipo de problema.",
            focus:
                "Visibilidad, consistencia, carga cognitiva, manejo de errores y claridad de la interfaz.",
        },
        {
            id: "users",
            title: "2. Pruebas en usuarios",
            icon: HiUserGroup,
            to: "/users",
            desc:
                "Simulación de pruebas con usuarios donde se asignan tareas, se observan errores y se registran tiempos y comentarios.",
            focus:
                "Facilidad de aprendizaje, errores frecuentes, tiempos de ejecución y satisfacción percibida.",
        },
        {
            id: "models",
            title: "3. Modelos predictivos",
            icon: HiChartSquareBar,
            to: "/models",
            desc:
                "Aplicación de modelos como Fitts para estimar tiempos de interacción según distancias y tamaños de elementos.",
            focus:
                "Rendimiento objetivo de la interfaz, tiempos estimados de selección y comparación entre diseños.",
        },
        {
            id: "roads",
            title: "4. Recorridos cognitivos",
            icon: HiLightBulb,
            to: "/roads",
            desc:
                "Módulo interactivo donde la persona debe completar tareas específicas en una interfaz simulada, mientras se registran pasos, errores y feedback.",
            focus:
                "Qué tan intuitivo es el flujo de tareas, decisiones que toma el usuario y dificultades para alcanzar la meta.",
        },
        {
            id: "subjective",
            title: "5. Evaluación subjetiva",
            icon: HiEmojiHappy,
            to: "/subjective",
            desc:
                "Cuestionarios o escalas subjetivas para medir percepción de usabilidad, agrado, carga mental y satisfacción general.",
            focus:
                "Percepción global del sistema, comodidad, estética, confianza y preferencia del usuario.",
        },
    ];

    return (
        <div className="flex flex-col gap-8 p-8 min-h-screen bg-gray-900">
            <div className="max-w-7xl mx-auto w-full space-y-8">
                {/* Encabezado */}
                <header className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Laboratorio de evaluación de interfaces
                    </h1>
                    <p className="text-base text-gray-400 max-w-4xl leading-relaxed">
                        Esta aplicación reúne varios métodos de evaluación de usabilidad.
                        Cada módulo está aislado para que puedas practicar, registrar datos
                        y analizar resultados desde perspectivas distintas: heurística,
                        pruebas con usuarios, modelos predictivos, recorridos cognitivos y
                        evaluación subjetiva.
                    </p>
                </header>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                {/* Tarjetas de módulos */}
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <article
                                key={card.id}
                                className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col h-full shadow-lg hover:shadow-xl hover:border-gray-600 transition-all duration-200 group"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-white mb-1">
                                            {card.title}
                                        </h2>
                                        <p className="text-sm text-gray-400">
                                            {card.desc}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 mb-4 flex-1">
                                    <p className="text-sm text-gray-300">
                                        <span className="font-semibold text-blue-400">
                                            Se enfoca en:&nbsp;
                                        </span>
                                        {card.focus}
                                    </p>
                                </div>

                                <div className="mt-auto">
                                    <Link
                                        to={card.to}
                                        className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
                                    >
                                        Entrar al módulo →
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                {/* Flujo recomendado */}
                <section className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-8 space-y-5">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-white">
                            Sugerencia de flujo de uso
                        </h2>
                        <p className="text-sm text-gray-400 max-w-4xl leading-relaxed">
                            Puedes usar los módulos de forma independiente, pero si quieres
                            simular un proceso más completo de evaluación de una interfaz, este
                            es un posible orden:
                        </p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                    <ol className="space-y-4 text-sm text-gray-300">
                        <li className="flex gap-4">
                            <span className="flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg font-bold text-sm shrink-0">
                                1
                            </span>
                            <div className="flex-1">
                                <span className="font-semibold text-white">Métodos heurísticos:</span>{" "}
                                <span className="text-gray-400">
                                    revisa la interfaz con las heurísticas de Nielsen y registra
                                    problemas evidentes de diseño, consistencia, feedback, etc.
                                </span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg font-bold text-sm shrink-0">
                                2
                            </span>
                            <div className="flex-1">
                                <span className="font-semibold text-white">Pruebas en usuarios:</span>{" "}
                                <span className="text-gray-400">
                                    define tareas reales, observa cómo las ejecutan las personas,
                                    registra tiempos, errores y comentarios.
                                </span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg font-bold text-sm shrink-0">
                                3
                            </span>
                            <div className="flex-1">
                                <span className="font-semibold text-white">Modelos predictivos:</span>{" "}
                                <span className="text-gray-400">
                                    utiliza modelos como Fitts para estimar tiempos de selección y
                                    comparar alternativas de diseño desde una perspectiva más
                                    cuantitativa.
                                </span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg font-bold text-sm shrink-0">
                                4
                            </span>
                            <div className="flex-1">
                                <span className="font-semibold text-white">Recorridos cognitivos:</span>{" "}
                                <span className="text-gray-400">
                                    analiza paso a paso cómo un usuario intenta completar una tarea,
                                    qué decisiones debe tomar y en qué puntos la interfaz lo ayuda o
                                    lo confunde.
                                </span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg font-bold text-sm shrink-0">
                                5
                            </span>
                            <div className="flex-1">
                                <span className="font-semibold text-white">Evaluación subjetiva:</span>{" "}
                                <span className="text-gray-400">
                                    complementa los datos objetivos con la percepción del usuario:
                                    qué tanto le gustó la interfaz, qué tan difícil le pareció y qué
                                    tan dispuesto estaría a usarla nuevamente.
                                </span>
                            </div>
                        </li>
                    </ol>

                    <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent" />

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <p className="text-sm text-blue-300 leading-relaxed">
                            💡 <b>Tip:</b> Puedes repetir el ciclo después de proponer mejoras de diseño para
                            comparar resultados antes y después de los cambios.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
