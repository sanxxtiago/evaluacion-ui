import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiChartSquareBar, HiUser, HiHome, HiEmojiHappy, HiLightBulb, HiPuzzle } from "react-icons/hi";

export function LateralPanel() {
    return (
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
                            Métodos heurísticos
                        </Link>
                    </SidebarItem>

                    <SidebarItem icon={HiUser}>
                        <Link to="/users" className="w-full block">
                            Pruebas en usuarios
                        </Link>
                    </SidebarItem>
                    <SidebarItem icon={HiChartSquareBar}>
                        <Link to="/models" className="w-full block">
                            Modelos predictivos
                        </Link>
                    </SidebarItem>
                    <SidebarItem icon={HiLightBulb}>
                        <Link to="/roads" className="w-full block">
                            Recorridos cognitivos
                        </Link>
                    </SidebarItem>
                    <SidebarItem icon={HiEmojiHappy}>
                        <Link to="/subjective" className="w-full block">
                            Evaluación subjetiva
                        </Link>
                    </SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    );
}
