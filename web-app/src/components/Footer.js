import React, { useEffect, useState } from 'react';
import axios from 'axios'


const Footer = () => {
    const [footerData, setFooterData] = useState({})
    const [footerDataError, setFooterDataError] = useState(false)

    const fetchFooterData = async () => {
        try {
            const response = await axios.get('https://localhost:8080/https-github/v1/get-store-footer-data')
            setFooterData(response?.data?.data)
        } catch (error) {
            setFooterDataError(true)
        }
    }

    useEffect(() => { fetchFooterData() }, [])

    const printList = () => {
        let res = ''
        for (let i = 0; i < footerData?.storeLocations?.length; i++) {
            const element = footerData?.storeLocations[i];
            res += `${element}, `
        }
        return res
    }
    return (
        <>
            <div>
                <h2>Footer</h2>
                {(footerDataError) ?
                    <>
                        <p>Something wrong with API calling</p>
                    </>
                    :
                    <div>
                        <b>Other store locations zip code:</b>
                        <p>{printList()}</p>
                    </div>
                }
            </div>
        </>
    )
}

export default Footer;