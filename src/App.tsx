import { Suspense } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import { withAtomEffect } from "jotai-effect";
import { store } from "./store";

export function App() {
    return (
        <div className="text-sm flex flex-col gap-2">
            <h1 className="text-sm font-bold">Jotai</h1>
            <Demo1 />
            <Demo2 />
        </div>
    );
}

function Demo1() {
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

function Demo2() {
    const [userID, setUserID] = useAtom(userIDStateAtom);
    return (
        <div className="flex items-center gap-2">
            <select className="px-4 py-2 text-gray-800 bg-gray-200  rounded-md"
                value={userID}
                onChange={(e) => setUserID(Number(e.target.value))}
            >
                <option value={1}>User 1</option>
                <option value={2}>User 2</option>
                <option value={3}>User 3</option>
            </select>

            <Suspense fallback={<p>Loading...</p>}>
                <User />
            </Suspense>
        </div>
    );
}

const countStateAtom = atom(0);
const doubleCountStateAtom = atom((get) => get(countStateAtom) * 2);

const userIDStateAtom = withAtomEffect(atom(1),
    (get) => {
        const userID = get(userIDStateAtom);
        console.log(`userID set to ${userID}`);
    }
);

const userQueryAtom = atomFamily((id: number) =>
    atom(async () => {
        const response = await fetch(`/${id}.json`).then((res) => res.json());
        return response;
    })
);

function User() {
    const userID = useAtomValue(userIDStateAtom);
    const userPromise = useAtomValue(userQueryAtom(userID));
    return (
        <p className="flex items-center gap-2">
            <span className="text-orange-700">{userPromise?.name}</span>is loaded user name from json.
        </p>
    );
}
