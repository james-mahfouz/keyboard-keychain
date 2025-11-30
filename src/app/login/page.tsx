"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import PixelBackground from "@/components/PixelBackground";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
      callbackURL: "/",
    });

    setIsLoading(false);

    if (error?.code) {
      toast.error("Invalid email or password. Please make sure you have already registered an account and try again.");
      return;
    }

    toast.success("🎄 Welcome back!");
    router.push("/");
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

      {/* Login Form */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white border-4 border-[#1a2744] pixel-border p-8">
            <h2 className="text-2xl md:text-3xl text-[#cc0000] mb-8 text-center">
              LOGIN 🎁
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="w-5 h-5 border-4 border-[#1a2744] checked:bg-[#cc0000]"
                />
                <label htmlFor="rememberMe" className="text-xs">
                  REMEMBER ME
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full pixel-button bg-[#cc0000] text-white px-6 py-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "LOADING..." : "LOGIN"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t-4 border-dashed border-[#1a2744]">
              <p className="text-xs text-center">
                DON'T HAVE AN ACCOUNT?{" "}
                <Link href="/register" className="text-[#cc0000] hover:underline">
                  REGISTER HERE
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
