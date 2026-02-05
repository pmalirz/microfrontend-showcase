import React, { Suspense } from "react";

const Remote1Widget = React.lazy(() => import("remote1/Widget"));
const Remote2Widget = React.lazy(() => import("remote2/Widget"));

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
        <h2>Remote 1</h2>
        <Suspense fallback={<div>Loading Remote 1...</div>}>
          <Remote1Widget />
        </Suspense>
      </div>

      <div style={boxStyle}>
        <h2>Remote 2</h2>
        <Suspense fallback={<div>Loading Remote 2...</div>}>
          <Remote2Widget />
        </Suspense>
      </div>
    </div>
  );
}
