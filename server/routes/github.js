import express from 'express'
import store_data from '../database/github_settings.json' assert {type: 'json'}
import { getZipCode } from '../controller/getZipCode.js'

const github = express.Router()

const user_device_data = async (req) => {
    const userIp = req.headers['x-forwarded-for'] || req?.socket?.remoteAddress
    const userInformation = await getZipCode(userIp)
    const userDevice = req.header('user-agent')
    return { userIp: userIp, userDevice: userDevice, userInformation: userInformation }
}

github.get('/', (req, res) => {
    res.send('You are in the git data route')
})

github.get('/get-store-data', async (req, res) => {
    res.json({ data: store_data })
})

github.get('/get-store-header-data', async (req, res) => {
    let data = {
        ...await user_device_data(req),
        data: {
            storeName: store_data?.ecomStore?.polarisBannerName,
            storeId: store_data?.ecomStore?.wfcStoreId
        }
    }
    res.json(data)
})
github.get('/get-store-Footer-data', async (req, res) => {
    let data = {
        ...await user_device_data(req),
        data: {
            storeLocations: store_data?.ecomStore?.mappedZipCodes
        }
    }
    res.json(data)
})


export default github