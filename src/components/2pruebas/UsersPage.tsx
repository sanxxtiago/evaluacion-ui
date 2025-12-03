"use client";

import { useEffect, useState } from "react";
import TodoData from "../../resources/json/TODO.json";
import type { Todo } from "../../types/Todo";
import { TaskList } from "./TaskList";
import { ProgressBar } from "./ProgressBar";
import { TodoList } from "./TodoList";
import { TodoModal } from "./TodoModal";
import { Button, ButtonGroup, Spinner } from "flowbite-react";
import { HiPlusCircle } from "react-icons/hi";
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
        <div className="flex flex-col justify-center gap-2 p-8 text-slate-50 min-h-screen bg-slate-950">
            <h3 className="text-3xl md:text-4xl font-bold">Pruebas con usuarios</h3>
            {/* interfaz normal mientras no termine */}
            <p className="text-sm text-slate-300 max-w-2xl">
                En este módulo simulas una evaluación heurística sobre pantallas de
                ejemplo. Interactúa con los mockups, detecta problemas de usabilidad,
                asígnales una heurística y una severidad y luego revisa el resumen de
                hallazgos.
            </p>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg p-5 mt-4">
                <h2 className="text-xl font-semibold text-slate-50">Completa las siguientes tareas:</h2>
                <TaskList tasks={progressTasks} />
                <ProgressBar progressPercent={progressPercent} />

            </div>
            <hr class="h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10 m-4" />
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

                    <div className="flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg p-5 gap-5">
                        <ButtonGroup>
                            <Button className="shadow-lg shadow-gray-950" color="alternative" onClick={(todo) => { registerClick(); handleCreateTask(todo); }}>
                                <HiPlusCircle className="me-2 h-5 w-5" />
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
                </>
            )}
        </div>
    );

}