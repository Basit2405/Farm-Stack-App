import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/items", {
      title,
      description,
    });
    setMessage("Item added with ID: " + res.data.id);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>FARM Stack (Next.js + FastAPI)</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <button type="submit">Add Item</button>
      </form>
      <p>{message}</p>
    </main>
  );
}