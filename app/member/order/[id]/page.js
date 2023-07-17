"use client"
import React, { useEffect, useState } from 'react'
import { Order, Review } from '@components/pages/Order'
import { useParams } from 'next/navigation'
import { getSaleById } from '@app/api/getAPI/sale';
import { getFromLocalStorage, saveToLocalStorage } from '@lib/localStorage';
import { DateFormat } from '@components/formats';
import { signIn } from '@auth/authMember';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const { id } = useParams();
    const [auth, setAuth] = useState(null);
    const [form, setForm] = useState(null);

    useEffect(() => {
        const _signIn = signIn()
        if(!_signIn) router.push('/login');
        else setAuth(getFromLocalStorage('auth'))
    },[])

    useEffect(() => {
        if(auth) onLoad();
    },[auth])
    
    const onLoad = async () => {
        const res = await getSaleById(id)
        if(res?.message === 'success'){        
            let address = null;
            let add = res?.data?.Delivery_Address.split('%');
            address = {
                Member_Id: res?.data?.Member_Id || '',
                Fullname: add[0] || '',
                Address: add[1] || '',
                District: add[2] || '',
                Province: add[3] || '',
                Zipcode: add[4] || '',
                Phone: add[5] || '',
                Member_Address: res?.data?.Delivery_Address || ''
            }
                const updatedData = { ...res.data, Address: address };
                res.data = updatedData;
            setForm(res?.data || []);
        }
    }

    const onChange = (update) => setForm({ ...form, ...update })

    return (
        <div className='flex_center'>
            {form?.Sale_Status === 'Received' ?
                <Review form={form} onChange={onChange} onLoad={onLoad} />
            :
                <Order form={form} onChange={onChange} onLoad={onLoad} />
            }
        </div>
    )
}

export default page