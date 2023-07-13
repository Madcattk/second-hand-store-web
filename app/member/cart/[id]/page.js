"use client"
import { useState } from 'react'
import React from 'react'
import Image from 'next/image'
import { ButtonText, InputBox, InputFile } from '@components/inputs'

const page = () => {
    const [form, setForm] = useState({})
    const [newDeliveryAddress, setNewDeliveryAddress] = useState(false)
    const onChange = (update) => setForm({ ...form, ...update })
    return (
        <div className='flex flex-col items-center w-full mb-10'>
            <div className='xl:w-[1120px] lg:w-[820px] md:w-[620px] sm:w-96 w-72 border border-brown grid lg:grid-cols-3 grid-cols-1'>
                <div className='lg:col-span-2 col-span-1 p-10 flex flex-col gap-3 md:border-r border-brown'>
                    <div className='text-3xl'>Summary</div>
                    <div className='w-full flex justify-between text-[10px] font-light'>
                        <span>PRODUCT</span>
                        <span>PRICE</span>
                    </div>
                    <div className='border-y border-brown py-2 w-full max-h-[400px] overflow-auto'>
                        {[1,1,1,1,1,1].map((item, index, array) => (
                            <React.Fragment key={"Customer-Order"+index}>
                                <div className='w-full grid grid-cols-1 md:grid-cols-3'>
                                    <div className='md:col-span-2 flex gap-2'>
                                        <div>
                                            <Image src="/assets/images/products/JeanVest.jpg" alt="Product" width={80} height={100}/>
                                        </div>
                                        <div className='flex flex-col font-light'>
                                            <span>Purple Bag</span>
                                            <span className='text-xs'>Size: S</span>
                                            <span className='text-xs'>Detail: fggfggfgfg fgfgfgfgfgfg</span>
                                        </div>
                                    </div>
                                    <div className='md:col-start-3 r font-light'>฿1900.00 Baht</div>
                                </div>  
                                {index !== array.length - 1 && <div className='md:col-start-3 border-b border-gray my-2'></div>}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className='w-full r'>Discount 30% ฿ 624.00 Baht</div>
                    <div className='w-full border-b border-gray'></div>
                    <div className='w-full r'>Subtotal ฿1234.00 Baht</div>
                    <div className='w-full border-b border-gray'></div>
                </div>
                <div className='p-10 col-span-1 flex flex-col gap-3'>
                    <div className='py-2 text-xl font-light'>Delivery Information</div>
                    <div className='w-full flex flex-col gap-3 max-h-[260px] overflow-y-auto'>
                        {[1,1,1,1].map((item,index) => (
                            <div className='cursor-pointer p-3 border border-brown w-full font-light' key={"Customer-Address"+index}>
                                <div>Wofie Cindy</div>
                                <div>114/1 Siphya Road Mahapruetharam Bangkok 10500</div>
                                <div>Phone: 0614569987</div>
                            </div>
                        ))}
                    </div>
                    {!newDeliveryAddress && <div onClick={() => setNewDeliveryAddress(true)} className='cursor-pointer p-3 border border-brown w-full font-light'>Add New Address</div>}
                    {newDeliveryAddress &&
                        <div className='w-full'>
                            <InputBox onChange={(email) => onChange({ email })} value={form?.email || ''} placeholder='Fullname' classBox='w-full'/>
                            <InputBox onChange={(email) => onChange({ email })} value={form?.email || ''} placeholder='Address' classBox='w-full'/>
                            <div className='flex w-full'>
                                <InputBox onChange={(email) => onChange({ email })} value={form?.email || ''} placeholder='District' classBox='w-full border-r border-brown'/>
                                <InputBox onChange={(password) => onChange({ password })} value={form?.password || ''} placeholder='Province' classBox='w-full'/>
                            </div>
                            <div className='flex w-full'>
                                <InputBox onChange={(email) => onChange({ email })} value={form?.email || ''} placeholder='Zip code' classBox='w-full border-r border-brown'/>
                                <InputBox onChange={(password) => onChange({ password })} value={form?.password || ''} placeholder='Phone' classBox='w-full'/>
                            </div>
                        </div>
                    }
                    <InputFile onChange={(order_slip) => onChange({ order_slip })} value={''} placeholder='Profile Picture' classBox='w-full'/>
                    <label htmlFor="order_slip" className='w-full l text-xs text-greyV1'>Upload slip here. ( later within 3 days )</label>
                    <ButtonText onClick={() => setMenu(3)} placeholder='CHECK OUT' classBox='w-full'/>
                </div>
            </div>
        </div>
    )
}

export default page