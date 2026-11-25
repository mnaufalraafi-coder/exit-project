import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Registrasi Investor | EXIT",
  description: "Lengkapi data registrasi investor EXIT",
};

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-between p-6 md:p-12 font-sans">
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-navy">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>
        <Image src="/logo-full.png" alt="EXIT" width={110} height={58} className="h-8 w-auto object-contain" />
      </header>

      <main className="max-w-xl mx-auto w-full my-auto py-12">
        <div className="bg-exit-white rounded-2xl border border-border p-8 text-center shadow-xs">
          <div className="w-14 h-14 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-gold-dark" />
          </div>
          <h1 className="text-2xl font-extrabold text-navy mb-2">Registrasi Berhasil!</h1>
          <p className="text-sm text-text-secondary mb-6 leading-relaxed">
            Akun Anda telah terdaftar di EXIT. Tahap selanjutnya adalah melengkapi data investor (verifikasi identitas dan rekening).
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/app/overview"
              className="inline-flex items-center justify-center h-11 px-6 rounded-[10px] bg-gold hover:bg-gold-dark text-navy font-semibold text-sm transition-colors"
            >
              Lanjut ke Dashboard
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-11 px-6 rounded-[10px] border border-border hover:border-gold text-text-primary font-medium text-sm transition-colors"
            >
              Halaman Login
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-text-secondary/60">
        © 2026 EXIT. Your Investment, Your Exit.
      </footer>
    </div>
  );
}
