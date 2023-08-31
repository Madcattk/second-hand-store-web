"use client"
import React, { useEffect, useState } from 'react';
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
import { useRouter, usePathname, useParams } from 'next/navigation';
import { saveToLocalStorage, getFromLocalStorage } from '@lib/localStorage';
import { useDispatch } from 'react-redux';
import { clearAuth } from '@redux/authSlice';
import { layouts } from 'chart.js';
import { signIn } from '@auth/authEmployee';
const { Header, Sider, Content } = Layout;

const layoutBackOffice = ({ children }) => {
  const router = useRouter();
  const url = useParams();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
} = theme.useToken();

  useEffect(() => {
    if(!signIn()) router.replace('/login');
  },[url])
  
// if(getFromLocalStorage('auth') == null) {
//     router.push('/login')
// }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
            onClick={({ item }) => {
                // console.log(item.props.path)
                router.push(item.props.path)
                if(item.props.path == '/logout') {
                   saveToLocalStorage('auth', null); 
                   //dispatch(clearAuth()); 
                   router.push('/login')
                }
            }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
                items={[
                {
                    key: '1',
                    icon: <HomeOutlined />,
                    label: 'Home',
                    path: '/backoffice',
                },
                {
                    key: '2',
                    icon: <UserOutlined />,
                    label: 'Account',
                    path: "/backoffice/account"
                },
                {
                    key: '3',
                    icon: <TeamOutlined /> ,
                    label: 'Employee',
                    path: "/backoffice/employee"
                },
                {
                    key: '4',
                    icon: <InboxOutlined />,
                    label: 'Transaction',
                    path: "/backoffice/transaction"
                },
                {
                    key: '5',
                    icon: <SkinOutlined />,
                    label: 'Product',
                    path: "/backoffice/product"
                },
                {
                    key: '6',
                    icon: <SkinOutlined />,
                    label: 'Product Type',
                    path: "/backoffice/producttype"
                },
                {
                    key: '7',
                    icon: <SkinOutlined />,
                    label: 'Size',
                    path: "/backoffice/size"
                },
                {
                    key: '8',
                    icon: <SoundOutlined />,
                    label: 'Promotion',
                    path: "/backoffice/promotion"
                },
                {
                    key: '9',
                    icon: <CalendarOutlined />,
                    label: 'Report Summary',
                    path: "/backoffice/dashboard"
                },
                {
                    key: '10',
                    icon: <LogoutOutlined />,
                    label: 'Log out',
                    path: "/logout"
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
            minHeight: '100vh',
            background: colorBgContainer,
          }}
          
        >
          { children }
        </Content>
      </Layout>
    </Layout>
  );
};
export default layoutBackOffice;