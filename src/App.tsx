import { Demo1 } from "./demo1";
import { Demo2 } from "./demo2";

export function App() {
    return (
        <div className="text-sm flex flex-col gap-2">
            <h1 className="text-sm font-bold">Jotai</h1>
            <Demo1 />
            <Demo2 />
        </div>
    );
}



