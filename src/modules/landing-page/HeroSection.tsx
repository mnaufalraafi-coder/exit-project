import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Subtle decorative accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Logo placeholder */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-exit-white/10 border border-exit-white/10">
              <span className="text-gold font-extrabold text-2xl tracking-tight">
                EXIT
              </span>
              <span className="text-exit-white/60 text-sm font-medium">
                LOGO ASSET
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Early Investment Take Over
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-exit-white leading-tight mb-6">
            Your Investment,{" "}
            <span className="text-gold">Your Exit.</span>
          </h1>

          <p className="text-exit-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            Platform perantara bagi investor untuk mengalihkan atau mengambil
            alih posisi investasi pada instrumen P2P Lending dan Securities
            Crowdfunding (SCF) secara transparan dan terstruktur.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy font-semibold text-base rounded-[10px] h-12 px-8 transition-colors"
            >
              Daftar
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-exit-white/30 hover:border-exit-white/60 text-exit-white font-medium text-base rounded-[10px] h-12 px-8 transition-colors"
            >
              Masuk
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-exit-white/40 text-xs leading-relaxed max-w-lg">
            * Prototype ini menggunakan data simulasi. Tidak ada transaksi
            keuangan nyata yang terjadi di platform ini.
          </p>
        </div>
      </div>
    </section>
  );
}
