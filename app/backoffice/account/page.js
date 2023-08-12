"use client"
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Image } from 'antd';
import { getEmployeeAddressesById, getEmployeeById } from '@app/api/getAPI/employee';
import { getFromLocalStorage } from '@lib/localStorage';
import { useRouter } from 'next/navigation';

const App = () => {
    const router = useRouter()
    const [data, setData] = useState(null)

    useEffect(() => {
        onLoad()
    },[])

    const onLoad = async () => { 
        let auth = getFromLocalStorage('auth')
        if(auth?.Employee_Id){
            const res = await getEmployeeById(auth?.Employee_Id)
            setData(res?.data?.[0])
            const resAdd = await getEmployeeAddressesById(auth?.Employee_Id)
            setData({
                ...res?.data?.[0],
                Addresses: resAdd?.data || null
            })
        }
        else router.push('/login')
    }
    
    return (
        <div>
            <div>{data?.Employee_Id}</div>
            <div>{data?.Employee_Firstname}</div>
            <div>{data?.Employee_Lastname}</div>
            <div>{data?.Employee_Sex}</div>
            <div>{data?.Employee_Phone}</div>
            <div>{data?.Employee_Email}</div>
            <div>{data?.Employee_Birth_Date}</div>
            <Image src={data?.Employee_Image || "/assets/images/avatars/avartar.jpeg"} alt="Bank" width={130} height={180}/>
            <div>
                {data?.Addresses?.map((item, index) => {
                    return <div key={"Employee-Address"+index}>
                        <div>{item.Employee_Address}</div>
                    </div>
                })}
            </div>
        </div>
    )
};
export default App;