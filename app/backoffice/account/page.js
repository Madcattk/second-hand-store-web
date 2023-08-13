"use client"
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Image } from 'antd';
import { addEmployeeAddressById, editEmployeeAddressById, getEmployeeAddressesById, getEmployeeById } from '@app/api/getAPI/employee';
import { getFromLocalStorage } from '@lib/localStorage';
import { useRouter } from 'next/navigation';

const App = () => {
    const router = useRouter()
    const [data, setData] = useState(null)
    const [addAddress, setAddAddress] = useState(null)

    useEffect(() => {
        onLoad()
    },[])

    const onLoad = async () => { 
        let auth = getFromLocalStorage('auth')
        if(auth?.Employee_Id){
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
    }

    const onAddAddress = async () => {
        const res = await addEmployeeAddressById({
            Employee_Id: data?.Employee_Id || null,
            Employee_Address: addAddress || null
        })
        onLoad()
        setAddAddress(null)
    }
    
    return (
            
        <div>
            <Image src={data?.Employee_Image || "/assets/images/avatars/avartar.jpeg"} alt="Bank" width={130} height={180} /> 
            <div>ID {data?.Employee_Id}</div>
            <div>Firstname {data?.Employee_Firstname}</div>
            <div>Lastname {data?.Employee_Lastname}</div>
            <div>Sex {data?.Employee_Sex}</div>
            <div>Phone {data?.Employee_Phone}</div>
            <div>Email {data?.Employee_Email}</div>
            <div>Birth Date {data?.Employee_Birth_Date}</div>
            
            <div className='flex flex-col items-center w-full relative'>
            <div className='flex flex-col gap-3'>
                <div className='flex gap-2'>
                    <textarea
                        className='border'
                        name=""
                        id=""
                        cols="40"
                        rows="6"
                        value={addAddress || ""}
                        onChange={(e) => setAddAddress(e.target.value)}
                    ></textarea>
                    <button onClick={() => onAddAddress()}>Add New Address</button>
                </div>
                {data?.Addresses?.map((item, index) => {
                    return <div className='flex gap-2' key={"Employee-Address"+index}>
                        <textarea
                            className='border'
                            name=""
                            id=""
                            cols="40"
                            rows="6"
                            value={item?.New_Employee_Address || ""}
                            onChange={(e) => onChangeAddress(index, e.target.value)}
                        ></textarea>
                        <button onClick={() => onEditAddress(index)}>Edit</button>
                    </div>
                })}
            </div>
        </div>
        </div>
        
    )
};
export default App;