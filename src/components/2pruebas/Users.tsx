"use client";

import { useEffect, useState } from "react";
import TodoData from "../../resources/json/TODO.json";
import type { Todo } from "../../types/Todo";
import { TaskList } from "./TaskList";
import { ProgressBar } from "./ProgressBar";
import { TodoList } from "./TodoList";
import { TodoModal } from "./TodoModal";
export function Users() {

    const [todos, setTodos] = useState<Todo[]>(TodoData.todos);
    const [progress, setProgress] = useState<number>();
    const [openModal, setOpenModal] = useState(false);
    const [modalAction, setModalAction] = useState("edit");
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    useEffect(() => {
        console.log(todos);

    }, [todos])


    const handleCompletedTask = (id: number) => {
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

    const onConfirmEdit = () => {
        setOpenModal(false);
    }

    const onConfirmDelete = () => {
        setTodos(prev => prev.filter(t => t.id !== selectedTodo?.id));
        setOpenModal(false);
        setSelectedTodo(null);
    }



    return (
        <div className="flex flex-col gap-6">
            <h1>Hola usuarios</h1>
            <TaskList></TaskList>
            <ProgressBar></ProgressBar>
            <TodoList
                Todos={todos}
                handleCompletedTask={handleCompletedTask}
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