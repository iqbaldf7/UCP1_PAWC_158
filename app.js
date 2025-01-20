const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware untuk parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk menyajikan file statis (CSS, JS, gambar, dll.)
app.use(express.static('public'));

// In-memory array untuk menyimpan data thrift items
let thriftItems = [];

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.render('index', { thriftItems });
});

// Route untuk menampilkan form tambah barang
app.get('/add', (req, res) => {
    res.render('add');
});

// Route untuk menangani form tambah barang
app.post('/add', (req, res) => {
    const { name, price } = req.body;
    thriftItems.push({ name, price });
    res.redirect('/');
});

// Route untuk menampilkan form edit barang
app.get('/edit/:index', (req, res) => {
    const index = req.params.index;
    const item = thriftItems[index];
    res.render('edit', { item, index });
});

// Route untuk menangani form edit barang
app.post('/edit/:index', (req, res) => {
    const index = req.params.index;
    const { name, price } = req.body;
    thriftItems[index] = { name, price };
    res.redirect('/');
});

// Route untuk menghapus barang
app.post('/delete/:index', (req, res) => {
    const index = req.params.index;
    thriftItems.splice(index, 1);
    res.redirect('/');
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});