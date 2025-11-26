// Layout.tsx
import { Outlet } from "react-router-dom";
import { LateralPanel } from "../components/LateralPanel";

export function MainLayout() {
    return (
        <div className="bg-blue-950 flex flex-row h-screen">
            <LateralPanel />
            <div className="flex-1 overflow-auto p-4">
                <Outlet />
            </div>
        </div>
    );
}
