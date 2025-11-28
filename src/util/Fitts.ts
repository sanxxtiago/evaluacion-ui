export function computeFitts(distance: number, width: number) {
    const a = 10;   // constante base, puedes ajustar
    const b = 10;  // sensibilidad (ms por bit)

    const ID = Math.log2((distance / width) + 1);
    const MT = a + b * ID;

    return {
        distance,
        width,
        indexDifficulty: ID,
        timeMs: MT,
    };
}

export function getElementCenter(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
    };
}



export function getTargetMetrics(selector: string) {
    const el = document.querySelector(selector) as HTMLElement | null;
    if (!el) return null;

    const rect = el.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const width = Math.min(rect.width, rect.height); // objetivo mínimo

    return { centerX, centerY, width, element: el };
}
