const express = require('express');
const https = require('https')
const fs = require('fs');
const students = require('./routes/students');

const app = express();

const httpsOptions = {
    key: fs.readFileSync('./ssl/RootCA.key'),
    cert: fs.readFileSync('./ssl/RootCA.crt')
}
const server = https.createServer(httpsOptions, app);
app.use(express.json())

app.use('/SFBU/v1', students)

server.listen(8080, () => {
    console.log('server is up');
});