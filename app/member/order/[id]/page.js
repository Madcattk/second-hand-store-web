"use client"
import React, { useEffect, useState } from 'react'
import { Order, Review } from '@components/pages/Order'
import { useParams } from 'next/navigation'
import { getSaleById } from '@app/api/getAPI/sale';
import { getFromLocalStorage, saveToLocalStorage } from '@lib/localStorage';
import { useRouter } from 'next/navigation';
import Loading from '@components/pages/Loading';
import { MetaSaleStatus } from '@components/Meta';

const page = () => {
    const router = useRouter();
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(getFromLocalStorage('auth')) onLoad();
    },[])
    
    const onLoad = async () => {
        const res = await getSaleById(id)
        if(res?.message === 'success' && res?.data?.Product?.length > 0){   
            let address = null;
            let add = res?.data?.Delivery_Address?.split('%');
            address = {
                Member_Id: res?.data?.Member_Id || '',
                Fullname: add[0] || '',
                Address: add[1] || '',
                District: add[2] || '',
                Province: add[3] || '',
                Zipcode: add[4] || '',
                Country: add[5] || '',
                Phone: add[6] || '',
                Member_Address: res?.data?.Delivery_Address || ''
            }
            const updatedData = { ...res.data, Address: address };
            res.data = updatedData;
            let auth = getFromLocalStorage('auth')
            if(res?.data?.Member_Id === auth?.Member_Id) {
                setForm(res?.data || [])
                setLoading(false)
            } else router.back()
        } else {
            router.push('/member/account');
        }
    }

    const onChange = (update) => setForm({ ...form, ...update })

    return (
        <Loading loading={loading}>
            <div className='flex_center'>
                {form?.Sale_Status === MetaSaleStatus?.[6]?.id ?
                    <Review form={form} onChange={onChange} onLoad={onLoad} />
                :
                    <Order form={form} onChange={onChange} onLoad={onLoad} />
                }
            </div>
        </Loading>
    )
}

export default page