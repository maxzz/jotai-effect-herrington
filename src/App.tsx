import { Demo1 } from "./demo1";
import { Demo2 } from "./demo2";

export function App() {
    return (
        <div className="text-sm flex flex-col gap-6">
            <h1 className="text-sm font-bold">
                jotai-effect
            </h1>

            <div className="flex flex-col gap-2">
                <Demo1 />
            </div>

            <Demo2 />
        </div>
    );
}
