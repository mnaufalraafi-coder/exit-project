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
