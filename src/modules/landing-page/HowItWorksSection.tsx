import { UserPlus, Search, Handshake, ArrowRightLeft, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Daftar & Lengkapi Profil",
    description:
      "Investor mendaftar dan melengkapi profil risiko untuk mendapatkan pencocokan yang sesuai.",
  },
  {
    icon: Search,
    number: "02",
    title: "Jelajahi Marketplace",
    description:
      "Temukan posisi investasi yang tersedia di marketplace berdasarkan kategori P2P Lending atau SCF.",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Ajukan atau Terima Penawaran",
    description:
      "Investor dapat mengajukan penawaran untuk mengambil alih posisi, atau menerima penawaran dari pihak lain.",
  },
  {
    icon: ArrowRightLeft,
    number: "04",
    title: "Proses Negosiasi",
    description:
      "Kedua pihak bernegosiasi melalui platform dengan tahapan yang jelas dan tercatat.",
  },
  {
    icon: CheckCircle,
    number: "05",
    title: "Take-Over Selesai",
    description:
      "Setelah kedua pihak menyetujui, proses take-over posisi investasi diselesaikan melalui platform.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-20 md:py-28 bg-exit-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold-dark font-semibold text-sm tracking-widest uppercase mb-3">
            Cara Kerja
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Alur Take-Over Posisi Investasi
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            Proses yang terstruktur dari pendaftaran hingga penyelesaian
            take-over posisi investasi.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {/* Number badge */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-gold flex items-center justify-center mb-4">
                  <span className="text-navy font-bold text-sm">
                    {step.number}
                  </span>
                </div>

                <step.icon className="w-5 h-5 text-gold-dark mb-3" />

                <h3 className="text-sm font-bold text-navy mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-xs leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
