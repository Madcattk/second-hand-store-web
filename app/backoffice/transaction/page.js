"use client"
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { MetaSaleStatus } from '@components/Meta';
import { Transaction } from '@components/pages/Transaction';

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
  return (
    <>
      <div className='p-5'>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};

export default App;
