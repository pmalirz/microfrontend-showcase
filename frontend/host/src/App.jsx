import React, { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

const Remote1Widget = React.lazy(() => import("remote1/Widget"));
const Remote2Widget = React.lazy(() => import("remote2/Widget"));
const Remote3Widget = React.lazy(() => import("remote3/Widget"));

const boxStyle = {
  padding: 16,
  border: "1px solid #ddd",
  borderRadius: 8,
  marginBottom: 16,
};

export default function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 24 }}>
      <h1>Microfrontends POC (Host)</h1>
      <p>
        This host loads two federated React modules and shows data from their
        Spring services.
      </p>

      <div style={boxStyle}>
        <h2>Remote 1 (host frame)</h2>
        <ErrorBoundary fallback={<div>Remote 1 currently unavailable</div>}>
          <Suspense fallback={<div>Loading Remote 1...</div>}>
            <Remote1Widget />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div style={boxStyle}>
        <h2>Remote 2 (host frame)</h2>
        <ErrorBoundary fallback={<div>Remote 2 currently unavailable</div>}>
          <Suspense fallback={<div>Loading Remote 2...</div>}>
            <Remote2Widget />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div style={boxStyle}>
        <h2>Remote 3 (host frame)</h2>
        <ErrorBoundary fallback={<div>Remote 3 currently unavailable</div>}>
          <Suspense fallback={<div>Loading Remote 3...</div>}>
            <Remote3Widget />
          </Suspense>
        </ErrorBoundary>
      </div>

    </div>
  );
}
