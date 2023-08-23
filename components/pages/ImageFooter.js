import { getImageFooter } from '@app/api/getAPI/product'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

const ImageFooter = () => {
    const router = useRouter()
    const searchValue = useSelector((state) => state.search.value)
    const [form, setForm] = useState([])

    useEffect(() => {
        onLoad()
    },[])

    const onLoad = async () => {
        let res = await getImageFooter()
        if(res?.message === 'success' && res?.data){
            setForm(res?.data)
        }
    }

    return (
        <div className='w-full my-10'>
            { (!(searchValue.searchInput || searchValue.searchType || searchValue.searchSex)) &&
                <>
                    <div className='w-full flex_center flex-col pb-10'>
                        <div className='uppercase md:text-2xl text-xl font-extralight'>Follow us @secondhandstore</div>
                        <div className='text-xl font-extralight'>Get inspired, shop the looks.</div>
                    </div>
                    <div className='w-full grid grid-cols-6 xl:h-[32vh] lg:h-[25vh] md:h-[20vh] sm:h-[15vh] h-[10vh]'>
                        {form?.map((item, index) => {
                            return <div onClick={() => router.push(`/member/product/${item?.Product_Id}`)} key={"Image-Footer"+index} className='col-span-1 relative h-full cursor-pointer bg-black'>
                                <Image src={item?.Product_Image || "/assets/images/avatars/no-image.png"} fill={true} alt='' priority={true} className='object-cover transition-opacity duration-300 hover:opacity-70'/>
                            </div>
                        })}
                    </div>
                </>
            }
        </div>
    )
}

export default ImageFooter