import { IP2LOCATION_API_KEY } from "../settings.js"
import https from 'https';
import axios from 'axios';

export const getZipCode = async (userIp) => {

    const ip2LocationUrl = `https://api.ip2location.io/?key=${IP2LOCATION_API_KEY}&ip=${userIp}`

    console.log("🚀 ~ getZipCode ~ ip2LocationUrl:", ip2LocationUrl)

    // with Promises and https ==========
    // return new Promise((resolve, rejects) => {
    //     https.get(ip2LocationUrl, (response) => {
    //         let data = ''
    //         response.on('data', (chunk) => { data += chunk })
    //         response.on('end', () => {
    //             try {
    //                 const parseData = JSON.parse(data)
    //                 resolve(parseData)
    //             } catch (error) {
    //                 rejects(error)
    //             }
    //         }).on('error', (error) => { rejects(error) })
    //     })
    // })

    // with Promises and axios ==========
    const zipCodeData = await axios.get(ip2LocationUrl)
        .then(response => { return response?.data })
        .catch(error => { console.log(error); throw error })

    return zipCodeData
}

// getZipCode(userIp)