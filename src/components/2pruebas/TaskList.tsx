import { List, ListItem } from "flowbite-react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import type { TaskProgress } from "../../types/TaskProgress";

type Props = {
    tasks: TaskProgress;
}

export function TaskList({ tasks }: Props) {

    const getIcon = (state: boolean) => state ? HiCheckCircle : HiXCircle;

    const getColorClass = (state: boolean) =>
        state ? "text-green-400" : "text-red-400";

    return (
        <List className="text-lg">
            <ListItem
                icon={getIcon(tasks.create)}
                className={getColorClass(tasks.create)}
            >
                Crear un nuevo TODO
            </ListItem>

            <ListItem
                icon={getIcon(tasks.edit)}
                className={getColorClass(tasks.edit)}
            >
                Editar un TODO existente
            </ListItem>

            <ListItem
                icon={getIcon(tasks.delete)}
                className={getColorClass(tasks.delete)}
            >
                Eliminar un TODO existente
            </ListItem>
        </List>
    );
}
