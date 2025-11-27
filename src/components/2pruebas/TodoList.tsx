"use client";

import { Checkbox, Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import type { Todo } from "../../types/Todo";

type Props = {
    Todos: Todo[];
    handleCompletedTask?: (id: number) => void;
    handleEditTask?: (todo: Todo) => void;
    handleDeleteTask?: (todo: Todo) => void;
    disabled?: boolean;
}

export function TodoList({ Todos, handleCompletedTask, handleEditTask, handleDeleteTask, disabled }: Props) {

    return (
        <div className="overflow-x-auto  shadow-xl shadow-black">
            <Table hoverable>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>Nombre</TableHeadCell>
                        <TableHeadCell>Descripción</TableHeadCell>
                        <TableHeadCell>Fecha</TableHeadCell>
                        <TableHeadCell>Estado</TableHeadCell>
                        <TableHeadCell>Acciones</TableHeadCell>
                        <TableHeadCell className="flex flex-row p-4 gap-1">
                            Completada
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                    {
                        Todos.map(t => (
                            <TableRow key={t.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {t.name}
                                </TableCell>
                                <TableCell>{t.description}</TableCell>
                                <TableCell>{t.date}</TableCell>
                                <TableCell>{t.state}</TableCell>
                                <TableCell className="flex gap-3">
                                    <Button size="xs" disabled={typeof disabled === "boolean" ? disabled : t.state !== "pendiente"} onClick={() => handleEditTask?.(t)}>Editar</Button>
                                    <Button size="xs" disabled={disabled} color="red" onClick={() => handleDeleteTask?.(t)}>Borrar</Button>

                                </TableCell>
                                <TableCell className="content-center justify-center">
                                    <Checkbox
                                        disabled={disabled}
                                        checked={t.state === "completado"}
                                        onChange={() => handleCompletedTask?.(t.id)}
                                    />
                                </TableCell>

                            </TableRow>
                        ))
                    }


                </TableBody>
            </Table>
        </div>
    );
}