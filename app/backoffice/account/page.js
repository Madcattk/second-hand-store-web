"use client"
import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import { addEmployeeAddressById, deleteEmployeeAddressesById, editEmployeeAddressById, getEmployeeAddressesById, getEmployeeById } from '@app/api/getAPI/employee';
import { getFromLocalStorage } from '@lib/localStorage';
import { useRouter } from 'next/navigation';
import { DateFormat } from '@components/formats';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';

const App = () => {
    const router = useRouter()
    const [data, setData] = useState(null)
    const [addAddress, setAddAddress] = useState(null)

    useEffect(() => {
        onLoad()
    }, [])

    const onLoad = async () => {
        let auth = getFromLocalStorage('auth')
        if (auth?.Employee_Id) {
            const res = await getEmployeeById(auth?.Employee_Id)
            setData(res?.data?.[0])
            const resAdd = await getEmployeeAddressesById(auth?.Employee_Id)
            let _resAdd = resAdd?.data?.map((item, index) => {
                return {
                    Employee_Id: item.Employee_Id,
                    Employee_Address: item.Employee_Address,
                    New_Employee_Address: item.Employee_Address
                }
            })
            setData({
                ...res?.data?.[0],
                Addresses: _resAdd || []
            })
        }
        else router.push('/login')
    }

    const onChangeAddress = (index, value) => {
        const updatedAddresses = [...data.Addresses];
        updatedAddresses[index].New_Employee_Address = value;
        setData({
            ...data,
            Addresses: updatedAddresses
        })
    }

    const onEditAddress = async (index) => {
        const res = await editEmployeeAddressById(data?.Addresses?.[index])
        if(res?.message === 'success'){
            toast.success("🤍 Edited address", {
                autoClose: 3000,
            });
        }
        else {
            toast.error("❗️ Couldn't edit address", {
                autoClose: 3000,
            });
        }
    }

    const onAddAddress = async () => {
        const res = await addEmployeeAddressById({
            Employee_Id: data?.Employee_Id || null,
            Employee_Address: addAddress || null
        })
        onLoad()
        setAddAddress(null)
    }

    const onDeleteAddress = async (index) => {
        const res = await deleteEmployeeAddressesById(data?.Addresses?.[index]?.Employee_Id, 
            data?.Addresses?.[index]?.Employee_Address)
        if(res?.message === 'success'){
            toast.success("🤍 Deleted address", {
                autoClose: 3000,
            });
        }
        else {
            toast.error("❗️ Couldn't delete address", {
                autoClose: 3000,
            });
        }
        onLoad()
    }
    
    return (
        <div className='px-5'>
            <div className='flex justify-between'>
                <div className='flex gap-5'>
                    <Image src={data?.Employee_Image || "/assets/images/avatars/avartar.jpeg"}
                        alt="Profile image"
                        width={150} height={190}
                        className='object-cover w-[110px] h-[150px]' />
                    <div className='flex flex-col col-span-2'>
                        <div>ID: {data?.Employee_Id} </div>
                        <div>Firstname: {data?.Employee_Firstname}</div> 
                        <div>Lastname: {data?.Employee_Lastname}</div>
                        <div>Sex: {data?.Employee_Sex}</div>
                        <div>Phone: {data?.Employee_Phone}</div>
                        <div>Email: {data?.Employee_Email}</div>
                        <div>Birth Date: {DateFormat(data?.Employee_Birth_Date)}</div>
                    </div>
                </div>
                <button className='flex gap-5' onClick={() => router.push(`/backoffice/employee/${data.Employee_Id}`)}>Edit Profile</button>
            </div>
            <div className='w-full grid grid-cols-8 my-3 shadow bg-white text-brown font-light border border-brown'></div>
            <div className='font-extralight text-3xl pb-5 '>Address</div>
            <div className='flex flex-col gap-3'>
                <div className='flex gap-2 h-full items-end'>
                    <textarea
                        className='border border-gray rounded-lg p-2 hover:outline-none focus:outline-none'
                        placeholder='New address'
                        name=""
                        id=""
                        cols="40"
                        rows="6"
                        value={addAddress || ""}
                        onChange={(e) => setAddAddress(e.target.value)}
                    ></textarea>
                    <div>
                        <button className='text-white w-40 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none' onClick={() => onAddAddress()}>Add New Address</button>
                    </div>
                </div>
                {data?.Addresses?.map((item, index) => {
                    return <div className='flex gap-2 h-full items-end' key={"Employee-Address" + index}>
                        <textarea
                            className='border border-gray rounded-lg p-2 hover:outline-none focus:outline-none'
                            placeholder='Edit address'
                            name=""
                            id=""
                            cols="40"
                            rows="6"
                            value={item?.New_Employee_Address || ""}
                            onChange={(e) => onChangeAddress(index, e.target.value)}
                        ></textarea>
                        <div className='flex flex-col gap-1'>
                            <button className='text-white w-40 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none' onClick={() => onEditAddress(index)}>Edit Address</button>
                            <button className='text-white w-40 bg-red-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none' onClick={() => onDeleteAddress(index)}>Delete</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
};

export default App;