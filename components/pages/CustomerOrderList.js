"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { getMemberOrdersById } from '@app/api/getAPI/sale';
import { getFromLocalStorage, saveToLocalStorage } from '@lib/localStorage';
import { DateFormat } from '@components/formats';
import Image from 'next/image' 

const CustomerOrderList = () => {
    const router = useRouter();
    const [auth, setAuth] = useState(null);
    const [form, setForm] = useState(null);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        setAuth(getFromLocalStorage('auth'))
    },[])

    useEffect(() => {
        if(auth) onLoad();
    },[auth])
    
    const onLoad = async () => {
        const res = await getMemberOrdersById(auth?.Member_Id)
        if(res?.message === 'success'){        
            let address = null;
            res?.data?.forEach((item, index) => {
                let add = item?.Delivery_Address.split('%');
                address = {
                    Member_Id: item?.Member_Id || '',
                    Fullname: add[0] || '',
                    Address: add[1] || '',
                    District: add[2] || '',
                    Province: add[3] || '',
                    Zipcode: add[4] || '',
                    Country: add[5] || '',
                    Phone: add[6] || '',
                    Member_Address: item?.Delivery_Address || ''
                }
                const updatedData = { ...res.data[index], Address: address };
                res.data[index] = updatedData;
            })
            setForm(res?.data || []);
        }
    }

    return (
        <>
            {form?.map((item, index) => (
                <div onMouseOver={() => setHover(item?.Sale_Id)} onMouseLeave={() => setHover(null)} onClick={() => router.push(`/member/order/${item?.Sale_Id}`)} className='cursor-pointer w-full h-fit flex pl-3 border border-brown mb-5' key={"Customer-Order"+index}>
                    <div className='w-full flex_center flex-col gap-3 py-3 pr-3'>
                        <div className='w-full flex flex-col md:flex-row md:items-end justify-between font-light'>
                            <span>ORDER NO: {item?.Sale_Id || ''}</span>
                            <span className='text-sm'>Date: {DateFormat(item?.Sale_Date) || ''}</span>
                            <span>{item?.Sale_Status || ''}</span>
                        </div>
                        <div className='w-full py-1 flex flex-col md:flex-row items-start justify-between font-light text-sm border-b border-b-gray border-t border-t-gray'>
                            <div className='lg:w-[250px]'>
                                <div>{item?.Address?.Fullname || ''}</div>
                                <div>{item?.Address?.Address || ''} {item?.Address?.District || ''} {item?.Address?.Province || ''} {item?.Address?.Zipcode || ''} {item?.Address?.Country || ''}</div>
                                <div>Phone: {item?.Address?.Phone || ''}</div>
                            </div>
                            <div className="relative w-[100px] hidden lg:flex">
                                {item?.Product_Images?.map((image, indexImg) => {
                                    if(indexImg <= 2) {
                                    return <div className={`absolute top-0 ${indexImg === 0 ? 'left-0 z-20' : 'left-10 z-10'} w-14`} key={"Product-Image"+indexImg}>
                                            <Image className='w-14 h-14 object-cover rounded-full' src={image?.Product_Image || "/assets/images/avatars/more.png"} alt="..." width={56} height={56}/>
                                        </div>
                                    }
                                })}
                                {item?.Product_Images?.length > 2 &&
                                    <div className="absolute top-0 left-20 w-14">
                                        <Image className='w-14 h-14 object-cover rounded-full' src="/assets/images/avatars/more.png" alt="..." width={56} height={56}/>
                                    </div>
                                }
                            </div>
                            <div className='lg:w-[250px] md:text-right text-left'>Tracking Number: {item?.Sale_Tracking_Number || '-'}</div>
                        </div>
                        <div className='w-full r'>Total ฿{item?.Discounted_Total_Price?.toFixed(2) || item?.Sale_Total_Price?.toFixed(2)} Baht</div>
                    </div>
                    <div className={`min-h-full flex ${hover === item?.Sale_Id ? 'bg-brown pr-2' : ''} transform transition-all duration-300`}></div>
                </div>
            ))}
        </>
    )
}

export default CustomerOrderList