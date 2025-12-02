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
            to: "/roads/cognitivo",
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
        <div className="p-8 min-h-screen bg-slate-950 text-slate-50">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Laboratorio de evaluación de interfaces
                    </h1>
                    <p className="text-sm text-slate-400 max-w-2xl">
                        Esta aplicación reúne varios métodos de evaluación de usabilidad.
                        Cada módulo está aislado para que puedas practicar, registrar datos
                        y analizar resultados desde perspectivas distintas: heurística,
                        pruebas con usuarios, modelos predictivos, recorridos cognitivos y
                        evaluación subjetiva.
                    </p>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <article
                                key={card.id}
                                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col h-full shadow-sm hover:border-slate-600 transition"
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-blue-400">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold">{card.title}</h2>
                                        <p className="text-xs text-slate-400 mt-1">
                                            {card.desc}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-300 mt-2 mb-4 flex-1">
                                    <span className="font-semibold text-slate-200">
                                        Se enfoca en:&nbsp;
                                    </span>
                                    {card.focus}
                                </p>

                                <div className="mt-auto">
                                    <Link
                                        to={card.to}
                                        className="inline-flex items-center px-3 py-2 text-xs rounded-lg bg-blue-600 hover:bg-blue-700"
                                    >
                                        Entrar al módulo
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </section>
            </div>
        </div>
    );
}
