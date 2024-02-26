const express = require('express');

const startup = express.Router();

startup.get('/', (req, res) => {
    res.send(`It's working`)
})

startup.get('/alive', (req, res) => {
    res.send('https-web-service is alive')
})

// Common KS Formate
module.exports = startup
