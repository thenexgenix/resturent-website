import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routers from "./Router/Routers";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Routers />
  </StrictMode>
);
