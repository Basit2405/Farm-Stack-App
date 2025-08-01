import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/items").then(res => setItems(res.data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Panel</h1>
      <table border={1}>
        <thead>
          <tr><th>Title</th><th>Description</th></tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}