import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize monitoring and analytics
import { initSentry } from "./lib/sentry";
import { initPostHog } from "./lib/analytics";

// Initialize Sentry for error tracking
initSentry();

// Initialize PostHog for analytics
initPostHog();

createRoot(document.getElementById("root")!).render(<App />);
