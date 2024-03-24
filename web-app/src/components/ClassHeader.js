import React, { useEffect, useState } from 'react';
import axios from 'axios'

const ClassHeader = () => {
    const [headerData, setHeaderData] = useState({})
    const [headerDataError, setHeaderDataError] = useState(false)
    const fetchHeaderData = async () => {
        try {
            const response = await axios.get('https://localhost:8080/https-github/v1/courses')
            setHeaderData(response?.data)
        } catch (error) {
            setHeaderDataError(true)
        }
    }
    useEffect(() => { fetchHeaderData() }, [])

    const printList = () => {
        let res = ''
        for (let i = 0; i < headerData?.length; i++) {
            const element = headerData[i];
            res += JSON.stringify(element) + ', '
        }
        return res
    }

    return (
        <>
            <div>
                <h2>ClassHeader / courses list</h2>
                {(headerDataError) ?
                    <>
                        <p>Something wrong with API calling</p>
                    </>
                    :
                    <>
                        <p>{printList()}</p>
                    </>
                }
            </div>
        </>
    )
}

export default ClassHeader;