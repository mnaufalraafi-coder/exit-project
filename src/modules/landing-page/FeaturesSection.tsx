import {
  LayoutDashboard,
  Store,
  Briefcase,
  FileText,
  MessageSquare,
  History,
  Building2,
  HelpCircle,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Overview Dashboard",
    description:
      "Ringkasan portofolio, aktivitas terbaru, dan notifikasi penting dalam satu tampilan.",
  },
  {
    icon: Store,
    title: "Marketplace",
    description:
      "Jelajahi posisi investasi yang tersedia untuk di-take-over, dengan filter kategori P2P Lending dan SCF.",
  },
  {
    icon: Briefcase,
    title: "Portfolio",
    description:
      "Pantau seluruh posisi investasi yang dimiliki beserta status dan performanya.",
  },
  {
    icon: FileText,
    title: "Penawaran & Permintaan",
    description:
      "Kelola penawaran yang dikirim maupun permintaan take-over yang diterima.",
  },
  {
    icon: MessageSquare,
    title: "Negosiasi",
    description:
      "Proses negosiasi terstruktur dengan tahapan yang jelas dan tercatat di platform.",
  },
  {
    icon: History,
    title: "Riwayat Aktivitas",
    description:
      "Catatan lengkap semua aktivitas dan transaksi yang pernah dilakukan.",
  },
  {
    icon: Building2,
    title: "Platform Mitra",
    description:
      "Informasi platform mitra yang terintegrasi sebagai penyedia instrumen investasi.",
  },
  {
    icon: HelpCircle,
    title: "Bantuan & Dukungan",
    description:
      "Panduan penggunaan, FAQ, dan jalur komunikasi untuk mendapatkan bantuan.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="py-20 md:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold-dark font-semibold text-sm tracking-widest uppercase mb-3">
            Fitur Utama
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Semua yang Anda Butuhkan
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            Fitur lengkap untuk mengelola proses take-over posisi investasi dari
            awal hingga akhir.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-exit-white rounded-2xl border border-border p-6 hover:shadow-sm transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-navy/5 group-hover:bg-gold/10 flex items-center justify-center mb-4 transition-colors">
                <feature.icon className="w-5 h-5 text-navy group-hover:text-gold-dark transition-colors" />
              </div>
              <h3 className="text-sm font-bold text-navy mb-1.5">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
