import type { FittsTaskProgress } from "./FittsTaskProgress";

export type FittsStep = {
    id: keyof FittsTaskProgress;   // ej: "addButton"
    selector: string;              // "#add-todo-btn"
    label?: string;                // "Agregar TODO" (opcional)
    result?: {
        distance: number;
        width: number;
        indexDifficulty: number;
        timeMs: number;
        targetCenter: { x: number; y: number };
    };
};
