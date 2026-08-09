"use client";

import { useState } from "react";

export default function Home() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generatePin() {
    setLoading(true);
    setError("");
    setPin("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate PIN");
      }

      setPin(String(data.pin || data.code || ""));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "420px",
          padding: "30px",
          textAlign: "center",
          borderRadius: "20px",
          background: "#1d1d1d",
        }}
      >
        <h1>4-Digit PIN Generator</h1>

        <div
          style={{
            margin: "30px 0",
            padding: "20px",
            background: "#000",
            borderRadius: "12px",
            fontSize: "42px",
            fontWeight: "bold",
            letterSpacing: "8px",
          }}
        >
          {pin || "----"}
        </div>

        {error && (
          <p style={{ color: "#ff5555" }}>
            {error}
          </p>
        )}

        <button
          onClick={generatePin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: loading ? "wait" : "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate PIN"}
        </button>
      </div>
    </main>
  );
}
