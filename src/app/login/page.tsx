'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Logged in successfully 👋");
      router.push("/");
    } else {
      const data = await res.json();
      toast.error(data.message || "Login failed");
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Login to continue ordering 🍕
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* DIVIDER */}
        <Divider />

        {/* GOOGLE LOGIN */}
        <GoogleButton />

        {/* FOOTER */}
        <FooterText
          text="Don’t have an account?"
          linkText="Register"
          href="/register"
        />
      </div>
    </section>
  );
};

export default LoginPage;

const Input = ({
  label,
  type,
  value,
  onChange,
  placeholder,
}: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-red-500"
    />
  </div>
);

const Divider = () => (
  <div className="my-6 flex items-center gap-4">
    <div className="flex-1 h-px bg-gray-200" />
    <span className="text-sm text-gray-400">OR</span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>
);

const GoogleButton = () => (
  <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-full py-3 text-sm font-medium hover:bg-gray-100 transition">
    <Image src="/google.png" alt="Google" width={20} height={20} />
    Continue with Google
  </button>
);

const FooterText = ({ text, linkText, href }: any) => (
  <p className="text-sm text-center text-gray-600 mt-6">
    {text}{" "}
    <Link href={href} className="text-red-600 font-medium hover:underline">
      {linkText}
    </Link>
  </p>
);
