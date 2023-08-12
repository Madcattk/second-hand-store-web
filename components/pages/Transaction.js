"use client"
import { getSalesBySaleStatus, updateSaleStatusById } from '@app/api/getAPI/sale'
import { MetaSaleStatus } from '@components/Meta'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export const Sale = ({status}) => {
    const [data, setData] = useState([])
    useEffect(() => {
        onLoad()
    },[])
    
    const onLoad = async () => {
        const res = await getSalesBySaleStatus(status)
        setData(res?.data || [])
    }
    
    return (
        <div className='flex flex-col gap-3'>
            {data?.map((sale, saleIndex) => {
                return <div className='border p-3' key={"Sale"+saleIndex}>
                    <div>{sale.Sale_Id || '-'}</div>
                    <div>{sale.Sale_Date|| '-'}</div>
                    <div>{sale.Delivery_Address|| '-'}</div>
                    <div>{sale.Sale_Tracking_Number|| '-'}</div>
                    <div>
                        {sale?.Product?.map((product, productIndex) => {
                            return <div key={"Product"+productIndex}>
                                <div><Image src={product?.Product_Image || "/assets/images/avatars/no-image.png"} alt="Bank" width={100} height={150}/></div>
                                <div>{product?.Product_Id}</div>
                                <div>{product?.Product_Name}</div>
                            </div>
                        })}
                    </div>
                    <div>{sale.Sale_Total_Price || '-'}</div>
                    <div>{sale.Promotion_Name || '-'}</div>
                    <div>{sale.Discounted_Total_Price || '-'}</div>
                </div>
            })}
        </div>
    )
}

export const Waiting = ({status}) => {
    const [data, setData] = useState([])
    useEffect(() => {
        onLoad()
    },[])
    
    const onLoad = async () => {
        const res = await getSalesBySaleStatus(status)
        setData(res?.data || [])
    }

    const onUpdate = async (sale, status) => {
        if(status === MetaSaleStatus[4].id){
            // Cancel here
        } else {
            const res = await updateSaleStatusById({
                Sale_Id: sale.Sale_Id,
                Sale_Status: status
            })
        }
        onLoad()
    }
    return (
        <div className='flex flex-col gap-3'>
            {data?.map((sale, saleIndex) => {
                return <div className='border p-3' key={"Sale"+saleIndex}>
                    <div>{sale.Sale_Id || '-'}</div>
                    <div>{sale.Sale_Date|| '-'}</div>
                    <div>{sale.Delivery_Address|| '-'}</div>
                    <div>{sale.Sale_Tracking_Number|| '-'}</div>
                    <div>
                        {sale?.Product?.map((product, productIndex) => {
                            return <div key={"Product"+productIndex}>
                                <div><Image src={product?.Product_Image || "/assets/images/avatars/no-image.png"} alt="Bank" width={100} height={150}/></div>
                                <div>{product?.Product_Id}</div>
                                <div>{product?.Product_Name}</div>
                            </div>
                        })}
                    </div>
                    <div>{sale.Sale_Total_Price || '-'}</div>
                    <div>{sale.Promotion_Name || '-'}</div>
                    <div>{sale.Discounted_Total_Price || '-'}</div>
                    <Image src={sale?.Payment_Slip || "/assets/images/avatars/no-image.png"} alt="Bank" width={100} height={150}/>
                    <div className='flex gap-10'>
                        <button onClick={(() => onUpdate(sale, MetaSaleStatus[2].id))} >CONFIRM</button>
                        <button onClick={(() => onUpdate(sale, MetaSaleStatus[3].id))}>INVALID</button>
                        <button onClick={(() => onUpdate(sale, MetaSaleStatus[4].id))}>CANCEL</button>
                    </div>
                </div>
            })}
        </div>
    )
}

export const Confirmed = ({status}) => {
    const [data, setData] = useState([])
    useEffect(() => {
        onLoad()
    },[])
    
    const onLoad = async () => {
        const res = await getSalesBySaleStatus(status)
        setData(res?.data || [])
    }
    return (
        <div className='flex flex-col gap-3'>
            {data?.map((sale, saleIndex) => {
                return <div className='border p-3' key={"Sale"+saleIndex}>
                    <div>{sale.Sale_Id || '-'}</div>
                    <div>{sale.Sale_Date|| '-'}</div>
                    <div>{sale.Delivery_Address|| '-'}</div>
                    <div>{sale.Sale_Tracking_Number|| '-'}</div>
                    <div>
                        {sale?.Product?.map((product, productIndex) => {
                            return <div key={"Product"+productIndex}>
                                <div><Image src={product?.Product_Image || "/assets/images/avatars/no-image.png"} alt="Bank" width={100} height={150}/></div>
                                <div>{product?.Product_Id}</div>
                                <div>{product?.Product_Name}</div>
                            </div>
                        })}
                    </div>
                    <div>{sale.Sale_Total_Price || '-'}</div>
                    <div>{sale.Promotion_Name || '-'}</div>
                    <div>{sale.Discounted_Total_Price || '-'}</div>
                    <div>
                        <input className='border' type="text" name="" id="" />
                        <button>ADD TRACKING NUMBER</button>
                    </div>
                </div>
            })}
        </div>
    )
}
