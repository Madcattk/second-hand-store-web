"use client"
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined,
  SkinOutlined,
  InboxOutlined,
  CalendarOutlined,
  SoundOutlined,
  LogoutOutlined,
  HomeOutlined,

} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { saveToLocalStorage } from '@lib/localStorage';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearAuth } from '@redux/authSlice';
const { Header, Sider, Content } = Layout;
const App = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Home',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Account',
            },
            {
              key: '3',
              icon: <TeamOutlined /> ,
              label: 'Employee',
            },
            {
              key: '4',
              icon: <InboxOutlined />,
              label: 'Transaction',
            },
            {
              key: '5',
              icon: <SkinOutlined />,
              label: 'Product',
            },
            {
              key: '6',
              icon: <SkinOutlined />,
              label: 'Product Type',
            },
            {
              key: '7',
              icon: <SkinOutlined />,
              label: 'Size',
            },
            {
              key: '8',
              icon: <SoundOutlined />,
              label: 'Promotion',
            },
            {
              key: '9',
              icon: <CalendarOutlined />,
              label: 'Report Summary',
            },
            {
              key: '10',
              icon: <LogoutOutlined />,
              label: 'Log out',
              
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 570,
            background: colorBgContainer,
          }}
          
        >
          <a onClick={() => {saveToLocalStorage('auth', null); dispatch(clearAuth()); router.push('/login');}}>Log out</a>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
