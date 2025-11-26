
import { Progress } from "flowbite-react";
export function ProgressBar() {

    return (
        <Progress
            progress={45}
            progressLabelPosition="inside"
            textLabel="Flowbite"
            textLabelPosition="outside"
            size="lg"
            labelProgress
            labelText
        />
    );

}