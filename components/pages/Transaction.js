"use client"
import { getSalesBySaleStatus, updateSaleStatusById } from '@app/api/getAPI/sale'
import { MetaSaleStatus } from '@components/Meta'
import { getFromLocalStorage } from '@lib/localStorage'
import React, { useEffect, useState } from 'react'
import { DateFormat } from '@components/formats';
import { Image } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

export const Transaction = ({ status }) => {
    const auth = getFromLocalStorage('auth')
    const [data, setData] = useState([])
    const [trackingNumbers, setTrackingNumbers] = useState({});

    useEffect(() => {
        onLoad()
    }, [status])

    const onLoad = async () => {
        const res = await getSalesBySaleStatus(status)
        setData(res?.data || [])
        if (res?.message === 'success') {
            let address = null;
            res?.data?.forEach((item, index) => {
                let add = item?.Delivery_Address?.split('%');
                address = {
                    Fullname: add[0] || '',
                    Address: add[1] || '',
                    District: add[2] || '',
                    Province: add[3] || '',
                    Zipcode: add[4] || '',
                    Country: add[5] || '',
                    Phone: add[6] || ''
                }
                res.data[index] = { ...item, Address: address };
            });

            setData(res?.data || [])
        }
    }

    const onUpdate = async (sale, status) => {
        if((!trackingNumbers?.[sale?.Sale_Id]) && status === MetaSaleStatus[5].id) {return }
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
                return <div className='border border-gray rounded-lg shadow-md p-3' key={"Sale" + saleIndex}>
                    <div className='w-full flex flex-col md:flex-row md:items-end justify-between border-b border-gray pb-2'>
                        <div>Sale ID: {sale?.Sale_Id || '-'}</div>
                        <div className='flex gap-1'>
                            <span>Sale Date: {DateFormat(sale?.Sale_Date || '-')}</span>
                            <span className='text-greyV1'>({sale?.Sale_Date && (Math.floor((Date.now() - new Date(sale.Sale_Date)) / (1000 * 60 * 60 * 24))) != 0 ? `${Math.floor((Date.now() - new Date(sale.Sale_Date)) / (1000 * 60 * 60 * 24))} days ago` : 'Today'})</span>
                        </div>
                        <div className='flex gap-1'>
                            <span>{sale?.Sale_Status || ''}</span>
                            {(sale?.Sale_Status === MetaSaleStatus?.[2]?.id || sale?.Sale_Status === MetaSaleStatus?.[5]?.id || sale?.Sale_Status === MetaSaleStatus?.[6]?.id) &&
                                <a href={`/pdf/${sale?.Sale_Id}`} target='_blank' rel="noopener noreferrer" className='text-sm font-light'><FontAwesomeIcon icon={faDownload} size="lg" /></a>
                            }
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-start md:flex-row justify-between'>
                        <div>
                            <div>{sale?.Address.Fullname || '-'} </div>
                            <div>{sale?.Address.Address || '-'} {sale?.Address.District || '-'} {sale?.Address?.Province || ''} {sale?.Address?.Zipcode || ''} {sale?.Address?.Country || ''} </div>
                            <div>Phone: {sale?.Address?.Phone || ''}</div>
                        </div>
                        <div>Tracking Number: {sale.Sale_Tracking_Number || '-'}</div>
                    </div>
                    <div>
                        {sale?.Product?.map((product, productIndex) => {
                            return <div className='w-full border-y border-brown py-2' key={"Product" + productIndex}>
                                <div className='w-full flex gap-4'>
                                    <Image
                                        src={product?.Product_Image || "/assets/images/avatars/no-image.png"}
                                        alt="Bank"
                                        width={200} height={120}
                                        className='w-[200px] h-[120px] object-cover' />
                                    <div className='w-full flex flex-col '>
                                        <div>Product ID: {product?.Product_Id}</div>
                                        <div>Product Name: {product?.Product_Name}</div>
                                        <div>Size: {product?.Size_Name || '-'}</div>
                                        <div>Detail: {product?.Product_Size_Detail || '-'}</div>
                                    </div>
                                    <div className='w-full r'>฿ {product?.Product_Price?.toFixed(2) || '-'} Baht</div>
                                </div>
                                

                            </div>
                        })}
                    </div>
                    <div className='w-full r'>
                        <div>Total ฿ {sale.Sale_Total_Price.toFixed(2) || '-'} Baht</div>
                        <div>Promotion {sale.Promotion_Name || '-'}</div>
                        <div>Discounted Total {sale.Discounted_Total_Price || '-'}</div>
                    </div>
                    <div>
                        <div className='w-full border-b border-gray'></div>
                        <div>Payment Date: {DateFormat(sale?.Payment_Date) || '-'}</div>
                        <Image src={sale?.Payment_Slip || "/assets/images/avatars/no-image.png"}
                            alt="Bank"
                            width={100} height={120}
                            className='w-[100px] h-[120px] object-cover' />
                    </div>
                    <div>Verified by Employee Id: {sale?.Employee_Id || '-'}</div>
                    {status === MetaSaleStatus[1].id &&
                        <div className='flex gap-3 py-2'>
                            <button className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none' onClick={(() => onUpdate(sale, MetaSaleStatus[2].id))} >CONFIRM</button>
                            <button className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none' onClick={(() => onUpdate(sale, MetaSaleStatus[3].id))}>INVALID</button>
                            <button className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none' onClick={(() => onUpdate(sale, MetaSaleStatus[4].id))}>CANCEL</button>
                        </div>
                    }
                    {status === MetaSaleStatus[2].id &&
                        <div className='flex gap-3 py-2'>
                            <input
                                className='border border-gray rounded-md p-1 w-56 hover:outline-none focus:outline-none'
                                placeholder='Tracking number'
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
                            <button className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none' onClick={(() => onUpdate(sale, MetaSaleStatus[5].id))}>Add Tracking Number</button>
                        </div>
                    }
                </div>
            })}
        </div>
    )
}
