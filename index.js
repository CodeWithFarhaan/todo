const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        res.render('index', { files: files });
    });
});

app.post('/create', function (req, res) {
    const filename = req.body.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    fs.writeFile(`./files/${filename}.txt`, req.body.details, function (err) {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error writing file');
        }
        res.redirect('/');
    });
});
    
app.listen(3000);