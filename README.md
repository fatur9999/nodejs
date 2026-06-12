# API Backup - petunjuk singkat

Deskripsi
- Repo ini menyediakan endpoint POST `/backup` untuk menyimpan data backup ke database MySQL.
- Perbaikan: ditambahkan helper `formatToMySQLDatetime` di `app.js` untuk memastikan format tanggal yang benar.

Menjalankan server
1. Install dependencies (jika perlu):

```bash
npm install
```

2. Jalankan server:

```bash
node app.js
```

Endpoint dan format payload
- Endpoint: `POST /backup`
- Content-Type: `application/json` (atau body raw yang berisi string base64)
- Parameter utama:
  - `nama_backup` atau `nama`: nama backup (string)
  - `dtx` atau `data`: string base64 yang berisi satu atau lebih record dipisah `#`

Format record setelah didecode (contoh):
- Setiap record dipisah `#`.
- Setiap field dalam record dipisah `|` dalam urutan: `idx|waktu|nominal|jenis|deskripsi`.
- `waktu` bisa berupa timestamp (detik atau ms) atau string tanggal ISO; akan diubah ke `YYYY-MM-DD HH:MM:SS`.

Contoh payload JSON

```json
{
  "nama_backup": "tes_backup_node",
  "dtx": "<base64 dari '1|1620000000|1000|jenisA|descA#2|2020-05-05T12:00:00Z|2000|jenisB|descB'>"
}
```

Contoh uji cepat
- Ada skrip uji `test-backup.js` di root. Setelah server dijalankan, jalankan:

```bash
node test-backup.js
```

Response sukses contoh:

```json
{"kode":"01","status":"Proses Backup Berhasil dengan Rincian","berhasil":2,"gagal":0}
```

Troubleshooting
- Jika terjadi error koneksi DB, cek kredensial di `db.js` (variabel lingkungan: `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_PORT`).
- Untuk cek koneksi DB endpoint tersedia: `GET /check-db`.
- Jika `dtx` tidak dapat didecode sebagai base64, server merespon 400 dengan pesan format tidak valid.

Perubahan yang dibuat
- `app.js`: menambahkan helper `formatToMySQLDatetime`.
- `test-backup.js`: skrip uji untuk mengirim payload contoh.

Jika mau, saya bisa:
- Menambahkan validasi payload lebih ketat.
- Menambahkan logging yang lebih terstruktur.
- Membuat skrip unit/integration test tambahan.
