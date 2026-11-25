"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import AuthLayout from "./AuthLayout";
import Input from "@/src/shared/components/Input";
import Button from "@/src/shared/components/Button";
import { authService } from "@/src/shared/services/authService";

export default function LoginPage() {
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState("wiji.sejati@email.com");
  const [password, setPassword] = useState("Password123");
  const [rememberMe, setRememberMe] = useState(true);

  // UI States (4 States: default, loading, error, success)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Empty state check
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email dan password wajib diisi.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await authService.login(email, password);

      if (res.success) {
        setSuccessMessage("Login berhasil! Mengalihkan ke Overview...");
        setTimeout(() => {
          router.push("/app/overview");
        }, 800);
      } else {
        setErrorMessage(res.error || "Email atau password belum sesuai. Periksa kembali.");
      }
    } catch {
      setErrorMessage("Terjadi kendala pada koneksi. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Masuk ke Akun EXIT"
      subtitle="Kelola investasi dan take-over posisi Anda dengan aman dan mudah."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Alert State */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-[10px] bg-danger/10 border border-danger/20 text-danger text-xs leading-relaxed animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert State */}
        {successMessage && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-[10px] bg-success/10 border border-success/20 text-success text-xs leading-relaxed animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Field: Email */}
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errorMessage) setErrorMessage(null);
          }}
          disabled={isLoading}
          required
        />

        {/* Field: Password */}
        <Input
          label="Password"
          name="password"
          placeholder="Minimal 8 karakter"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errorMessage) setErrorMessage(null);
          }}
          showPasswordToggle
          disabled={isLoading}
          required
        />

        {/* Row: Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-text-primary">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold"
              disabled={isLoading}
            />
            <span className="font-medium">Ingat saya</span>
          </label>

          <button
            type="button"
            onClick={() => alert("Fitur lupa password akan diarahkan ke layanan bantuan.")}
            className="text-text-secondary hover:text-gold transition-colors font-medium focus:outline-none"
          >
            Lupa Password?
          </button>
        </div>

        {/* Primary CTA Button: Masuk (Gold) */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Masuk
          </Button>
        </div>

        {/* Footer: Toggle to Register */}
        <div className="pt-4 text-center border-t border-border mt-6">
          <p className="text-xs text-text-secondary">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-bold text-navy hover:text-gold transition-colors ml-1"
            >
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
