import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Screen = () => {
    const [data, setData] = useState({})
    const [dataError, setDataError] = useState(false)
    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:8080/https-github/v1/get-store-data')
            setData(response?.data?.data)
        } catch (error) {
            setDataError(true)
        }
    }

    useEffect(() => { fetchData() }, [])

    // const { largeOrderThresholdCount, largeOrderCapUtilizationPerc } = data?.ecomStore


    return (
        <>
            {(dataError) ?
                <>
                    <p>Something wrong with API calling</p>
                </>
                :
                <div>
                    <div className='overflow'>{`largeOrderThresholdCount: ${data?.ecomStore?.largeOrderThresholdCount}`}</div>
                    <div className='overflow'>{`largeOrderCapUtilizationPerc: ${data?.ecomStore?.largeOrderCapUtilizationPerc}`}</div>
                    <div className='overflow'>{`operatingStatus: ${data?.ecomStore?.operatingStatus}`}</div>
                    <div className='overflow'>{`isDUGStore: ${data?.ecomStore?.isDUGStore}`}</div>
                    <div className='overflow'>{`isWFC: ${data?.ecomStore?.isWFC}`}</div>
                    <div className='overflow'>{`is3PLStore: ${data?.ecomStore?.is3PLStore}`}</div>
                    <div className='overflow'>{`isPremiumStore: ${data?.ecomStore?.isPremiumStore}`}</div>
                    <div className='overflow'>{`isDeliveryStore: ${data?.ecomStore?.isDeliveryStore}`}</div>
                    <div className='overflow'>{`isHybridStore: ${data?.ecomStore?.isHybridStore}`}</div>
                    <div className='overflow'>{`isPickupStore: ${data?.ecomStore?.isPickupStore}`}</div>
                    <div className='overflow'>{`pickupFeature: ${data?.ecomStore?.pickupFeature}`}</div>
                    <div className='overflow'>{`slotDisplayDays: ${data?.ecomStore?.slotDisplayDays}`}</div>
                    <div className='overflow'>{`isMKPEnabled: ${data?.ecomStore?.isMKPEnabled}`}</div>
                    <div className='overflow'>{`isDUGLightArrivalEnabled: ${data?.ecomStore?.isDUGLightArrivalEnabled}`}</div>
                    <div className='overflow'>{`isDUGArrivalEnabled: ${data?.ecomStore?.isDUGArrivalEnabled}`}</div>
                    <div className='overflow'>{`isMSTEnabled: ${data?.ecomStore?.isMSTEnabled}`}</div>
                    <div className='overflow'>{`storeFeatures: ${data?.ecomStore?.storeFeatures}`}</div>
                </div>
            }
        </>
    )
}

export default Screen;