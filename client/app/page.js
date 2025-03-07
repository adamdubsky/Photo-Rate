"use client"; // Required for interactive components in Next.js App Router
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/ping");
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
      setMessage("Failed to fetch data");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Next.js & FastAPI Integration</h1>
      <button
        onClick={fetchMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Click Me
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
}
