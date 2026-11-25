# WF03: Registrasi Investor
Route: `/onboarding` | Mockup: `mo03-onboarding.png`

## Wireframe (ASCII)
```
+---------------------+----------------------------+
| BIDANG NAVY         |  Registrasi Investor       |
|                     |  (1)-(2)-(3)-(4) stepper   |
|                     |  Data Akun                 |
|                     |  [Nama Lengkap  ][Email  ] |
|                     |  [No. HP ][Password      ] |
|                     |  [Konfirmasi Password    ] |
|                     |  [x] Setuju S&K            |
|                     |  [Kembali]  [Lanjutkan]    |
+---------------------+----------------------------+
```

## Spesifikasi
- Stepper 4 langkah (nomor tahap gold): 1 Data Akun, 2 Verifikasi Identitas, 3 Data Rekening, 4 Selesai. Teks "Langkah n dari 4".
- Langkah 1 Data Akun: Nama Lengkap, Email, Nomor Handphone, Buat Password, Konfirmasi Password, checkbox persetujuan Syarat & Ketentuan dan Kebijakan Privasi.
- Langkah 2 Verifikasi Identitas: NIK (16 digit), unggah foto KTP, unggah swafoto. Helper: "Lengkapi data untuk melanjutkan proses verifikasi." (unggah file cukup simulasi UI)
- Langkah 3 Data Rekening: Nama Bank (select), Nomor Rekening, Nama Pemilik (harus sesuai identitas).
- Langkah 4 Selesai: ringkasan + "Akun Anda sedang diverifikasi." tombol **Ke Dashboard** -> /app/overview.
- Aksi utama tiap langkah: **Lanjutkan** (gold). Ada tombol Kembali (sekunder). Footer: "Sudah punya akun? Masuk ke Akun".
- Validasi: konfirmasi password harus sama. Error: "Konfirmasi password belum sama."
