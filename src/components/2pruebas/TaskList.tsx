

"use client";

import { List, ListItem } from "flowbite-react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export function TaskList() {
    return (
        <List>
            <ListItem icon={HiXCircle}>Crear un nuevo TODO</ListItem>
            <ListItem icon={HiXCircle}>Editar un TODO existente</ListItem>
            <ListItem icon={HiXCircle}>Eliminar un TODO existente</ListItem>
        </List>
    );
}
