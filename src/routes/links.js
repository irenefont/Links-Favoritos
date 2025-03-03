const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add.hbs');
});

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    res.send('Recibido');
});

module.exports = router;