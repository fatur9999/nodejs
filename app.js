const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Cek Status API
app.get("/status", (req, res) => {
    res.send('{"kode":"01", "status": "Api Berbasis Express.js OK"}');
});

// Route POST Backup Sesuai Gambar Praktikum Anda
app.post("/backup", async (req, res) => {
    let pesanx, kodex;
    
    // Validasi pencegahan jika body request kosong (menghindari error crash atob)
    if (!req.body || !req.body.nama_backup || !req.body.dtx) {
        return res.status(400).json({ 
            kode: "00", 
            status: "Invalid request body. Expect JSON with nama_backup and dtx." 
        });
    }

    let nama = req.body.nama_backup;
    let dtx = atob(req.body.dtx); // Mendekode data Base64 dari HP
    let id = Date.now();
    let arr_data = dtx.split("#");
    
    let proses = await db.tambahBackup(id, nama, "nodejs");
    if (proses == "1") {
        let berhasil = 0;
        let gagal = 0;
        for (let k of arr_data) {
            let arr_data2 = k.split("|");
            let idx = arr_data2[0];
            let deskripsix = arr_data2[1];
            let waktux = arr_data2[2];
            let nominalx = arr_data2[3];
            let jenisx = arr_data2[4];
            
            let proses2 = await db.tambahTransaksi(`${id}-${idx}`, id, waktux, nominalx, jenisx, deskripsix);
            proses2 == "1" ? berhasil++ : gagal++;
        }
        pesanx = { kode: "01", status: "Proses Backup Berhasil dengan Rincian ", berhasil: berhasil, gagal: gagal };
        kodex = 200;
    } else {
        pesanx = { kode: "00", status: "Proses Backup Gagal, Periksa Kembali Data Anda" };
        kodex = 500;
    }
    return res.status(kodex).json(pesanx);
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(5775, () => {
        console.log("API Berjalan di Port: 5775");
    });
}

module.exports = app;