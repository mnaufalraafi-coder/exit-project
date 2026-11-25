# tech-stack.md
## Saat ini (prototipe)
- React + Vite + TypeScript, Tailwind CSS, React Router, Recharts, Lucide React.
- Data mock JSON di `src/mock/`. Tanpa backend.
## Struktur kode
- Kode per fitur di `src/modules/<fitur>/`, nama folder SAMA dengan `product/<fitur>/`.
- Komponen bersama di `src/shared/`. Rute tipis, logika di modules.
## Jika diminta dosen/tim memakai Next.js
Struktur folder tidak berubah: pindahkan ke `modules/<fitur>/` dan `app/` (App Router). Tailwind dan token sama.
Backend (Prisma + auth) baru ditambah di tahap lanjutan.
## Standar
Tailwind, Zod untuk validasi form, ESLint + Prettier. Rahasia hanya di .env (jangan di-commit).
