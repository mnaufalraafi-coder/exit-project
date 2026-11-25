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
