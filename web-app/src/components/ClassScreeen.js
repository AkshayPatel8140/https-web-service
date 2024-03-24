import React, { useEffect, useState } from 'react';
import axios from 'axios'

const ClassScreen = () => {
    const [data, setHeaderData] = useState({})
    const [dataError, setDataError] = useState(false)
    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:8080/https-github/v1/online-courses')
            setHeaderData(response?.data)
        } catch (error) {
            setDataError(true)
        }
    }
    useEffect(() => { fetchData() }, [])

    const printList = () => {
        let res = ''
        for (let i = 0; i < data?.length; i++) {
            const element = data[i];
            res += `${JSON.stringify(element)}, `
        }
        return res
    }

    return (
        <>
            <div>
                <h2>online-courses list</h2>
                {(dataError) ?
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

export default ClassScreen;