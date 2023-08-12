"use client"
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { MetaSaleStatus } from '@components/Meta';
import { Sale, Confirmed, Waiting } from '@components/pages/Transaction';

const App = () => {
  const [tab, setTab] = useState(null);
  const items = MetaSaleStatus.map((status, index) => ({
    key: status.id,
    label: status.name,
    children: index === 1 ? <Waiting status={status.id}/> :
    index === 2 ? <Confirmed status={status.id}/> : <Sale status={status.id}/>
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
