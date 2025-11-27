"use client";
import { useState, useEffect, useRef } from "react";
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import type { Todo } from "../../types/Todo";
type Props = {
    todo: Todo | null;
    action: string;
    openModal?: boolean
    setOpenModal(openModal: boolean): void;
    onConfirmCreate(newTodo: Todo | null): void;
    onConfirmDelete(): void;
    onConfirmEdit(newTodo: Todo | null): void;
    completeTask?(task: string): void;
}

export function TodoModal({ todo, action, openModal, setOpenModal, onConfirmCreate, onConfirmEdit, onConfirmDelete, completeTask }: Props) {
    const nameInputRef = useRef<HTMLInputElement>(null);

    const [editModalData, setEditModalData] = useState({
        name: "",
        description: "",
        date: "",
        state: "pendiente",
    });

    useEffect(() => {
        if (todo) {
            setEditModalData({
                name: todo.name,
                description: todo.description,
                date: todo.date,
                state: "pendiente",
            });
        }
    }, [todo]);

    if (action === "create") {
        const handleConfirmSave = () => {
            const newTodo = { ...todo, ...editModalData };
            onConfirmCreate(newTodo);
            completeTask?.("createButton");
        };

        return (

            <>
                <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={nameInputRef}>
                    <ModalHeader />
                    <ModalBody>
                        <div className="space-y-6">
                            {todo && (
                                <>
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Crear TODO</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="name">Nombre</Label>
                                        </div>
                                        <TextInput id="name" ref={nameInputRef} placeholder="Nombre" required onChange={(e) => {
                                            setEditModalData(prev => ({ ...prev, name: e.target.value }));
                                            completeTask?.("inputName");
                                        }
                                        } />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="description">Descripción</Label>
                                        </div>
                                        <TextInput id="description" placeholder="Descripción" required onChange={(e) => {
                                            setEditModalData(prev => ({ ...prev, description: e.target.value }));
                                            completeTask?.("inputDescription");
                                        }
                                        } />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="fecha">Fecha</Label>
                                        </div>
                                        <TextInput id="fecha" placeholder="Fecha" required onChange={(e) => {
                                            setEditModalData(prev => ({ ...prev, date: e.target.value }));
                                            completeTask?.("inputDate");
                                        }
                                        } />
                                    </div>

                                    <div className="flex justify-center w-full gap-3">
                                        <Button onClick={handleConfirmSave}>Guardar</Button>
                                        <Button color="alternative" onClick={() => setOpenModal(false)}>Cancelar</Button>
                                    </div>
                                </>
                            )}

                        </div>
                    </ModalBody>
                </Modal>
            </>
        );
    }
    else if (action === "edit") {

        const handleConfirmEdit = () => {
            const updatedTodo = { ...todo, ...editModalData };
            onConfirmEdit(updatedTodo);
        };

        return (

            <>
                <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={nameInputRef}>
                    <ModalHeader />
                    <ModalBody>
                        <div className="space-y-6">
                            {todo && (
                                <>
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Editar: {todo.name}</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="name">Nombre</Label>
                                        </div>
                                        <TextInput id="name" ref={nameInputRef} placeholder={todo.name} required onChange={(e) =>
                                            setEditModalData(prev => ({ ...prev, name: e.target.value }))
                                        } />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="description">Descripción</Label>
                                        </div>
                                        <TextInput id="description" placeholder={todo.description} required onChange={(e) =>
                                            setEditModalData(prev => ({ ...prev, description: e.target.value }))
                                        } />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="fecha">Fecha</Label>
                                        </div>
                                        <TextInput id="fecha" placeholder={todo.date} required onChange={(e) =>
                                            setEditModalData(prev => ({ ...prev, date: e.target.value }))
                                        } />
                                    </div>

                                    <div className="flex justify-center w-full gap-3">
                                        <Button onClick={handleConfirmEdit}>Guardar</Button>
                                        <Button color="alternative" onClick={() => setOpenModal(false)}>Cancelar</Button>
                                    </div>
                                </>
                            )}

                        </div>
                    </ModalBody>
                </Modal>
            </>
        );
    }
    else if (action === "delete") {

        return (
            <>
                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <ModalHeader />
                    <ModalBody>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            {todo && (
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    ¿Estás seguro de eliminar este Todo: <span>{todo.name}</span>
                                    ?
                                </h3>
                            )}

                            <div className="flex justify-center gap-4">
                                <Button color="red" onClick={onConfirmDelete}>
                                    Sí, estoy seguro
                                </Button>
                                <Button color="alternative" onClick={() => setOpenModal(false)}>
                                    No, cancelar
                                </Button>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        );
    }
    else {
        return (<></>)
    }
}