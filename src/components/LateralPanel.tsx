import { Button, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiChartSquareBar, HiUser, HiHome, HiEmojiHappy, HiLightBulb, HiPuzzle } from "react-icons/hi";

export function LateralPanel() {
    return (
        <div className="flex flex-row" >
            <div className="flex flex-col h-screen">

            </div>
            <div className="h-screen">
                <Sidebar aria-label="sidebar">
                    <SidebarItems>
                        <SidebarItemGroup>

                            <SidebarItem icon={HiHome}>
                                <Link to="/" className="w-full block">
                                    Página principal
                                </Link>
                            </SidebarItem>

                            <SidebarItem icon={HiPuzzle}>
                                <Link to="/heuristics" className="w-full block">
                                    1. Métodos heurísticos
                                </Link>
                            </SidebarItem>

                            <SidebarItem icon={HiUser}>
                                <Link to="/users" className="w-full block">
                                    2. Pruebas en usuarios
                                </Link>
                            </SidebarItem>
                            <SidebarItem icon={HiChartSquareBar}>
                                <Link to="/models" className="w-full block">
                                    3. Modelos predictivos
                                </Link>
                            </SidebarItem>
                            <SidebarItem icon={HiLightBulb}>
                                <Link to="/roads" className="w-full block">
                                    4. Recorridos cognitivos
                                </Link>
                            </SidebarItem>
                            <SidebarItem icon={HiEmojiHappy}>
                                <Link to="/subjective" className="w-full block">
                                    5. Evaluación subjetiva
                                </Link>
                            </SidebarItem>
                        </SidebarItemGroup>
                    </SidebarItems>
                </Sidebar>
            </div>
        </div>
    );
}
