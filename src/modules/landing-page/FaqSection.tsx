"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Apa itu EXIT?",
    answer:
      "EXIT (Early Investment Take Over) adalah platform perantara yang memfasilitasi proses take-over posisi investasi antara investor. Platform ini berfokus pada instrumen P2P Lending dan Securities Crowdfunding (SCF).",
  },
  {
    question: "Bagaimana cara kerja take-over posisi investasi?",
    answer:
      "Investor yang ingin keluar dari posisi investasi dapat menawarkan posisinya di marketplace. Investor lain yang tertarik dapat mengajukan penawaran, bernegosiasi, dan menyelesaikan proses take-over melalui platform.",
  },
  {
    question: "Instrumen apa saja yang tersedia?",
    answer:
      "Saat ini EXIT berfokus pada dua kategori instrumen: P2P Lending dan Securities Crowdfunding (SCF).",
  },
  {
    question: "Apakah data di platform ini nyata?",
    answer:
      "Prototype ini menggunakan data simulasi untuk keperluan demonstrasi. Tidak ada transaksi keuangan nyata yang terjadi. Semua nama, angka, dan skenario yang ditampilkan bersifat fiktif.",
  },
  {
    question: "Apa itu persentase kecocokan?",
    answer:
      "Persentase kecocokan adalah skor kesesuaian berdasarkan kriteria profil risiko investor, bukan probabilitas keuntungan atau jaminan keberhasilan investasi.",
  },
  {
    question: "Siapa yang dimaksud dengan platform mitra?",
    answer:
      "Platform mitra adalah penyedia atau platform asal instrumen investasi yang terintegrasi dengan EXIT, bukan akun investor individual.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-exit-white">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-gold-dark font-semibold text-sm tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Pertanyaan Umum
          </h2>
          <p className="text-text-secondary text-base leading-relaxed">
            Jawaban atas pertanyaan yang sering ditanyakan tentang platform EXIT.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-border rounded-xl overflow-hidden bg-ivory/50"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-ivory/80 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-semibold text-navy">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-text-secondary shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
