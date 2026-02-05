import React, { useEffect, useState } from "react";

export default function Widget() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8081/api/a/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Failed to reach Service A"));
  }, []);

  return (
    <div>
      <div>Remote 1 widget</div>
      <div>Service A says: {message}</div>
    </div>
  );
}
