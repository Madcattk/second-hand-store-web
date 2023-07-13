"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { InputFile, ButtonText } from '@components/inputs';

export const Order = () => {
    return (
        <div className='w-full flex_center'>
            <div className='xl:w-[1120px] lg:w-[820px] md:w-[620px] sm:w-96 w-72 flex_center flex-col gap-3 px-5 py-3 border border-brown mb-5'>
                <div className='w-full flex flex-col md:flex-row md:items-end justify-between font-light'>
                    <span>ORDER NO: 12342222</span>
                    <span className='text-sm'>Date: 2023-02-07</span>
                    <span>Status</span>
                </div>
                <div className='w-full py-1 flex flex-col md:flex-row items-start justify-between font-light text-sm border-b border-b-gray border-t border-t-gray'>
                    <div>
                    <div>Luna Braise</div>
                    <div>114/1 Siphya Road Mahapruetharam Bangkok 10500</div>
                    <div>Phone: 0614567777</div>
                    </div>
                    <div>Tracking Nuber: 111111111111</div>
                </div>
                <div className='w-full flex justify-between text-[10px] font-light'>
                    <span>PRODUCT</span>
                    <span>PRICE</span>
                </div>
                <div className='w-full border-y border-brown py-2'>
                    {[1,1].map((item, index, array) => (
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
                <InputFile onChange={(order_slip) => onChange({ order_slip })} value={''} placeholder='Profile Picture' classBox='w-full'/>
                <label htmlFor="order_slip" className='w-full l text-xs text-greyV1'>Upload slip here. ( later within 3 days )</label>
                <div className='w-full flex justify-end'><ButtonText onClick={() => onSave()} placeholder='UPLOAD' classBox='w-72'/></div>
            </div>
        </div>
    )
}

export const Review = () => {
    return (
        <div className='w-full flex_center'>
            <div className='xl:w-[1120px] lg:w-[820px] md:w-[620px] sm:w-96 w-72 flex_center flex-col gap-3 px-5 py-3 border border-brown mb-5'>
                <div className='w-full flex flex-col md:flex-row md:items-end justify-between font-light'>
                    <span>ORDER NO: 12342222</span>
                    <span className='text-sm'>Date: 2023-02-03</span>
                    <span>Status</span>
                </div>
                <div className='w-full py-1 flex flex-col md:flex-row items-start justify-between font-light text-sm border-b border-b-gray border-t border-t-gray'>
                    <div>
                    <div>Luna Braise</div>
                    <div>114/1 Siphya Road Mahapruetharam Bangkok 10500</div>
                    <div>Phone: 0614567777</div>
                    </div>
                    <div>Tracking Nuber: 111111111111</div>
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-3 text-[10px] font-light'>
                    <span>PRODUCT</span>
                    <span className='r md:block hidden'>PRICE</span>
                    <span className='r md:block hidden'>REVIEW</span>
                </div>
                <div className='w-full border-y border-brown py-2'>
                    {[1,1].map((item, index, array) => (
                        <React.Fragment key={"Customer-Order"+index}>
                            <div className='w-full grid grid-cols-1 md:grid-cols-3'>
                                <div className='flex gap-2'>
                                    <div>
                                        <Image src="/assets/images/products/JeanVest.jpg" alt="Product" width={80} height={100}/>
                                    </div>
                                    <div className='flex flex-col font-light'>
                                        <span>Purple Bag</span>
                                        <span className='text-xs'>Size: S</span>
                                        <span className='text-xs'>Detail: fggfggfgfg fgfgfgfgfgfg</span>
                                    </div>
                                </div>
                                <div className='r font-light'>฿1900.00 Baht</div>
                                <div className='w-full flex justify-end'><ButtonText onClick={() => onSave()} placeholder='REVIEW' classBox='lg:w-52 sm:w-44 w-full'/></div>
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
        </div>
    )
}