"use client";

import { useEffect, useState } from "react";
import TodoData from "../../resources/json/TODO.json";
import type { Todo } from "../../types/Todo";
import { PredictiveTaskList } from "./PredictiveTaskList";
import { ProgressBar } from "../2pruebas/ProgressBar";
import { TodoList } from "../2pruebas/TodoList";
import { TodoModal } from "../2pruebas/TodoModal";
import { Button, ButtonGroup, Spinner } from "flowbite-react";
import { HiPlusCircle } from "react-icons/hi";
import type { FittsTaskProgress } from "../../types/FittsTaskProgress";
import type { FittsStep } from "../../types/FittsStep";
import { computeFitts, getElementCenter, getTargetMetrics } from "../../util/Fitts";
export function FittsModelPage() {

    const [todos, setTodos] = useState<Todo[]>(TodoData.todos);
    const [openModal, setOpenModal] = useState(false);
    const [modalAction, setModalAction] = useState("edit");
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    const [showFinalScreen, setShowFinalScreen] = useState(false);
    const [loadingFinish, setLoadingFinish] = useState(false);

    const [progressTasks, setProgressTasks] = useState<FittsTaskProgress>({
        addButton: false,
        inputName: false,
        inputDescription: false,
        inputDate: false,
        createButton: false,
    });

    const [progressPercent, setProgressTasksPercent] = useState<number>(0)

    // métricas
    const [clicks, setClicks] = useState(0);
    const [errors, setErrors] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [finishTime, setFinishTime] = useState<number | null>(null);

    // simulación
    const [simulationRunning, setSimulationRunning] = useState(false);
    const [simulationResult, setSimulationResult] = useState({
        totalTimeMs: 0,
        totalClicks: 0,
        steps: [] as FittsStep[],
    });

    const fittsSteps: FittsStep[] = [
        {
            id: "addButton",
            selector: '[data-fitts="add"]',
            label: "Abrir formulario"
        },
        {
            id: "inputName",
            selector: '[data-fitts="name"]',
            label: "Escribir nombre del TODO"
        },
        {
            id: "inputDescription",
            selector: '[data-fitts="desc"]',
            label: "Escribir descripción"
        },
        {
            id: "inputDate",
            selector: '[data-fitts="date"]',
            label: "Seleccionar fecha"
        },
        {
            id: "createButton",
            selector: '[data-fitts="create"]',
            label: "Crear TODO"
        }
    ];

    const [progress, setProgress] = useState<FittsTaskProgress>({
        addButton: false,
        inputName: false,
        inputDescription: false,
        inputDate: false,
        createButton: false,
    });

    async function runFittsSimulation() {
        let totalClicks = 0;
        let totalTime = 0;

        const cursor = document.getElementById("cursor-sim");
        if (!cursor) {
            console.warn("Cursor no encontrado (id=cursor-sim)");
            return;
        }

        // Helper: espera ms
        const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

        // Helper: simula tipeo en un input (espera entre caracteres)
        async function simulateTyping(inputEl: HTMLInputElement, text: string, delay = 90) {
            inputEl.focus();
            inputEl.value = ""; // start clean
            for (let i = 0; i < text.length; i++) {
                inputEl.value += text[i];
                // dispatch input/change for React controlled inputs
                inputEl.dispatchEvent(new Event("input", { bubbles: true }));
                inputEl.dispatchEvent(new Event("change", { bubbles: true }));
                await wait(delay);
            }
            inputEl.blur();
        }

        for (const step of fittsSteps) {
            const el = document.querySelector(step.selector) as HTMLElement | null;
            if (!el) {
                console.warn("Elemento no encontrado:", step.selector);
                continue;
            }

            // centro del target
            const { x, y, width } = getElementCenter(el);

            // centro actual del cursor simulado
            const cursorRect = cursor.getBoundingClientRect();
            const currentX = cursorRect.left + cursorRect.width / 2;
            const currentY = cursorRect.top + cursorRect.height / 2;

            const distance = Math.hypot(x - currentX, y - currentY);

            // fitts law
            const metrics = computeFitts(distance, width);

            step.result = {
                ...metrics,
                targetCenter: { x, y },
            };

            totalTime += metrics.timeMs;

            // animar hacia el target
            await animateCursorTo(cursor, { x, y }, metrics.timeMs);

            // ---- aquí ejecutamos la acción real ----
            // 1) hacemos click en el elemento (esto activará handlers → abrir modal, etc.)
            try {
                // preferimos llamar al handler nativo si existe
                (el as HTMLElement).click();
            } catch (err) {
                // fallback dispatch
                el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            }
            totalClicks++;
            setClicks(c => c + 1);

            // 2) Pequeña espera para que DOM se actualice (e.g. modal aparezca)
            await wait(200);

            // 3) Si el paso es un input, rellenarlo automáticamente:
            if (step.id === "inputName") {
                const input = document.querySelector('[data-fitts="name"]') as HTMLInputElement | null;
                if (input) {
                    await simulateTyping(input, "Mi TODO automático");
                } else {
                    console.warn("Input name no encontrado después de abrir modal");
                }
            }

            if (step.id === "inputDescription") {
                const input = document.querySelector('[data-fitts="desc"]') as HTMLInputElement | null;
                if (input) {
                    await simulateTyping(input, "Descripción generada por simulación");
                } else {
                    console.warn("Input desc no encontrado");
                }
            }

            if (step.id === "inputDate") {
                // Si tu fecha es un input tipo date o un picker, intenta setear value y despachar eventos
                const input = document.querySelector('[data-fitts="date"]') as HTMLInputElement | null;
                if (input) {
                    // ejemplo: YYYY-MM-DD
                    const value = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
                    input.focus();
                    //input.value = value;
                    await simulateTyping(input, value.toString());
                    input.dispatchEvent(new Event("input", { bubbles: true }));
                    input.dispatchEvent(new Event("change", { bubbles: true }));
                    await wait(1000);
                    input.blur();
                } else {
                    console.warn("Input date no encontrado");
                }
            }

            // Si paso es "createButton", click al botón guardar dentro del modal
            if (step.id === "createButton") {
                // puede que el botón tenga el mismo selector que definiste ('[data-fitts="create"]')
                const createEl = document.querySelector(step.selector) as HTMLElement | null;
                if (createEl) {
                    // mover cursor visualmente al botón del modal (recalc centro por si cambió)
                    const { x: cx, y: cy } = getElementCenter(createEl);
                    await animateCursorTo(cursor, { x: cx, y: cy }, 200);
                    try {
                        createEl.click();
                    } catch {
                        createEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
                    }
                    totalClicks++;
                    setClicks(c => c + 1);
                    // marca paso completado
                    const newTodo: Todo = {
                        id: 1000,
                        name: "Mi TODO automático",
                        description: "Descripción generada por simulación",
                        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
                        state: "pendiente"
                    }
                    onConfirmCreate(newTodo);
                    await wait(200);
                } else {
                    console.warn("Botón crear no encontrado al final");
                }
            }

            // espera breve antes de seguir al siguiente paso
            await wait(120);


            completeTask(step.id);
        }

        setSimulationResult({
            totalTimeMs: totalTime,
            totalClicks,
            steps: fittsSteps,
        });
    }


    function animateCursorTo(cursor: HTMLElement, target: { x: number, y: number }, duration: number) {
        return new Promise<void>((resolve) => {
            const start = performance.now();
            const rect = cursor.getBoundingClientRect();

            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;

            function step(now: number) {
                const t = Math.min((now - start) / duration, 1);

                const newX = startX + (target.x - startX) * t;
                const newY = startY + (target.y - startY) * t;

                cursor.style.left = `${newX}px`;
                cursor.style.top = `${newY}px`;

                if (t < 1) {
                    requestAnimationFrame(step);
                } else {
                    resolve();
                }
            }

            requestAnimationFrame(step);
        });
    }




    //-------------->

    const completeTask = (task: keyof FittsTaskProgress) => {
        if (!simulationRunning)
            return;

        setProgressTasks(prev => ({
            ...prev,
            [task]: true,
        }))
    };

    const resetTaskList = () => {
        setProgressTasks({
            addButton: false,
            inputName: false,
            inputDescription: false,
            inputDate: false,
            createButton: false,
        })
    }

    const registerClick = () => setClicks(c => c + 1);


    useEffect(() => {

        const total = Object.keys(progressTasks).length; // 3
        const done = Object.values(progressTasks).filter(v => v).length;
        const result = done / total * 100;
        setProgressTasksPercent(parseFloat(result.toFixed(2)));
        if (result === 100 && !showFinalScreen) {
            setLoadingFinish(true);               // activa spinner
            setFinishTime(Date.now());           // tiempo final

            setTimeout(() => {
                setLoadingFinish(false);
                setShowFinalScreen(true);        // muestra pantalla final
            }, 1000); // 1 segundo
            setSimulationRunning(false);

        }
    }, [progressTasks]);

    useEffect(() => {

        if (simulationRunning) {
            runFittsSimulation();
        }
    }, [simulationRunning]);



    const handleCompletedTodo = (id: number) => {
        setTodos(prev =>
            prev.map(t =>
                t.id === id
                    ? { ...t, state: t.state === "pendiente" ? "completado" : "pendiente" }
                    : t
            )
        );
    };

    const handleCreateTask = (todo: Todo) => {
        completeTask("addButton");
        setSelectedTodo(todo);
        setModalAction("create");
        setOpenModal(true);
    }

    const handleEditTask = (todo: Todo) => {
        //Filtra y se queda con todos los que no tienen el id a borrar
        setSelectedTodo(todo);
        setModalAction("edit");
        setOpenModal(true);

    };

    const handleDeleteTask = (todo: Todo) => {
        //Filtra y se queda con todos los que no tienen el id a borrar
        setSelectedTodo(todo);
        setModalAction("delete");
        setOpenModal(true);
    };

    const onConfirmCreate = (newTodo: Todo) => {
        const lastId = todos.length > 0 ? todos[todos.length - 1].id : 0;
        const todo = {
            ...newTodo,
            id: lastId + 1,
            state: "pendiente", // por si quieres setearlo por defecto
        };
        console.log(todo)
        setTodos(prev => [...prev, todo]);
        setOpenModal(false);
        setSelectedTodo(null);
    };

    const onConfirmEdit = (updatedTodo: Todo) => {
        setTodos(prev =>
            prev.map(t =>
                t.id === updatedTodo.id ? updatedTodo : t
            )
        );
        setOpenModal(false);
        setSelectedTodo(null);
    };


    const onConfirmDelete = () => {
        setTodos(prev => prev.filter(t => t.id !== selectedTodo?.id));
        setOpenModal(false);
        setSelectedTodo(null);
    };

    return (
        <div className="flex flex-col justify-center gap-6">
            <h1 className="text-amber-50 mt-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">Modelo predictivo de Fitts</h1>
            {/* interfaz normal mientras no termine */}
            <div className="flex flex-col justify-center gap-3 rounded-2xl border-2 shadow-xl shadow-gray-800 border-gray-700 box-border p-7">
                <h2 className="text-xl text-amber-50 font-semibold">(Simulación) Completa las siguientes tareas:</h2>
                <PredictiveTaskList tasks={progressTasks} />
                <ProgressBar progressPercent={progressPercent} />
                <Button
                    color="alternative"
                    disabled={simulationRunning}
                    onClick={() => {
                        resetTaskList();
                        setSimulationRunning(true);
                        setShowFinalScreen(false);
                        setStartTime(Date.now());
                        setClicks(0);
                        setErrors(0);
                        setFinishTime(null);
                    }}
                >
                    Iniciar simulación
                </Button>

            </div>
            <hr class="h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            {/* si ya terminó → mostrar métricas */}
            {showFinalScreen ? (
                <div className="text-center text-amber-100 flex flex-col gap-4 mt-6">
                    <h2 className="text-3xl font-semibold">¡100% completado!</h2>

                    <p className="text-lg">Resultados de la evaluación:</p>

                    <div className="bg-slate-800 p-4 rounded-lg text-left mx-auto w-fit shadow-lg shadow-amber-900/20">
                        <p>⏱️ Tiempo total: {(finishTime! - startTime) / 1000}s</p>
                        <p>🖱️ Clics realizados: {clicks}</p>
                        <p>❌ Errores cometidos: {errors}</p>
                    </div>
                </div>
            ) : loadingFinish ? (

                /* spinner 1 segundo */
                <div className="flex flex-col text-center gap-3">

                    <h3 className="text-green-400 text-3xl font-bold text-heading">Cargando resultados...</h3>
                    <Spinner color="success" size="xl" aria-label="Loading final..." />
                </div>

            ) : (
                <>

                    <div className="flex flex-col gap-6">
                        <ButtonGroup>
                            <Button
                                // disabled={simulationRunning}
                                data-fitts="add"
                                id="btn-add-todo"
                                className="shadow-lg shadow-gray-950"
                                color="alternative"
                                onClick={(todo) => { registerClick(); handleCreateTask(todo); }}
                            >
                                <HiPlusCircle className="me-2 h-5 w-5" />
                                Agregar TODO
                            </Button>
                        </ButtonGroup>

                        <TodoList
                            Todos={todos}
                            handleCompletedTask={(id) => { registerClick(); handleCompletedTodo(id); }}
                            handleEditTask={(todo) => { registerClick(); handleEditTask(todo); }}
                            handleDeleteTask={(todo) => { registerClick(); handleDeleteTask(todo); }}
                            disabled={simulationRunning}
                        />

                        <TodoModal
                            todo={selectedTodo}
                            action={modalAction}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            onConfirmCreate={(todo) => { registerClick(); onConfirmCreate(todo); }}
                            onConfirmEdit={(todo) => { registerClick(); onConfirmEdit(todo); }}
                            onConfirmDelete={() => { registerClick(); onConfirmDelete(); }}
                            completeTask={completeTask}
                        />
                    </div>
                </>
            )}
            {simulationRunning && (
                <div

                    id="cursor-sim"
                    style={{
                        position: "fixed",
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "red",
                        pointerEvents: "none",
                        top: "100px",
                        left: "100px",
                        zIndex: 9999,
                    }}
                ></div>
            )}

        </div>
    );

}