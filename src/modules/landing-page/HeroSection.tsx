"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, Layers, FileSearch } from "lucide-react";

const keyHighlights = [
  {
    icon: Zap,
    title: "Early Liquidity",
    description: "Akses likuiditas sebelum jatuh tempo",
  },
  {
    icon: ShieldCheck,
    title: "Terpercaya & Aman",
    description: "Sesuai regulasi OJK dan berstandar KYC/AML",
  },
  {
    icon: Layers,
    title: "Multi-Platform",
    description: "Terintegrasi dengan berbagai mitra investasi",
  },
  {
    icon: FileSearch,
    title: "Transparan",
    description: "Informasi investasi yang jelas dan lengkap",
  },
];

export default function HeroSection() {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Decorative Gold Curved Accent in background */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gold/5 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4" />

      {/* Top Navigation Bar */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-white.png"
              alt="EXIT - Early Investment Take Over"
              width={160}
              height={88}
              priority
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Nav Links in rounded pill */}
          <nav className="hidden lg:flex items-center bg-ivory/10 backdrop-blur-md border border-exit-white/10 rounded-full px-6 py-2 gap-7 text-sm font-medium text-exit-white/90">
            <a href="#" className="text-gold hover:text-gold transition-colors font-semibold">
              Beranda
            </a>
            <a href="#fitur" className="hover:text-gold transition-colors">
              Fitur
            </a>
            <a href="#cara-kerja" className="hover:text-gold transition-colors">
              Cara Kerja
            </a>
            <a href="#tentang" className="hover:text-gold transition-colors">
              Mitra
            </a>
            <a href="#faq" className="hover:text-gold transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-medium text-exit-white border border-exit-white/30 hover:border-exit-white/80 rounded-lg transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 text-sm font-semibold bg-gold hover:bg-gold-dark text-navy rounded-lg transition-colors shadow-sm"
            >
              Daftar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gold/15 border border-gold/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-semibold tracking-wider uppercase">
                Early Investment Take Over
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold text-exit-white leading-[1.15] mb-6 tracking-tight">
              Wujudkan Likuiditas{" "}
              <span className="text-gold">Investasi Lebih Fleksibel</span>
            </h1>

            <p className="text-exit-white/80 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              EXIT adalah platform take-over posisi investasi yang menghubungkan
              investor dengan peluang likuiditas secara aman, transparan, dan
              terintegrasi pada instrumen P2P Lending dan Securities Crowdfunding.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy font-semibold text-base rounded-[10px] h-12 px-8 transition-colors shadow-md"
              >
                Mulai Investasi
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#cara-kerja"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-exit-white/30 hover:border-exit-white/70 text-exit-white font-medium text-base rounded-[10px] h-12 px-7 transition-colors"
              >
                Pelajari Cara Kerja
              </a>
            </div>

            {/* Prototype note */}
            <p className="mt-8 text-exit-white/40 text-xs leading-relaxed">
              * Prototype ini menggunakan data simulasi untuk keperluan demonstrasi.
            </p>
          </div>

          {/* Right Column: Skyscraper / Architecture Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden border border-exit-white/10 shadow-2xl bg-navy/60 group">
              {/* Gold gradient arc overlay */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gold/20 rounded-full blur-2xl" />
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/building.png"
                  alt="Modern Investment Infrastructure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
              </div>
              <div className="p-5 bg-navy/90 border-t border-exit-white/10 backdrop-blur-sm flex items-center justify-between">
                <div>
                  <p className="text-exit-white font-semibold text-sm">P2P Lending & SCF Take-Over</p>
                  <p className="text-exit-white/60 text-xs">Simulasi Transparansi Terstruktur</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold">
                  Aman & Terverifikasi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Feature Highlights Strip directly underneath Hero */}
      <div className="relative z-10 bg-ivory border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyHighlights.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl bg-exit-white border border-border shadow-xs hover:border-gold/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-gold-dark" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy">{item.title}</h4>
                  <p className="text-xs text-text-secondary mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
