"use client"
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CustomerOrderList from '@components/pages/CustomerOrderList';
import CustomerProfileModal from '@components/pages/CustomerProfileModal';
import AddressModal from '@components/pages/AddressModal';
import { getFromLocalStorage, saveToLocalStorage } from '@lib/localStorage';
import { useRouter } from 'next/navigation';
import { getMemberAddressesById } from '@app/api/getAPI/member';
import { signIn } from '@auth/authMember';
import Loading from '@components/pages/Loading';

const page = () => {
    const router = useRouter();
    const [menu, setMenu] = useState(1);
    const [form, setForm] = useState({})
    const [add, setAdd] = useState(true)
    const [loading, setLoading] = useState(true)
    const [address, setAddress] = useState({})

    useEffect(() => {
        const _signIn = signIn()
        if(!_signIn) router.push('/login');
        else onLoad()
    },[])

    const onLogOut = () => {
        saveToLocalStorage('auth', null);
        router.push('/login')
    }
    
    const onLoad = async () => {
        const auth = getFromLocalStorage('auth')
        const res = await getMemberAddressesById(auth?.Member_Id || '')
        if(res?.message === 'success'){
            let address = [];
            res?.data?.forEach((item, index) => {
                let add = item?.Member_Address.split('%');
                address.push({
                    Member_Id: item?.Member_Id || '',
                    Fullname: add[0] || '',
                    Address: add[1] || '',
                    District: add[2] || '',
                    Province: add[3] || '',
                    Zipcode: add[4] || '',
                    Country: add[5] || '',
                    Phone: add[6] || '',
                    Member_Address: item?.Member_Address || ''
                })
            })
            auth.Member_Address = address;
        }
        setForm(auth);
        setLoading(false)
    }
    
    return (
        <Loading loading={loading}>
            <div className='flex flex-col items-center w-full relative'>
                <div className='xl:w-[1120px] lg:w-[820px] md:w-[620px] sm:w-96 w-72'>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <Image
                                src={form?.Member_Image || '/assets/images/avatars/avartar.jpeg'}
                                alt="Profile image"
                                width={110}
                                height={150}
                                className='object-cover w-[110px] h-[150px]'
                                priority='true'
                            />
                            <div className="px-6 py-2">
                            <div onClick={() => setMenu(0)} className='flex_center gap-3 hover:underline cursor-pointer'>
                                <i><FontAwesomeIcon icon={faSearch} size="lg"/></i>
                                <span className='text-[23px] font-light'>{form?.Member_Username || ''}</span>
                            </div>
                            <a onClick={() => onLogOut()} className='py-2 text-[16px] font-light hover:underline cursor-pointer show md:hidden'>Logout</a>
                            </div>
                        </div>
                        <div className='py-2 text-[16px] font-light md:block hidden'><span className='cursor-pointer hover:underline' onClick={() => onLogOut()}>Logout</span></div>
                    </div>    
                    <div className='border-b border-b-gray mt-5'/><div/>
                    <div className='w-full grid grid-cols-8 my-3 shadow bg-white text-brown font-light border border-brown'>
                        <div onClick={() => setMenu(0)} className={`${(menu === 0 || menu === 3) ? 'bg-brown text-white' : ''} md:col-span-1 col-span-4 w-full c py-2 cursor-pointer`}>Profile</div>
                        <div onClick={() => setMenu(1)} className={`${menu === 1 ? 'bg-brown text-white' : ''} md:col-span-1 col-span-4 w-full c py-2 cursor-pointer`}>Order</div>
                    </div>
                    {menu === 1 && <CustomerOrderList/>}                    
                    {(menu === 0 || menu === 3) && <CustomerProfileModal menu={menu} setMenu={setMenu} data={form} setAdd={setAdd} setAddress={setAddress} onLoad={onLoad}/>}                    
                </div>
                {menu === 3 && <AddressModal menu={menu} setMenu={setMenu} add={add} setAdd={setAdd} data={form?.Member_Id} address={address} setAddress={setAddress} onLoad={onLoad}/>}  
            </div>
        </Loading>
    )
}

export default page