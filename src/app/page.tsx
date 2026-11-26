// src/app/page.tsx
import { AppShell } from "@/src/shared/components/AppShell";

export default function LandingPage() {
  return (
    <AppShell title="Landing Page">
      <section className="p-6">
        <h1 className="text-3xl font-bold text-navy mb-4">
          Selamat datang di EXIT
        </h1>
        <p className="text-navy mb-6">
          Platform web bagi investor untuk mengalihkan atau mengambil alih posisi investasi.
        </p>
        <div className="flex gap-4">
          <a
            href="/login"
            className="bg-gold hover:bg-gold/90 text-navy font-medium py-2 px-4 rounded"
          >
            Masuk
          </a>
          <a
            href="/register"
            className="bg-gold hover:bg-gold/90 text-navy font-medium py-2 px-4 rounded"
          >
            Daftar
          </a>
        </div>
      </section>
    </AppShell>
  );
}
