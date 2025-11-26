"use client";

import { List, ListItem } from "flowbite-react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import type { TaskProgress } from "../../types/TaskProgress";

type Props = {
    tasks: TaskProgress;
}

export function TaskList({ tasks }: Props) {

    const getIcon = (taskState: boolean) => {
        if (taskState) {
            return HiCheckCircle;
        }
        return HiXCircle;
    }

    return (
        <List>
            <ListItem icon={getIcon(tasks.create)}>Crear un nuevo TODO</ListItem>
            <ListItem icon={getIcon(tasks.edit)}>Editar un TODO existente</ListItem>
            <ListItem icon={getIcon(tasks.delete)}>Eliminar un TODO existente</ListItem>
        </List>
    );
}
