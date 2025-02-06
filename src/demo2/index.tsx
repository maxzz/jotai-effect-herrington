import { type ComponentPropsWithoutRef, Suspense } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import { withAtomEffect } from "jotai-effect";
import { classNames } from "../utils";

export function Demo2({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
    const [userID, setUserID] = useAtom(userIDStateAtom);
    return (
        <div className={classNames("flex items-center gap-4", className)} {...rest}>
            <select className="px-4 py-2 text-gray-800 bg-gray-200  rounded-md"
                value={userID}
                onChange={(e) => setUserID(Number(e.target.value))}
            >
                <option value={1}>User 1</option>
                <option value={2}>User 2</option>
                <option value={3}>User 3</option>
            </select>

            <Suspense fallback={<p></p>}>
                <User />
            </Suspense>
        </div>
    );
}

function User() {
    const userID = useAtomValue(userIDStateAtom);
    const userPromise = useAtomValue(userQueryAtom(userID));
    return (
        <p className="flex items-center gap-1">
            <span className="text-green-500">{userPromise?.name}</span>is loaded user name from json.
        </p>
    );
}

const userIDStateAtom = withAtomEffect(atom(1),
    (get) => {
        const userID = get(userIDStateAtom);
        console.log(`userID set to ${userID}`);
    }
);

const userQueryAtom = atomFamily((id: number) =>
    atom(async () => {
        // let path = '/';
        // const isLocalhost = window.location.hostname === "localhost";
        // if (!isLocalhost) {
        //     path = location.pathname;
        // }

        const path = location.pathname;
        const url = `${path}/${id}.json`.replaceAll('//', '/');
        console.log(`url "${url}"`);
        
        const response = await fetch(url).then((res) => res.json());
        return response;
    })
);
