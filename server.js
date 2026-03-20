const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const visits = []; // Loglar bellekte tutulur

app.get('/log', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const time = new Date().toLocaleString('tr-TR');
  const entry = { ip, time };
  visits.push(entry);
  console.log('Ziyaret:', entry);
  res.json({ ok: true });
});

app.get('/logs', (req, res) => {
  let html = '<h2>Ziyaretçi Logları</h2><table border="1" cellpadding="8">';
  html += '<tr><th>#</th><th>IP</th><th>Zaman</th></tr>';
  visits.forEach((v, i) => {
    html += `<tr><td>${i+1}</td><td>${v.ip}</td><td>${v.time}</td></tr>`;
  });
  html += '</table>';
  res.send(html);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Logger ayakta, port:', PORT));
