# Paket Handoff EXIT untuk Vibe Coder
## Isi
- `AGENTS.md`: aturan untuk agent (taruh di root proyek)
- `product/_general/`: PRD, brand, token, tech stack, glosarium, AppShell
- `product/<fitur>/`: per layar: `wf` (wireframe+spesifikasi), `mo` (mockup PNG), `dt` (data mock)
- `project/prompts/`: prompt siap copy, urut p00 sampai p17
- `project/prompt-log.md`: catatan prompt (wajib, minimal 5 entri)

## Cara pakai
1. Salin `AGENTS.md`, `product/`, `project/` ke root proyek (project Vite/Next.js yang sama).
2. Buka folder ROOT proyek di Antigravity (File > Open Folder).
3. Buka `project/prompts/p00-foundation.md`, salin isi blok kode ke chat agent. Lampirkan PNG yang diminta di tiap prompt.
4. Satu prompt = satu task. Cek hasil di browser, bandingkan dengan mockup, baru lanjut ke prompt berikutnya.
5. Isi `project/prompt-log.md` setiap selesai satu prompt.

## Peta layar
| Layar | Folder | Prompt |
|---|---|---|
| 05 Overview | product/dashboard/ | p03 |
| 06 Marketplace | product/marketplace/ | p04 |
| 07 Portfolio | product/portfolio/ | p05 |
| 08 My Offers | product/offers/ | p06 |
| 09 My Requests | product/requests/ | p07 |
| 10 Negotiations | product/negotiations/ | p08 |
| 11 Activity History | product/activity/ | p09 |
| 12 Our Partners | product/partners/ | p10 |
| 13 Help & Support | product/help/ | p11 |
| 14 Profile & Settings | product/profile/ | p12 |
| 01 Login | product/auth/ | p13 |
| 02 Register | product/auth/ | p14 |
| 03 Registrasi Investor | product/auth/ | p15 |
| 04 Landing Page | product/landing-page/ | p16 |

## Catatan
- Mockup PNG hasil crop dari gambar overview, jadi resolusi terbatas. Untuk hasil paling akurat, generate ulang per layar di Stitch/Figma Make.
- Nama mitra di layar 12 pakai placeholder. Klaim regulasi di landing hanya dipakai jika terverifikasi.