import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Header = () => {
    const [headerData, setHeaderData] = useState({})
    const [headerDataError, setHeaderDataError] = useState(false)

    const fetchHeaderData = async () => {
        try {
            const response = await axios.get('https://localhost:8080/https-github/v1/get-store-header-data')
            setHeaderData(response?.data?.data)
        } catch (error) {
            setHeaderDataError(true)
        }
    }

    useEffect(() => { fetchHeaderData() }, [])

    return (
        <>
            <div>
                <h2>Header</h2>
                {(headerDataError) ?
                    <>
                        <p>Something wrong with API calling</p>
                    </>
                    :
                    <>
                        <div><b>StoreName: {headerData?.storeName}</b></div>
                        <div><b>Store ID: {headerData?.storeId}</b></div>
                    </>
                }
            </div>
        </>
    )
}

export default Header;