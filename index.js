const express = require('express');
const https = require('https')
const fs = require('fs');
const startup = require('./routes/startup');
const classSchedule = require('./routes/classSchedule');

const app = express();
// const cert = fs.readFileSync('./ssl/cert.pem')
// const key = fs.readFileSync('./ssl/key.pem')

const httpsOptions = {
    key: fs.readFileSync('./ssl/RootCA.key'),
    cert: fs.readFileSync('./ssl/RootCA.crt')
}
const server = https.createServer(httpsOptions, app);
app.use(express.json())

app.use('/https-web-service/v1', startup)
app.use('/https-web-service/v1', classSchedule)
//domain-name/seb-service/v1/<route/path/endpoint> ==> endpoint
//safeway.com/order-purchases/v1/purchaseHistory => endpoint
//safeway.com/order-purchases/v2/purchaseHistory => endpoint

server.listen(8080, () => {
    console.log('server is up');
});