"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { getAllProducts } from '@app/api/getAPI/product';

const ShopAll = () => {
    const router = useRouter();
    const [form, setForm] = useState([])
    
    useEffect(() => {
        onLoad()
    },[])

    const onLoad = async () => {
        const res = await getAllProducts();
        if(res?.message === 'success' && res?.data){
            setForm(res?.data)
        }
    }
    return (
        <>
            {form?.map((item, index)=>(
                <div onClick={() => router.push(`/member/product/${item?.Product_Id}`)} className='cursor-pointer md:col-span-3 col-span-2 w-full flex flex-col items-center' key={"Product"+index}>
                    <div className='w-full flex justify-center'>
                        <Image
                            src={ item?.Product_Image || "/assets/images/avatars/no-image.png"}
                            alt="Product"
                            width={280}
                            height={0}
                            className='xl:h-[450px] md:h-[360px] sm:h-[270px] h-[250px] object-cover w-full hover:scale-[1.01] transform transition-transform duration-200'
                        />
                    </div>   
                    <div className='p-2 flex_center flex-col font-light'>
                        {item.Product_Status === 'Available' ?
                            <>
                                <a>{item?.Product_Name || ''}</a>
                                <div>฿{item?.Product_Price?.toFixed(2)} Baht</div>
                            </>
                        :
                            <>
                                <a>{item?.Product_Name || ''}</a>
                                <div>{item?.Product_Status}</div>
                            </>
                        }
                    </div> 
                </div>
            ))}
        </>
)
}

export default ShopAll