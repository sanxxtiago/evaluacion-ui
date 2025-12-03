import { Outlet, useLocation } from "react-router-dom";
import { LateralPanel } from "../components/LateralPanel";

export function MainLayout() {
    const { pathname } = useLocation();

    // Mapea rutas → número de step
    const stepMap: Record<string, number> = {
        "/heuristics": 1,
        "/users": 2,
        "/models": 3,
        "/roads/cognitivo": 4,
        "/subjective": 5,
    };

    const currentStep = stepMap[pathname] ?? 0;

    return (
        <div className="bg-gray-900 flex flex-row h-screen">
            <LateralPanel />

            <div className="flex flex-col w-full content-stretch">

                {/* Stepper según sección */}
                <div className="bg-gray-800 py-3 px-10 pr-12">
                    <ol className="flex items-center w-full">
                        {[1, 2, 3, 4, 5].map((step, i) => {
                            const active = step <= currentStep;
                            const isLast = i === 4;

                            return (
                                <li key={step} className={`flex items-center ${!isLast ? 'flex-1' : ''}`}>
                                    {/* Bolita del step */}
                                    <div
                                        className={
                                            "flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full shrink-0 " +
                                            (active
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-700 text-gray-300")
                                        }
                                    >
                                        {step}
                                    </div>

                                    {/* Línea conectora (excepto en el último) */}
                                    {!isLast && (
                                        <div
                                            className={
                                                "flex-1 h-0.5 mx-3 rounded-full " +
                                                (active ? "bg-blue-400" : "bg-gray-600")
                                            }
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>

                <div className="flex-1 overflow-auto p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}