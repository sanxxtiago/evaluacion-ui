"use client";

import { useEffect, useState } from "react";
import TodoData from "../../resources/json/TODO.json";
import type { Todo } from "../../types/Todo";
import { TaskList } from "./TaskList";
import { ProgressBar } from "./ProgressBar";
import { TodoList } from "./TodoList";
import { TodoModal } from "./TodoModal";
import { Button, ButtonGroup, Spinner } from "flowbite-react";
import { HiPlusCircle, HiCheckCircle } from "react-icons/hi";
import type { TaskProgress } from "../../types/TaskProgress";

export function Users() {

    const [todos, setTodos] = useState<Todo[]>(TodoData.todos);
    const [openModal, setOpenModal] = useState(false);
    const [modalAction, setModalAction] = useState("edit");
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    const [showFinalScreen, setShowFinalScreen] = useState(false);
    const [loadingFinish, setLoadingFinish] = useState(false);

    const [progressTasks, setProgressTasks] = useState<TaskProgress>({
        create: false,
        edit: false,
        delete: false,
    });

    const [progressPercent, setProgressTasksPercent] = useState<number>(0)

    // métricas
    const [clicks, setClicks] = useState(0);
    const [errors, setErrors] = useState(0);
    const [startTime] = useState(Date.now());
    const [finishTime, setFinishTime] = useState<number | null>(null);

    const completeTask = (task: keyof TaskProgress) => {
        setProgressTasks(prev => ({
            ...prev,
            [task]: true,
        }))
    };

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
        }
    }, [progressTasks])

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
        setSelectedTodo(todo);
        setModalAction("create");
        setOpenModal(true);
    }

    const handleEditTask = (todo: Todo) => {
        setSelectedTodo(todo);
        setModalAction("edit");
        setOpenModal(true);
    };

    const handleDeleteTask = (todo: Todo) => {
        setSelectedTodo(todo);
        setModalAction("delete");
        setOpenModal(true);
    };

    const onConfirmCreate = (newTodo: Todo) => {
        const lastId = todos.length > 0 ? todos[todos.length - 1].id : 0;
        const todo = {
            ...newTodo,
            id: lastId + 1,
            state: "pendiente",
        };
        setTodos(prev => [...prev, todo]);
        setOpenModal(false);
        completeTask("create");
        setSelectedTodo(null);
    };

    const onConfirmEdit = (updatedTodo: Todo) => {
        setTodos(prev =>
            prev.map(t =>
                t.id === updatedTodo.id ? updatedTodo : t
            )
        );
        setOpenModal(false);
        completeTask("edit");
        setSelectedTodo(null);
    };

    const onConfirmDelete = () => {
        setTodos(prev => prev.filter(t => t.id !== selectedTodo?.id));
        setOpenModal(false);
        completeTask("delete");
        setSelectedTodo(null);
    };

    return (
        <div className="flex flex-col gap-6 p-8 min-h-screen bg-gray-900">
            {/* Header Section */}
            <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-bold text-white">Pruebas con usuarios</h3>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    En este módulo simulas una evaluación heurística sobre pantallas de
                    ejemplo. Interactúa con los mockups, detecta problemas de usabilidad,
                    asígnales una heurística y una severidad y luego revisa el resumen de
                    hallazgos.
                </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

            {/* Progress Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <HiCheckCircle className="w-6 h-6 text-blue-400" />
                    <h2 className="text-xl font-semibold text-white">Completa las siguientes tareas</h2>
                </div>
                <TaskList tasks={progressTasks} />
                <ProgressBar progressPercent={progressPercent} />
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

            {showFinalScreen ? (
                /* Pantalla Final */
                <div className="flex flex-col items-center gap-6 mt-8">
                    <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
                            <HiCheckCircle className="w-12 h-12 text-green-400" />
                        </div>
                        <h2 className="text-4xl font-bold text-white">¡100% completado!</h2>
                        <p className="text-lg text-gray-400">Resultados de la evaluación</p>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 w-full max-w-md space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between py-3 border-b border-gray-700">
                            <span className="text-gray-400 flex items-center gap-2">
                                <span className="text-2xl">⏱️</span> Tiempo total
                            </span>
                            <span className="text-xl font-bold text-white">
                                {((finishTime! - startTime) / 1000).toFixed(2)}s
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-700">
                            <span className="text-gray-400 flex items-center gap-2">
                                <span className="text-2xl">🖱️</span> Clics realizados
                            </span>
                            <span className="text-xl font-bold text-white">{clicks}</span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <span className="text-gray-400 flex items-center gap-2">
                                <span className="text-2xl">❌</span> Errores cometidos
                            </span>
                            <span className="text-xl font-bold text-white">{errors}</span>
                        </div>
                    </div>
                </div>
            ) : loadingFinish ? (
                /* Spinner de carga */
                <div className="flex flex-col items-center gap-6 mt-12">
                    <Spinner color="success" size="xl" aria-label="Loading final..." />
                    <h3 className="text-green-400 text-2xl font-semibold">Cargando resultados...</h3>
                </div>
            ) : (
                /* Interfaz de TODO */
                <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-6 space-y-6">
                    <ButtonGroup>
                        <Button
                            className="shadow-lg hover:shadow-xl transition-shadow"
                            color="blue"
                            onClick={(todo) => { registerClick(); handleCreateTask(todo); }}
                        >
                            <HiPlusCircle className="mr-2 h-5 w-5" />
                            Agregar TODO
                        </Button>
                    </ButtonGroup>

                    <TodoList
                        Todos={todos}
                        handleCompletedTask={(id) => { registerClick(); handleCompletedTodo(id); }}
                        handleEditTask={(todo) => { registerClick(); handleEditTask(todo); }}
                        handleDeleteTask={(todo) => { registerClick(); handleDeleteTask(todo); }}
                    />

                    <TodoModal
                        todo={selectedTodo}
                        action={modalAction}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        onConfirmCreate={(todo) => { registerClick(); onConfirmCreate(todo); }}
                        onConfirmEdit={(todo) => { registerClick(); onConfirmEdit(todo); }}
                        onConfirmDelete={() => { registerClick(); onConfirmDelete(); }}
                    />
                </div>
            )}
        </div>
    );
}