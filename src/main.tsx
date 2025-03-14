import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "jotai";
import { App } from "./App.tsx";
import "./index.css";

import { store } from "./store";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
