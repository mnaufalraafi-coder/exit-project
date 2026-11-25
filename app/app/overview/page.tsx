import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, LayoutDashboard, Wallet, TrendingUp, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Dashboard Overview | EXIT",
  description: "Ringkasan portofolio dan aktivitas investor",
};

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-ivory font-sans flex flex-col justify-between p-6 md:p-12">
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <Image src="/logo-full.png" alt="EXIT" width={120} height={64} className="h-8 w-auto object-contain" />
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gold/20 text-gold-dark">
            Investor Portal
          </span>
        </div>
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-navy">
          <ArrowLeft className="w-4 h-4" />
          <span>Ke Beranda</span>
        </Link>
      </header>

      <main className="max-w-5xl mx-auto w-full my-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy">
            Selamat Datang, <span className="text-gold-dark">Wiji!</span>
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Kelola investasi, pantau performa, dan temukan peluang take-over posisi terbaik.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="p-6 rounded-2xl bg-navy text-exit-white shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-exit-white/60 font-medium">Nilai Portofolio</span>
              <Wallet className="w-4 h-4 text-gold" />
            </div>
            <p className="text-2xl font-extrabold text-gold">Rp325.000.000</p>
            <p className="text-xs text-exit-white/50 mt-1">8 Posisi Aktif</p>
          </div>

          <div className="p-6 rounded-2xl bg-exit-white border border-border shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-text-secondary font-medium">Total Imbal Hasil</span>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <p className="text-2xl font-extrabold text-navy">Rp26.715.000</p>
            <p className="text-xs text-success font-medium mt-1">+8.21% p.a.</p>
          </div>

          <div className="p-6 rounded-2xl bg-exit-white border border-border shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-text-secondary font-medium">Status Akun</span>
              <LayoutDashboard className="w-4 h-4 text-gold-dark" />
            </div>
            <p className="text-xl font-bold text-navy">Terverifikasi</p>
            <p className="text-xs text-text-secondary mt-1">KYC / AML Lengkap</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-gold/10 border border-gold/30 text-xs text-navy flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gold-dark">Fitur Auth Terhubung Sukses!</p>
            <p className="text-text-secondary mt-0.5">
              Halaman ini menandakan autentikasi mock login berhasil. Modul fitur <strong>overview</strong> lengkap akan dikembangkan pada task selanjutnya sesuai siklus pengerjaan fitur di AGENTS.md.
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-text-secondary/60">
        © 2026 EXIT. Early Investment Take Over.
      </footer>
    </div>
  );
}
