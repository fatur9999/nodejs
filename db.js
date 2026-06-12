const mysql = require('mysql2/promise');
let sql;

// Fungsi Koneksi Database Online Contabo Anda
const buatKoneksi = async () => {
    return await mysql.createConnection({
        host: 'vmi2435571.contaboserver.net',
        user: 'ujhvmvgt_faktur',
        password: 'faktur959525',
        database: 'ujhvmvgt_backup'
    });
};

// Fungsi Tambah Data Induk Backup
const tambahBackup = async (id, nama, channel) => {
    const db = await buatKoneksi();
    sql = `INSERT INTO backup VALUES('${id}', '${nama}', '${channel}', NOW())`;
    try {
        await db.execute(sql);
        return "1";
    } catch(err) {
        return "0";
    }
};

// Fungsi Tambah Detail Transaksi Keuangan
const tambahTransaksi = async (idx, id, waktux, nominalx, jenisx, deskripsix) => {
    const db = await buatKoneksi();
    sql = `INSERT INTO backup_transaksi VALUES('${idx}', '${id}', '${waktux}', '${nominalx}', '${jenisx}', '${deskripsix}')`;
    try {
        await db.execute(sql);
        return "1";
    } catch(err) {
        return "0";
    }
};

module.exports = { buatKoneksi, tambahBackup, tambahTransaksi };