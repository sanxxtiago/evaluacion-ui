import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { HiChartSquareBar, HiUser, HiHome, HiEmojiHappy, HiLightBulb, HiPuzzle } from "react-icons/hi";

export function LateralPanel() {
    const { pathname } = useLocation();

    const menuItems = [
        { path: "/", icon: HiHome, label: "Página principal" },
        { path: "/heuristics", icon: HiPuzzle, label: "1. Métodos heurísticos" },
        { path: "/users", icon: HiUser, label: "2. Pruebas en usuarios" },
        { path: "/models", icon: HiChartSquareBar, label: "3. Modelos predictivos" },
        { path: "/roads/cognitivo", icon: HiLightBulb, label: "4. Recorridos cognitivos" },
        { path: "/subjective", icon: HiEmojiHappy, label: "5. Evaluación subjetiva" },
    ];

    return (
        <div className="h-screen bg-gray-800 border-r border-gray-700">
            <Sidebar aria-label="sidebar" className="h-full bg-gray-800">
                {/* Header del sidebar */}
                <div className="px-4 py-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold text-white">Evaluación UI/UX</h1>
                    <p className="text-xs text-gray-400 mt-1">Sistema de evaluación</p>
                </div>

                <SidebarItems className="pt-4">
                    <SidebarItemGroup className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.path;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="block"
                                >
                                    <div
                                        className={`
                                            flex items-center gap-3 px-4 py-3 mx-2 rounded-lg
                                            transition-all duration-200 cursor-pointer
                                            ${isActive
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            }
                                        `}
                                    >
                                        <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </SidebarItemGroup>
                </SidebarItems>


            </Sidebar>
        </div>
    );
}