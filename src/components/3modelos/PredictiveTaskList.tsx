import { List, ListItem } from "flowbite-react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import type { FittsTaskProgress } from "../../types/FittsTaskProgress";

type Props = {
    tasks: FittsTaskProgress;
}

export function PredictiveTaskList({ tasks }: Props) {

    const getIcon = (state: boolean) => state ? HiCheckCircle : HiXCircle;

    const getColorClass = (state: boolean) =>
        state ? "text-green-400" : "text-red-400";

    return (
        <List className="text-lg">
            <ListItem
                icon={getIcon(tasks.addButton)}
                className={getColorClass(tasks.addButton)}
            >
                Hacer clic en botón "Agregar TODO"
            </ListItem>

            <ListItem
                icon={getIcon(tasks.inputName)}
                className={getColorClass(tasks.inputName)}
            >
                Ingresar un nombre para el TODO
            </ListItem>

            <ListItem
                icon={getIcon(tasks.inputDescription)}
                className={getColorClass(tasks.inputDescription)}
            >
                Ingresar una descripción para el TODO
            </ListItem>
            <ListItem
                icon={getIcon(tasks.inputDate)}
                className={getColorClass(tasks.inputDate)}
            >
                Ingresar una fecha límite para completar el TODO
            </ListItem>
            <ListItem
                icon={getIcon(tasks.createButton)}
                className={getColorClass(tasks.createButton)}
            >
                Hacer clic en el botón "Guardar"
            </ListItem>
        </List>
    );
}
