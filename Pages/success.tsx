"use client"
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    toast.success("🎉 Payment Successful!", { position: "top-center", autoClose: 3000 });
    const timer = setTimeout(() => router.push("/"), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: 50 }}>
      <h1>Thank you for your payment! ✅</h1>
    </div>
  );
}
