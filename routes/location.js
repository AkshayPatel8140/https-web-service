import { Router } from 'express';
import { getZipCode } from '../controller/getZipCode.js';
import { getLoggerInstance } from '../logger.js';
const location = Router();


const logger = getLoggerInstance()

// 1.GET (Fetch all data)
location.get('/user-location', async (req, res) => {
    logger.info('Enter user-location route')
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userInformation = await getZipCode(userIp)
    const userDevice = req.header('user-agent')

    console.log('userInformation', userInformation)

    let data = {
        userIp: userIp,
        userDevice: userDevice,
        userInformation: userInformation
    }
    res.json(data)
    logger.info('Exiting user-location route')
})



export default location