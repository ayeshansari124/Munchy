"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Divider from "@/components/ui/Divider";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchUser } = useUser();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        await fetchUser();
        throw new Error(data.message || "Login failed");
      }

      toast.success("Welcome back!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Login to continue 🍕</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(value) => setEmail(value)}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(value) => setPassword(value)}
          />

          <button
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <Divider />

        {/* GOOGLE */}
        <button className="w-full flex items-center justify-center gap-3 border rounded-full py-3 text-sm hover:bg-gray-100">
          <Image src="/google.png" alt="Google" width={20} height={20} />
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-red-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </Card>
    </section>
  );
}
