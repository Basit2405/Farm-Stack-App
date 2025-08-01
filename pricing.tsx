import axios from "axios";

export default function Pricing() {
  const handleCheckout = async () => {
    const res = await axios.post("http://localhost:8000/create-checkout-session");
    window.location.href = res.data.url;
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Pricing</h1>
      <p>Buy Starter Plan: $5</p>
      <button onClick={handleCheckout}>Get Started</button>
    </div>
  );
}