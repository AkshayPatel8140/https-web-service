import React, { useEffect, useState } from 'react';
import axios from 'axios'

const ClassFooter = () => {
    const [footerData, setFooterData] = useState({})
    const [footerDataError, setFooterDataError] = useState(false)
    const fetchHeaderData = async () => {
        try {
            const response = await axios.post('https://localhost:8080/https-github/v1/classroom', { course: "CE450" })
            setFooterData(response?.data)
        } catch (error) {
            setFooterDataError(true)
        }
    }
    useEffect(() => { fetchHeaderData() }, [])

    return (
        <>
            <div>
                <h2>ClassFooter / courses list</h2>
                {(footerDataError) ?
                    <>
                        <p>Something wrong with API calling</p>
                    </>
                    :
                    <>
                        <p>{footerData.classroom}</p>
                    </>
                }
            </div>
        </>
    )
}

export default ClassFooter;