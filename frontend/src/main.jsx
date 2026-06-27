import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "react-hot-toast";

import "./index.css";

import "./styles/globals.css";
import "./styles/navbar.css";
import "./styles/dashboard.css";
import "./styles/cards.css";
import "./styles/forms.css";
import "./styles/badges.css";

import App from "./App";

createRoot(document.getElementById("root")).render(
    <StrictMode>

        <App />

        <Toaster
            position="top-right"
            toastOptions={{
                duration:3000
            }}
        />

    </StrictMode>
);