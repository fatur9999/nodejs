const http = require('http');

const payload = {
  nama_backup: 'tes_backup_node',
  dtx: Buffer.from('1|1620000000|1000|jenisA|descA#2|2020-05-05T12:00:00Z|2000|jenisB|descB').toString('base64')
};

const data = JSON.stringify(payload);

const options = {
  hostname: 'localhost',
  port: 5775,
  path: '/backup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  console.log('STATUS:', res.statusCode);
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log('RESPONSE:', body);
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error('REQUEST ERROR:', e.message);
  process.exit(1);
});

req.write(data);
req.end();
