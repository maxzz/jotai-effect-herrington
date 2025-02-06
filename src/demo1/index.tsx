import { useEffect, type ComponentPropsWithoutRef } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { classNames } from "../utils";

import { store } from "../store";

export function Demo1({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const [count, setCount] = useAtom(countStateAtom);
    const doubleCount = useAtomValue(doubleCountStateAtom);

    const display = useAtomValue(displayAtom);

    useEffect(
        () => {
            const unsub = store.sub(countStateAtom,
                () => {
                    const str = `countStateAtom = ${store.get(countStateAtom)}, changed from useEffect`;
                    store.set(displayAtom, (display) => [...display, str]);
                },
            );
            return unsub;
        }, []
    );

    return (
        <div className={classNames("flex flex-col gap-2", className)} {...rest}>
            <div className="flex items-center gap-2">
                <button className={buttonClasses} onClick={() => setCount((count) => count + 1)} >
                    useAtom increment
                </button>

                <button className={buttonClasses} onClick={() => { store.set(countStateAtom, (c) => c + 1); }} >
                    External increment
                </button>
            </div>

            <div className="w-max grid grid-cols-[auto,auto] gap-x-2">
                <p>count is</p> {count}
                <p>double count is</p> {doubleCount}

                <p>display is</p>
                <div className="relative">
                    <button className={crossButtonClasses} onClick={() => store.set(displayAtom, [])}>✖</button>
                    <div className="whitespace-pre text-[0.65rem]">{JSON.stringify(display, null, 2)}</div>
                </div>
            </div>
        </div>
    );
}

const countStateAtom = atom(0);
const doubleCountStateAtom = atom((get) => get(countStateAtom) * 2);

const displayAtom = atom<string[]>([]);

const unsub = store.sub(countStateAtom,
    () => {
        const str = `countStateAtom = ${store.get(countStateAtom)}, changed from global scope`;
        store.set(displayAtom, (display) => [...display, str]);
    },
);

const buttonClasses = "px-4 py-2 text-white bg-blue-500 rounded-md active:scale-x-[.98]";
const crossButtonClasses = "absolute p-1 -top-0.5 -right-8 scale-[.7] bg-slate-700 rounded hover:bg-red-500";