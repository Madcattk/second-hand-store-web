"use client"
import React from 'react';
import { Anchor } from 'antd';
import { Card, Space } from 'antd';
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
    <div>
      <div
        id="paying"
        style={{
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
          background: 'rgba(0,255,0,0.02)',
        }}
        
      />
      <div
        id="waiting"
        style={{
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
          background: 'rgba(0,0,255,0.02)',
        }}
      />
      <div
        id="confirmed"
        style={{
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
          background: '#FFFBE9',
        }}
      />
      <div
        id="invalid"
        style={{
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
          background: '#F4EAD5',
        }}
      />
      <div
        id="canaeled"
        style={{
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
          background: '#DAE2B6',
        }}
      />
      <div
        id="shipped"
        style={{
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
          background: '#CCD6A6',
        }}
      />
    </div>
  </>
);
export default App;