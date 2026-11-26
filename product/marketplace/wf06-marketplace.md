# WF06: Marketplace

Route: `/app/marketplace` | Mockup: `mo06-marketplace.png`

Layar ini memakai AppShell: lihat `product/_general/wf-global-appshell.md`.

## Wireframe (ASCII)
```
| Marketplace                                            |
| [Cari posisi...] [Instrumen v] [Tenor v] [Return v]    |
| (Semua Penawaran)(P2P Lending)(SCF)                    |
| +--Filter--+  32 Penawaran     Urutkan: Return Tertinggi|
| | toggle   |  [Kartu] [Kartu] [Kartu]                  |
| | mitra    |  gambar, badge, judul, nominal, return,   |
| | return   |  tenor, progres, [Lihat Detail]           |
| +----------+                                           |
```

## Spesifikasi
- Judul "Marketplace", sub "Temukan posisi investasi yang sesuai dengan preferensi Anda."
- Search "Cari posisi investasi...", dropdown: Semua Instrumen, Tenor, Return.
- Tab: Semua Penawaran, P2P Lending, SCF (Securities Crowdfunding).
- Kolom kiri Filter Penawaran: toggle "Prioritaskan yang sesuai dengan Profil Saya", Mitra Investasi (checkbox: Semua Mitra, Mitra A, Mitra B (placeholder)), Tingkat Return (range). Teks "32 Penawaran Tersedia", urutkan "Return Tertinggi".
- Grid 3 kolom kartu: gambar/placeholder, badge instrumen, judul, nominal, return p.a., tenor, bar progres pendanaan (%), tombol **Lihat Detail** (gold).
- Klik Lihat Detail -> modal/panel detail (ringkasan, risiko, biaya, tombol "Ajukan Penawaran"; teks "Periksa kembali informasi posisi sebelum mengajukan penawaran.").
- Empty: "Belum ada penawaran yang cocok. Ubah filter Anda." Loading: skeleton 6 kartu.
- Data: /src/mock/offerings.json (minimal 12 item, tampil 32 jika perlu).