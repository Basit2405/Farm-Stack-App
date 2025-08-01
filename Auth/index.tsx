import { SignIn } from "@clerk/nextjs";

export default function AuthPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sign In</h1>
      <SignIn redirectUrl="/" />
    </div>
  );
}