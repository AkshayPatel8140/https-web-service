import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors'
import 'dotenv/config';
import github from './routes/github.js';
import getLoggerInstance from './logger.js';
import githubClassSchedule from './routes/githubClassSchedule.js';

const app = express();
const logger = getLoggerInstance()

const httpsOptions = {
    key: fs.readFileSync('./ssl/key.key'),
    cert: fs.readFileSync('./ssl/cert.crt')
}

const server = https.createServer(httpsOptions, app);
app.use(cors());
app.use(express.json());

app.use('/https-github/v1', github)
app.use('/https-github/v1', githubClassSchedule)

server.listen(8080, () => {
    logger.info('Server is Up Now')
    console.log('server id up now');
})

console.log('In index');