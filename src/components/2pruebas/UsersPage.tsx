"use client";

import { useEffect, useState } from "react";
import TodoData from "../../resources/json/TODO.json";
import type { Todo } from "../../types/Todo";
import { TaskList } from "./TaskList";
import { ProgressBar } from "./ProgressBar";
import { TodoList } from "./TodoList";
import { TodoModal } from "./TodoModal";
import { Button, ButtonGroup } from "flowbite-react";
import { HiPlusCircle } from "react-icons/hi";
import type { TaskProgress } from "../../types/TaskProgress";

export function Users() {

    const [todos, setTodos] = useState<Todo[]>(TodoData.todos);
    const [openModal, setOpenModal] = useState(false);
    const [modalAction, setModalAction] = useState("edit");
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    const [progressTasks, setProgressTasks] = useState<TaskProgress>({
        create: false,
        edit: false,
        delete: false,
    });

    const [progressPercent, setProgressTasksPercent] = useState<number>(0)

    const completeTask = (task: keyof TaskProgress) => {
        setProgressTasks(prev => ({
            ...prev,
            [task]: true,
        }))
    };

    useEffect(() => {

        const total = Object.keys(progressTasks).length; // 3
        const done = Object.values(progressTasks).filter(v => v).length;
        setProgressTasksPercent(done / total * 100);

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

    const handleEditTask = (todo: Todo) => {
        //Filtra y se queda con todos los que no tienen el id a borrar
        //setTodos(prev => prev.filter(t => t.id !== id));
        setSelectedTodo(todo);
        setModalAction("edit");
        setOpenModal(true);

    };

    const handleDeleteTask = (todo: Todo) => {
        //Filtra y se queda con todos los que no tienen el id a borrar
        //setTodos(prev => prev.filter(t => t.id !== id));
        setSelectedTodo(todo);
        setModalAction("delete");
        setOpenModal(true);
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
        <div className="flex flex-col justify-center gap-6">
            <h1>Hola usuarios</h1>

            <TaskList tasks={progressTasks}></TaskList>
            <ProgressBar progressPercent={progressPercent}></ProgressBar>

            <ButtonGroup>
                <Button color="alternative">
                    <HiPlusCircle className="me-2 h-4 w-4" />
                    Add TODO
                </Button>
            </ButtonGroup>
            <TodoList
                Todos={todos}
                handleCompletedTask={handleCompletedTodo}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
            ></TodoList>
            <TodoModal
                todo={selectedTodo}
                action={modalAction}
                openModal={openModal}
                setOpenModal={setOpenModal}
                onConfirmEdit={onConfirmEdit}
                onConfirmDelete={onConfirmDelete}

            ></TodoModal>

        </div>
    );

}