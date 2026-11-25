import { Target, ShieldCheck, Users } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Likuiditas Posisi Investasi",
    description:
      "Memungkinkan investor keluar dari posisi investasi sebelum jatuh tempo dengan menghubungkan pihak penjual dan pembeli posisi.",
  },
  {
    icon: ShieldCheck,
    title: "Proses Transparan & Terstruktur",
    description:
      "Setiap tahap negosiasi dan take-over tercatat jelas, memberikan kejelasan bagi kedua belah pihak.",
  },
  {
    icon: Users,
    title: "Ekosistem Investor Terhubung",
    description:
      "Menjembatani investor yang ingin melepas posisi dengan investor yang mencari peluang di pasar P2P Lending dan SCF.",
  },
];

export default function AboutSection() {
  return (
    <section id="tentang" className="py-20 md:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold-dark font-semibold text-sm tracking-widest uppercase mb-3">
            Tentang EXIT
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Mengapa EXIT?
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            EXIT hadir sebagai platform perantara yang mempertemukan investor
            untuk proses take-over posisi investasi pada instrumen P2P Lending
            dan Securities Crowdfunding (SCF).
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="bg-exit-white rounded-2xl border border-border p-8 hover:shadow-sm transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                <item.icon className="w-6 h-6 text-gold-dark" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
