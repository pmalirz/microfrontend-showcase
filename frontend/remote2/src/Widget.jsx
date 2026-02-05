import React, { useEffect, useState } from "react";

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
    </div>
  );
}
