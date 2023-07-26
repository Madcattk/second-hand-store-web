"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { getAllProducts, getProductsBySearch } from '@app/api/getAPI/product';
import { MetaProductStatus } from '@components/Meta';
import { useSelector, useDispatch } from 'react-redux'

const ShopAll = () => {
    const searchValue = useSelector((state) => state.search.value)
    const router = useRouter();
    const [form, setForm] = useState([])
    
    useEffect(() => {
        onLoad()
    },[])

    useEffect(() => {
        if(searchValue?.searchInput || searchValue?.searchType || searchValue?.searchSex){
            onSearch();
        }
        else {
            onLoad();
        }
    },[searchValue])

    const onLoad = async () => {
        const res = await getAllProducts();
        if(res?.message === 'success' && res?.data){
            setForm(res?.data)
        }
    }

    const onSearch = async () => {
        const res = await getProductsBySearch(searchValue);
        if(res?.message === 'success' && res?.data){
            setForm(res?.data)
        }
    }
    return (
        <>
            {form?.map((item, index)=>(
                <div onClick={() => router.push(`/member/product/${item?.Product_Id}`)} className='cursor-pointer md:col-span-3 col-span-2 w-full flex flex-col items-center' key={"Product"+index}>
                    <div className='w-full flex justify-center'>
                    <div className="relative w-full overflow-hidden">
                        {item?.Product_Status === MetaProductStatus[1].id && 
                            <div className="absolute inset-0 bg-black opacity-40 z-10 flex items-center justify-center">
                                <span className="text-white text-lg font-bold">{item?.Product_Status || ''}</span>
                            </div>
                        } 
                        <Image
                            src={item?.Product_Image || "/assets/images/avatars/no-image.png"}
                            alt="Product"
                            width={280}
                            height={0}
                            className={`xl:h-[450px] md:h-[360px] sm:h-[270px] h-[250px] object-cover w-full hover:scale-[1.01] transform transition-transform duration-200 relative`}
                        />
                        </div>
                    </div>   
                    <div className='p-2 flex_center flex-col font-light'>
                        {item.Product_Status === MetaProductStatus?.[0]?.id ?
                            <>
                                <a>{item?.Product_Name || ''}</a>
                                <div>฿{item?.Product_Price?.toFixed(2)} Baht</div>
                            </>
                        :
                            <>
                                <a>{item?.Product_Name || ''}</a>
                            </>
                        }
                    </div> 
                </div>
            ))}
        </>
)
}

export default ShopAll