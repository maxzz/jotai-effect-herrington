import { Demo1 } from "./demo1";
import { Demo2 } from "./demo2";

export function App() {
    return (
        <div className="p-4 mx-auto max-w-2xl text-sm flex flex-col gap-1">
            <h1 className="text-sm font-bold">
                jotai-effect
            </h1>

            <h2 className="pt-2 text-xs">
                Accessing atom content from hook and store
            </h2>
            <Demo1 className="p-4 border border-gray-200/30 rounded-md" />

            <h2 className="pt-2 text-xs">
                Modifying atom content with jotai-effect
            </h2>
            <Demo2 className="p-4 border border-gray-200/30 rounded-md" />
        </div>
    );
}
