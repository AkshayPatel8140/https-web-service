import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors'
import 'dotenv/config';
import startup from './routes/startup.js';
import location from './routes/location.js';
import classSchedule from './routes/classSchedule.js';
import { IP2LOCATION_API_KEY } from './settings.js';
import { getLoggerInstance } from './logger.js';

const logger = getLoggerInstance()

const app = express();
// const cert = fs.readFileSync('./ssl/cert.pem')
// const key = fs.readFileSync('./ssl/key.pem')

const httpsOptions = {
    key: fs.readFileSync('./ssl/RootCA.key'),
    cert: fs.readFileSync('./ssl/RootCA.crt')
}
const server = https.createServer(httpsOptions, app);
app.use(cors())
app.use(express.json())

app.use('/https-web-service/v1', startup)
app.use('/https-web-service/v1', classSchedule)
app.use('/https-web-service/v1', location)
//domain-name/seb-service/v1/<route/path/endpoint> ==> endpoint
//safeway.com/order-purchases/v1/purchaseHistory => endpoint
//safeway.com/order-purchases/v2/purchaseHistory => endpoint

server.listen(8080, () => {
    logger.info('server is up');
    // console.log('server is up');
});