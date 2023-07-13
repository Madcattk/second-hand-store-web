"use client";
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const ShopAll = () => {
    const router = useRouter();
    return (
        <>
            {[1,1,1,1,1,1]?.map((item, index)=>(
                <div onClick={() => router.push(`/member/product/${11}`)} className='cursor-pointer md:col-span-3 col-span-2 w-full flex flex-col items-center' key={"Product"+index}>
                    <div className='w-full flex justify-center'>
                        <Image
                            src="/assets/images/products/JeanVest.jpg"
                            alt="Product"
                            width={280}
                            height={0}
                            className='xl:h-[450px] md:h-[360px] sm:h-[270px] h-[250px] object-cover w-full hover:scale-[1.01] transform transition-transform duration-200'
                        />
                    </div>   
                    <div className='p-2 flex_center flex-col font-light'>
                        <a>Jean Vest</a>
                        <div>฿ 250.00 Baht</div>
                    </div> 
                </div>
            ))}
        </>
)
}

export default ShopAll