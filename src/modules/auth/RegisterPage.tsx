"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import AuthLayout from "./AuthLayout";
import Input from "@/src/shared/components/Input";
import Button from "@/src/shared/components/Button";
import { authService } from "@/src/shared/services/authService";

export default function RegisterPage() {
  const router = useRouter();

  // Form States
  const [fullName, setFullName] = useState("Wiji Sejati Sukmoyadi");
  const [email, setEmail] = useState("wiji.sejati@email.com");
  const [phone, setPhone] = useState("+62 812-2456-7890");
  const [password, setPassword] = useState("Password123");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI States (4 States)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!agreeTerms) {
      setErrorMessage("Anda harus menyetujui Syarat & Ketentuan serta Kebijakan Privasi EXIT.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await authService.register({
        fullName,
        email,
        phone,
        password,
        agreeTerms,
      });

      if (res.success) {
        // Direct to onboarding as defined in WF02
        router.push("/onboarding");
      } else {
        setErrorMessage(res.error || "Pendaftaran gagal. Periksa kembali data Anda.");
      }
    } catch {
      setErrorMessage("Terjadi kesalahan sistem saat mendaftar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Buat Akun EXIT"
      subtitle="Mulai perjalanan investasi Anda di EXIT."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Alert State */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-[10px] bg-danger/10 border border-danger/20 text-danger text-xs leading-relaxed animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Field: Nama Lengkap */}
        <Input
          label="Nama Lengkap"
          name="fullName"
          placeholder="Nama sesuai KTP"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isLoading}
          required
        />

        {/* Field: Email */}
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />

        {/* Field: Nomor Telepon */}
        <Input
          label="Nomor Telepon"
          type="tel"
          name="phone"
          placeholder="+62 812-3456-7890"
          helperText="Contoh: +62 812-2456-7890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isLoading}
          required
        />

        {/* Field: Password */}
        <Input
          label="Password"
          name="password"
          placeholder="Minimal 8 karakter"
          helperText="Minimal 8 karakter, kombinasi huruf dan angka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPasswordToggle
          disabled={isLoading}
          required
        />

        {/* Checkbox: S&K dan Kebijakan Privasi */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-text-secondary select-none leading-relaxed">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold mt-0.5 shrink-0"
              disabled={isLoading}
            />
            <span>
              Saya setuju dengan{" "}
              <a href="#" className="font-semibold text-navy hover:text-gold underline">
                Syarat & Ketentuan
              </a>{" "}
              dan{" "}
              <a href="#" className="font-semibold text-navy hover:text-gold underline">
                Kebijakan Privasi
              </a>{" "}
              EXIT.
            </span>
          </label>
        </div>

        {/* Primary CTA: Daftar */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            disabled={!agreeTerms}
            className="w-full"
          >
            Daftar
          </Button>
        </div>

        {/* Footer: Toggle to Login */}
        <div className="pt-4 text-center border-t border-border mt-6">
          <p className="text-xs text-text-secondary">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-bold text-navy hover:text-gold transition-colors ml-1"
            >
              Masuk
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
