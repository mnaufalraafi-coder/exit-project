import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="bg-navy text-exit-white/70">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-gold font-extrabold text-xl tracking-tight">
                EXIT
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-2">
              Early Investment Take Over
            </p>
            <p className="text-xs leading-relaxed text-exit-white/40">
              Platform perantara take-over posisi investasi pada instrumen P2P
              Lending dan Securities Crowdfunding (SCF).
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
              Akun
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/register"
                  className="hover:text-gold transition-colors"
                >
                  Daftar
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-gold transition-colors"
                >
                  Masuk
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-exit-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-exit-white/40">
            &copy; 2026 EXIT — Early Investment Take Over.
            Prototype dengan data simulasi.
          </p>
          <p className="text-xs text-exit-white/30">
            Your Investment, Your Exit.
          </p>
        </div>
      </div>
    </footer>
  );
}
