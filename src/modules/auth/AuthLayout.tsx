import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-ivory font-sans">
      {/* Left Branding Panel (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy relative flex-col justify-between p-12 overflow-hidden text-exit-white">
        {/* Glow & curved accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-exit-white/70 hover:text-gold text-xs font-medium mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <div>
            <Image
              src="/logo-white.png"
              alt="EXIT - Early Investment Take Over"
              width={160}
              height={88}
              priority
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>

        {/* Center Graphic & Building Visual */}
        <div className="relative z-10 my-auto py-8">
          <div className="relative max-w-md mx-auto rounded-2xl overflow-hidden border border-exit-white/10 shadow-2xl bg-navy/80">
            {/* Architecture Image */}
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/building.png"
                alt="EXIT Architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
            </div>

            {/* Floating Info inside preview */}
            <div className="p-6 border-t border-exit-white/10 bg-navy/90 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-exit-white">Platform Terverifikasi</h4>
                  <p className="text-xs text-exit-white/60">Simulasi Take-Over P2P & SCF</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-exit-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Proses penawaran dan pencocokan transparan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Evaluasi posisi risiko dan imbal hasil terukur</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10 pt-4 border-t border-exit-white/10 flex items-center justify-between text-xs text-exit-white/50">
          <p>© 2026 EXIT. All rights reserved.</p>
          <p className="font-medium text-gold">Your Investment, Your Exit.</p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 md:p-14 bg-ivory">
        {/* Mobile Back & Logo */}
        <div className="w-full max-w-md mb-6 lg:hidden flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-navy">
            <ArrowLeft className="w-4 h-4" />
            <span>Beranda</span>
          </Link>
          <Image
            src="/logo-full.png"
            alt="EXIT Logo"
            width={110}
            height={58}
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Card Form Container */}
        <div className="w-full max-w-md bg-exit-white rounded-2xl border border-border p-7 sm:p-9 shadow-xs">
          {/* Form Header with Master Logo */}
          <div className="mb-7">
            <div className="mb-4">
              <Image
                src="/logo-full.png"
                alt="EXIT"
                width={130}
                height={69}
                priority
                className="h-9 w-auto object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-[26px] font-extrabold text-navy tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Form Children */}
          {children}
        </div>
      </div>
    </div>
  );
}
