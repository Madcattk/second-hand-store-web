"use client";
import React from 'react'
import { useRouter } from 'next/navigation';

const CustomerOrderList = () => {
    const router = useRouter();
    return (
        <>
            {[1,1,1,1,1].map((item, index) => (
                <div onClick={() => router.push(`/order/${111}`)} className='cursor-pointer hover:scale-[1.004] transform transition-transform duration-200 w-full flex_center flex-col gap-3 px-5 py-3 border border-brown mb-5' key={"Customer-Order"+index}>
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
                    <div className='w-full r'>Subtotal ฿1234.00 Baht</div>
                </div>
            ))}
        </>
    )
}

export default CustomerOrderList