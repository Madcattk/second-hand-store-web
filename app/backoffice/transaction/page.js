"use client"
import React from 'react';
import { Anchor } from 'antd';

const App = () => (
  <>
    <div
      style={{
        padding: '20px',
      }}
    >
      <Anchor
        direction="horizontal"
        items={[
          {
            key: 'paying',
            href: '#paying',
            title: 'Paying',
          },
          {
            key: 'waiting',
            href: '#waiting',
            title: 'Waiting',
          },
          {
            key: 'confirmed',
            href: '#confirmed',
            title: 'Confirmed',
          },
          {
            key: 'invalid',
            href: '#invalid',
            title: 'Invalid',
          },
          {
            key: 'canaeled',
            href: '#canaeled',
            title: 'Canaeled',
          },
          {
            key: 'shipped',
            href: '#shipped',
            title: 'Shipped',
          },
        ]}
      />
    </div>
  
  </>
);
export default App;