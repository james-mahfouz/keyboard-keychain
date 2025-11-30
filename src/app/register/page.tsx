"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import PixelBackground from "@/components/PixelBackground";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setIsLoading(true);

    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      name: formData.name,
      password: formData.password,
    });

    setIsLoading(false);

    if (error?.code) {
      const errorMap: Record<string, string> = {
        USER_ALREADY_EXISTS: "Email already registered",
      };
      toast.error(errorMap[error.code] || "Registration failed");
      return;
    }

    toast.success("🎄 Account created! Redirecting to login...");
    setTimeout(() => {
      router.push("/login?registered=true");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-white text-[#1a2744]">
      <PixelBackground />

      {/* Header */}
      <header className="relative z-10 border-b-4 border-[#1a2744] bg-white">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <h1 className="text-xl md:text-2xl text-[#cc0000] animate-blink">CLICK IT</h1>
            <span className="text-lg">🎄</span>
          </Link>
        </div>
      </header>

      {/* Register Form */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white border-4 border-[#1a2744] pixel-border p-8">
            <h2 className="text-2xl md:text-3xl text-[#cc0000] mb-8 text-center">
              REGISTER 🎁
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-[#cc0000]">NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-4 border-[#1a2744] bg-white text-sm focus:outline-none focus:border-[#cc0000]"
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#cc0000]">EMAIL</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border-4 border-[#1a2744] bg-white text-sm focus:outline-none focus:border-[#cc0000]"
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#cc0000]">PASSWORD</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 border-4 border-[#1a2744] bg-white text-sm focus:outline-none focus:border-[#cc0000]"
                  placeholder="••••••••"
                  autoComplete="off"
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-[#cc0000]">
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 border-4 border-[#1a2744] bg-white text-sm focus:outline-none focus:border-[#cc0000]"
                  placeholder="••••••••"
                  autoComplete="off"
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full pixel-button bg-[#cc0000] text-white px-6 py-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t-4 border-dashed border-[#1a2744]">
              <p className="text-xs text-center">
                ALREADY HAVE AN ACCOUNT?{" "}
                <Link href="/login" className="text-[#cc0000] hover:underline">
                  LOGIN HERE
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-[#cc0000] hover:underline">
              ← BACK TO HOME
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
