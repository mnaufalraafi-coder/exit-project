# Screen Specifications & Wireframes

Dokumen ini memuat spesifikasi tampilan, alur, state, validasi, dan navigasi per layar platform EXIT.

---

# WF01: Login
Route: `/login` | Mockup: `mo01-login.png`

## Wireframe (ASCII)
```
+---------------------+----------------------------+
| BIDANG NAVY         |  [LOGO]                    |
| + sweep gold        |  Masuk ke Akun EXIT        |
|                     |  sub-judul                 |
|                     |  [Email                  ] |
|                     |  [Password            (o)] |
|                     |  [x] Ingat saya  Lupa PW?  |
|                     |  [        Masuk (gold)   ] |
|                     |  Belum punya akun? Daftar  |
+---------------------+----------------------------+
```

## Spesifikasi
- Layout: panel kiri bidang navy dengan sweep gold (atau foto jika ada), kartu form kanan di ivory.
- Konten: logo, H1 "Masuk ke Akun EXIT", sub "Kelola investasi dan take-over posisi Anda dengan aman dan mudah."
- Field: Email, Password (toggle tampil/sembunyi), checkbox "Ingat saya", link "Lupa Password?"
- Aksi utama: **Masuk** (gold). Footer: "Belum punya akun? Daftar Sekarang" -> /register
- Validasi: email format valid; password wajib. Error: "Email atau password belum sesuai. Periksa kembali."
- Sukses -> /app/overview. Loading: tombol "Memproses..." disabled.
- Mock auth: email apa saja + password minimal 8 karakter dianggap berhasil.

---

# WF02: Register
Route: `/register` | Mockup: `mo02-register.png`

## Wireframe (ASCII)
```
+---------------------+----------------------------+
| BIDANG NAVY         |  [LOGO]                    |
| + sweep gold        |  Buat Akun EXIT            |
|                     |  [Nama Lengkap           ] |
|                     |  [Email                  ] |
|                     |  [Nomor Telepon          ] |
|                     |  [Password            (o)] |
|                     |  [x] Setuju S&K, Privasi   |
|                     |  [        Daftar (gold)  ] |
+---------------------+----------------------------+
```

## Spesifikasi
- H1 "Buat Akun EXIT", sub "Mulai perjalanan investasi Anda di EXIT."
- Field: Nama Lengkap, Email, Nomor Telepon (+62, helper "Contoh: 812-3456-7890"), Password (helper "Minimal 8 karakter, kombinasi huruf dan angka").
- Checkbox wajib: "Saya setuju dengan Syarat & Ketentuan dan Kebijakan Privasi EXIT." (tautan)
- Aksi utama: **Daftar**. Footer: "Sudah punya akun? Masuk" -> /login
- Validasi langsung per field. Daftar disabled sampai checkbox dicentang.
- Sukses -> /onboarding.

---

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
