
import { Progress } from "flowbite-react";

type Props = {
    progressPercent: number;
}

export function ProgressBar({ progressPercent }: Props) {

    return (
        <Progress
            progress={progressPercent}
            progressLabelPosition="outside"
            textLabel="Progreso"
            textLabelPosition="outside"
            size="lg"
            labelProgress
            labelText
        />
    );

}