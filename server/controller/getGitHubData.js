import axios from 'axios';
import { GITHUB_TOKAN } from '../settings.js';

export const getGitHubData = async () => {

    const ip2LocationUrl = `https://api.github.com/repos/CS548-2024Spring/SFBU-info/contents/class-schedule.json`

    const gitHubData = await axios.get(ip2LocationUrl, {
        headers: {
            Accept: 'application/vnd.github.raw+json',
            Authorization: `Bearer ${GITHUB_TOKAN}`,
        }
    })
        .then(response => { return response?.data })
        .catch(error => { console.log(error); throw error })

    return gitHubData
}

