import { atom, useAtom, useAtomValue } from "jotai";
import { store } from "../store";

export function Demo1() {
    const [count, setCount] = useAtom(countStateAtom);
    const doubleCount = useAtomValue(doubleCountStateAtom);
    return (<>
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
    </>);
}

const countStateAtom = atom(0);
const doubleCountStateAtom = atom((get) => get(countStateAtom) * 2);
