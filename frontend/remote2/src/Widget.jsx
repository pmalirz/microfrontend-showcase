import React, { useEffect, useState, Suspense } from "react";

const SharedButton = React.lazy(() => import("sharedUI/SharedButton"));

export default function Widget() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8082/api/b/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Failed to reach Service B"));
  }, []);

  return (
    <div>
      <div>Remote 2 widget</div>
      <div>Service B says: {message}</div>
      <div style={{ marginTop: '10px' }}>
        <Suspense fallback={<div>Loading Button...</div>}>
          <SharedButton>Hello from Vite!</SharedButton>
        </Suspense>
      </div>
    </div>
  );
}
