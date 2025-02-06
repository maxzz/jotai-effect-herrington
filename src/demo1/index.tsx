import { Suspense } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import { withAtomEffect } from "jotai-effect";
import { store } from "../store";

export function Demo1() {
    const [count, setCount] = useAtom(countStateAtom);
    const doubleCount = useAtomValue(doubleCountStateAtom);
    return (<>
        <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md"
                onClick={() => setCount((count) => count + 1)}
            >
                count is {count}
            </button>
            <p>double count is {doubleCount}</p>
        </div>

        <div>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md"
                onClick={() => {
                    store.set(countStateAtom, (c) => c + 1);
                }}
            >
                Externally Increment
            </button>
        </div>
    </>
    );
}

const countStateAtom = atom(0);
const doubleCountStateAtom = atom((get) => get(countStateAtom) * 2);
