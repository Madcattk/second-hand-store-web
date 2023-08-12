"use client"
import { getSalesBySaleStatus, updateSaleStatusById } from '@app/api/getAPI/sale'
import { MetaSaleStatus } from '@components/Meta'
import { getFromLocalStorage } from '@lib/localStorage'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export const Transaction = ({status}) => {
    const auth = getFromLocalStorage('auth')
    const [data, setData] = useState([])
    const [trackingNumbers, setTrackingNumbers] = useState({});

    useEffect(() => {
        onLoad()
    },[status])
    
    const onLoad = async () => {
        const res = await getSalesBySaleStatus(status)
        setData(res?.data || [])
    }
    
    const onUpdate = async (sale, status) => {
        const res = await updateSaleStatusById({
            Sale_Id: sale.Sale_Id,
            Sale_Status: status,
            Employee_Id: auth?.Employee_Id,
            Sale_Tracking_Number: trackingNumbers?.[sale?.Sale_Id] || null
        })
        onLoad()
    }
    
    return (
        <div className='flex flex-col gap-6'>
            {data?.map((sale, saleIndex) => {
                return <div className='border p-3' key={"Sale"+saleIndex}>
                    <div>sale id {sale.Sale_Id || '-'}</div>
                    <div>sale date {sale.Sale_Date|| '-'}</div>
                    <div>address {sale.Delivery_Address|| '-'}</div>
                    <div>tracking {sale.Sale_Tracking_Number|| '-'}</div>
                    <div>
                        {sale?.Product?.map((product, productIndex) => {
                            return <div className='border' key={"Product"+productIndex}>
                                <div>
                                    <Image 
                                    src={product?.Product_Image || "/assets/images/avatars/no-image.png"} 
                                    priority={true} 
                                    alt="Bank" 
                                    width={100} height={120}
                                    className='w-[100px] h-[120px] object-cover'/>
                                </div>
                                <div>product id {product?.Product_Id}</div>
                                <div>product name{product?.Product_Name}</div>
                            </div>
                        })}
                    </div>
                    <div>total {sale.Sale_Total_Price || '-'}</div>
                    <div>promotion {sale.Promotion_Name || '-'}</div>
                    <div>discounted total{sale.Discounted_Total_Price || '-'}</div>
                    <div>
                        <div>slip</div>
                        <Image src={sale?.Payment_Slip || "/assets/images/avatars/no-image.png"} 
                        priority={true} 
                        alt="Bank" 
                        width={100} height={120}
                        className='w-[100px] h-[120px] object-cover'/>
                    </div>
                    <div>Verified by {sale?.Employee_Id || '-'}</div>
                    {status === MetaSaleStatus[1].id &&
                        <div className='flex gap-10'>
                            <button onClick={(() => onUpdate(sale, MetaSaleStatus[2].id))} >CONFIRM</button>
                            <button onClick={(() => onUpdate(sale, MetaSaleStatus[3].id))}>INVALID</button>
                            <button onClick={(() => onUpdate(sale, MetaSaleStatus[4].id))}>CANCEL</button>
                        </div>
                    }
                    {status === MetaSaleStatus[2].id &&
                        <div>
                            <input
                                className='border'
                                type="text"
                                value={trackingNumbers[sale.Sale_Id] || ''}
                                onChange={(e) => {
                                    const updatedTrackingNumbers = {
                                        ...trackingNumbers,
                                        [sale.Sale_Id]: e.target.value,
                                    };
                                    setTrackingNumbers(updatedTrackingNumbers);
                                }}
                            />
                            <button onClick={(() => onUpdate(sale, MetaSaleStatus[5].id))}>ADD TRACKING NUMBER</button>
                        </div>
                    }
                </div>
            })}
        </div>
    )
}