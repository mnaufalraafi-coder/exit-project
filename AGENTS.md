# AGENTS.md: EXIT (Early Investment Take Over)

## Proyek
EXIT adalah platform web bagi investor untuk mengalihkan atau mengambil alih posisi investasi.
Tagline: "Your Investment, Your Exit."
Ruang lingkup: frontend saja, memakai data mock (dummy). Tidak ada backend dan tidak ada data nasabah asli.

## Stack
- React + Vite + TypeScript
- Tailwind CSS (dipetakan dari design tokens)
- React Router, Recharts, Lucide React
- Data dari `src/db/mock/*.json` lewat service tipis di `src/shared/services`. Jangan hardcode data di komponen.
- Semua anggota memakai versi Node.js LTS yang sama.

## Struktur folder
Satu fitur = satu nama folder yang sama di `product/` dan `src/modules/`.

```
product/                    # DOKUMEN (baca dulu sebelum coding)
  _general/
    prd.md                  # tujuan, fitur, ruang lingkup
    personas.md             # profil pengguna
    brand-guideline.md      # aturan brand ringkas
    tech-stack.md           # teknologi dan aturan kode
    glossary.md             # istilah proyek
    screen-spec.md          # isi, state, validasi, navigasi, microcopy per layar
    tokens.css              # design tokens (warna, font, radius, spacing)
    mockup-overview.png     # peta 14 layar
    assets/logo-full.png    # logo master
  <fitur>/
    mockup.png              # mockup layar fitur (prioritas utama jika ada)
src/                        # KODE
  app/                      # router dan rute (tipis, tanpa logika)
  modules/
    _general/               # AppShell, layout, tema, util
    <fitur>/                # halaman, komponen, dan logika fitur
  shared/
    components/             # Button, Input, Badge, Card, StatCard, DataRow,
                            # Tabs, Select, Stepper, Accordion
    services/               # akses data mock
  db/mock/                  # data dummy (*.json)
project/
  prompt-log.md             # catatan semua prompt
```

Daftar fitur (nama folder di `product/` dan `src/modules/`):
`landing-page`, `auth` (login dan register), `onboarding`, `overview`, `marketplace`,
`portfolio`, `offers`, `requests`, `negotiations`, `activity`, `partners`, `help`, `profile`.

## Sumber kebenaran (urutan prioritas)
1. `product/<fitur>/mockup.png`: acuan visual utama untuk layar tersebut.
2. `product/_general/screen-spec.md`: isi, state, validasi, navigasi, microcopy.
3. `product/_general/mockup-overview.png`: peta seluruh layar.
4. `product/_general/tokens.css` dan `brand-guideline.md`: gaya visual.
5. `product/_general/assets/logo-full.png`: logo master.

Jika ada file yang dirujuk tapi belum ada, jangan menebak. Berhenti dan tanyakan.

## Aturan desain (wajib)
1. Warna, font, radius, dan spacing HANYA dari `tokens.css` (dipetakan ke `tailwind.config`). Dilarang memakai hex lepas.
2. Navy dominan, ivory untuk latar dan kartu, gold hanya aksen: tombol utama, item sidebar aktif, highlight, nomor tahap, divider. Satu aksi utama per area.
3. Teks di atas gold = navy. Jangan pakai gold sebagai warna teks di atas ivory.
4. Status (Selesai, Dalam Proses, Menunggu, Ditolak, dst.) WAJIB teks + warna, tidak boleh warna saja.
5. Font Inter. Maksimal dua ketebalan per komponen. Caption minimal 11px.
6. Logo: pakai file master, jangan digambar ulang, jangan diberi efek, jangan diubah rasio. Lebar minimum 120px. Di atas navy pakai versi putih (jika belum ada, lihat catatan di `brand-guideline.md`).
7. Ikon: Lucide, outline, stroke konsisten. Ikon tidak menggantikan label aksi penting.
8. Bahasa UI: Indonesia, profesional, jelas, transparan. Jangan menjanjikan keuntungan atau menyiratkan bebas risiko.

## Aturan kode (wajib)
1. Setiap halaman wajib punya 4 state: default, loading (skeleton), empty, error.
2. Komponen reusable ada di `src/shared/components`. Cek dulu sebelum membuat baru, jangan duplikasi.
3. `src/app/` hanya berisi rute. Logika dan tampilan ada di `src/modules/<fitur>/`.
4. Jangan menambah fitur atau elemen di luar mockup dan `screen-spec.md`.
5. Layout desktop-first (1280-1440px), tetap responsif: sidebar menjadi drawer di bawah 1024px.
6. TypeScript ketat: hindari `any`.
7. Data dummy saja, tanpa data nasabah asli.
8. Jangan commit `.env` atau API key. Pastikan `.env` ada di `.gitignore`.

## Routing
`/` (landing) | `/login` | `/register` | `/onboarding` | `/app/overview` | `/app/marketplace` |
`/app/portfolio` | `/app/offers` | `/app/requests` | `/app/negotiations` | `/app/activity` |
`/app/partners` | `/app/help` | `/app/profile`

Akses `/app/*` tanpa login diarahkan ke `/login`. Auth mock memakai localStorage.

## Cara kerja
1. Minta rencana dulu, tunggu persetujuan sebelum menulis kode.
2. Kerjakan SATU halaman (satu fitur) per task. Satu perubahan per prompt.
3. Baca `product/<fitur>/` dan `screen-spec.md` sebelum menulis `src/modules/<fitur>/`.
4. Setelah selesai: jalankan `npm run dev`, buka browser, screenshot, bandingkan dengan mockup, perbaiki selisih.
5. Catat setiap prompt di `project/prompt-log.md` dengan format: Tanggal, Prompt, Hasil, Catatan.
6. Di akhir tiap task, tulis apa yang berbeda dari mockup dan asumsi yang diambil.
7. Jika ada error, tampilkan pesan lengkap beserta konteks, lalu catat perbaikannya di prompt-log.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
