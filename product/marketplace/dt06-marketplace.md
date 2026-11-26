# DT06: Data mock layar Marketplace
Simpan sebagai `src/mock/marketplace.json` (atau gabung per fitur). Semua data dummy.

```json
{
  "total": 32,
  "sort": "returnDesc",
  "items": [
    {
      "id": "o1",
      "title": "Pembiayaan Pengembangan Bahan Baku UMKM",
      "type": "P2P Lending",
      "amount": 75000000,
      "returnPct": 11.4,
      "tenorMonths": 12,
      "fundedPct": 76
    },
    {
      "id": "o2",
      "title": "Pendanaan Ekspansi Gerai F&B",
      "type": "SCF",
      "amount": 100000000,
      "returnPct": 12.5,
      "tenorMonths": 18,
      "fundedPct": 64
    },
    {
      "id": "o3",
      "title": "Modal Kerja Sektor Pertanian",
      "type": "P2P Lending",
      "amount": 50000000,
      "returnPct": 10.5,
      "tenorMonths": 9,
      "fundedPct": 88
    }
  ],
  "catatan": "Buat minimal 12 item; mitra pakai placeholder (Mitra A/B/C)."
}
```