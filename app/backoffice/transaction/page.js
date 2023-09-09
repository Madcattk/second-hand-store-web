"use client"
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { MetaSaleStatus } from '@components/Meta';
import { Transaction } from '@components/pages/Transaction';
import { cutLot } from '@app/api/getAPI/sale';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastStyles.css';

const App = () => {
  const [tab, setTab] = useState(MetaSaleStatus?.[0]?.id);
  const items = MetaSaleStatus.map((status, index) => ({
    key: status.id,
    label: status.name,
    children: <Transaction status={tab}/> 
  }))

  const onChange = (key) => {
    setTab(key)
  }

  const onCutLot = async () => {
    try {
      const res = await cutLot();
      if(res?.message === 'success'){
        toast.success("🤍 Updated orders.", {
            autoClose: 2000,
        });
      }
    } catch (error) {
        console.error("Error in cutLot:", error);
    }
  }
  return (
    <>
      <div className='p-5 w-full'>
        <div className='w-full flex justify-end'>
          <button className='text-white w-18 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none' onClick={onCutLot}>Cancel Order</button>
        </div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};

export default App;
