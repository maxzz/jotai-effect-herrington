import { type ComponentPropsWithoutRef } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { store } from "../store";
import { classNames } from "../utils";

export function Demo1({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const [count, setCount] = useAtom(countStateAtom);
    const doubleCount = useAtomValue(doubleCountStateAtom);
    return (
        <div className={classNames("flex flex-col gap-2", className)} {...rest}>
            <div className="flex items-center gap-2">
                <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-md"
                    onClick={() => setCount((count) => count + 1)}
                >
                    useAtom increment
                </button>

                <button
                    className="px-4 py-2 text-white bg-red-500 rounded-md"
                    onClick={() => {
                        store.set(countStateAtom, (c) => c + 1);
                    }}
                >
                    External increment
                </button>
            </div>

            <div className="w-max grid grid-cols-[auto,auto] gap-x-2">
                <p>count is</p> {count}
                <p>double count is</p> {doubleCount}
            </div>
        </div>
    );
}

const countStateAtom = atom(0);
const doubleCountStateAtom = atom((get) => get(countStateAtom) * 2);
