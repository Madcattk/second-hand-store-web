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

} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;
const App = () => {
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
              icon: <UserOutlined />,
              label: 'Account',
            },
            {
              key: '2',
              icon: <TeamOutlined /> ,
              label: 'Employee',
            },
            {
              key: '3',
              icon: <InboxOutlined />,
              label: 'Transaction',
            },
            {
              key: '4',
              icon: <SkinOutlined />,
              label: 'Product',
            },
            {
              key: '5',
              icon: <SkinOutlined />,
              label: 'Product Type',
            },
            {
              key: '6',
              icon: <SkinOutlined />,
              label: 'Size',
            },
            {
              key: '7',
              icon: <SoundOutlined />,
              label: 'Promotion',
            },
            {
              key: '8',
              icon: <CalendarOutlined />,
              label: 'Report Summary',
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
            minHeight: 490,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;