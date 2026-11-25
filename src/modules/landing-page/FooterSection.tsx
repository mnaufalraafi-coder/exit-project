import Link from "next/link";
import Image from "next/image";

export default function FooterSection() {
  return (
    <footer className="bg-navy text-exit-white/70 border-t border-exit-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Image
                src="/logo-white.png"
                alt="EXIT"
                width={150}
                height={80}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-sm font-medium text-gold mb-2">
              Early Investment Take Over
            </p>
            <p className="text-xs leading-relaxed text-exit-white/60 max-w-sm mb-4">
              Platform perantara bagi investor untuk mengalihkan atau mengambil
              alih posisi investasi pada instrumen P2P Lending dan Securities
              Crowdfunding (SCF) secara transparan dan terstruktur.
            </p>
            <p className="text-[11px] text-exit-white/40">
              * Platform ini merupakan prototipe fungsional dengan data simulasi.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-exit-white font-semibold text-sm mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-gold transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#tentang"
                  className="hover:text-gold transition-colors"
                >
                  Tentang EXIT
                </a>
              </li>
              <li>
                <a
                  href="#cara-kerja"
                  className="hover:text-gold transition-colors"
                >
                  Cara Kerja
                </a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-gold transition-colors">
                  Fitur Utama
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-exit-white font-semibold text-sm mb-4">
              Akses Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/register"
                  className="hover:text-gold transition-colors"
                >
                  Daftar Akun Baru
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-gold transition-colors"
                >
                  Masuk ke Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/app/overview"
                  className="hover:text-gold transition-colors"
                >
                  Investor Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/app/marketplace"
                  className="hover:text-gold transition-colors"
                >
                  Marketplace Investasi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-exit-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-exit-white/40">
          <p>© 2026 EXIT. All rights reserved.</p>
          <p className="text-[11px]">
            Your Investment, Your Exit.
          </p>
        </div>
      </div>
    </footer>
  );
}
