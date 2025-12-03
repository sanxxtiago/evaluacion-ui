import { Label, Radio } from "flowbite-react";

type Props = {
    name: string;
    startLabel: string;
    finalLabel: string;
    value: number | null;
    onChange: (val: number) => void;
};

export function AttrakDiffSelector({ name, startLabel, finalLabel, value, onChange }: Props) {

    return (
        <div className="flex justify-between items-center bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg px-5 py-3 gap-4 mt-2">

            <p className="leading-none w-32 text-left">
                {startLabel}
            </p>

            <div className="flex justify-center gap-4 flex-1">
                {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="flex flex-col items-center gap-1">
                        <Radio
                            id={`${name}-${n}`}
                            name={name}
                            value={n}
                            checked={value === n}
                            onChange={() => onChange(n)}
                        />
                        <Label htmlFor={`${name}-${n}`} className="text-center">{n}</Label>
                    </div>
                ))}
            </div>

            <p className="leading-none w-32 text-right">
                {finalLabel}
            </p>
        </div>
    );
}
