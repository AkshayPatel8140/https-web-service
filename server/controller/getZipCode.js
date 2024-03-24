import { IP2LOCATION_API_KEY } from "../settings.js"
import axios from 'axios';

export const getZipCode = async (userIp) => {

    const ip2LocationUrl = `https://api.ip2location.io/?key=${IP2LOCATION_API_KEY}&ip=${userIp}`

    const zipCodeData = await axios.get(ip2LocationUrl)
        .then(response => { return response?.data })
        .catch(error => { console.log(error); throw error })

    return zipCodeData
}