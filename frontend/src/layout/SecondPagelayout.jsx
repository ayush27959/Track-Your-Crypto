import React from 'react';
import { Layout, theme, Button } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const SecondPagelayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header className="!bg-white border-b border-slate-200 px-6 md:px-16 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Circular Logo Icon Placeholder */}
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-600/20">
            C
          </div>
          <h1 className="text-slate-900 text-xl md:text-2xl font-extrabold tracking-tight m-0">
            Crypto<span className="text-emerald-600">Tracker</span>
          </h1>
        </div>

        <Link to="/">
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            className="!bg-emerald-600 hover:!bg-emerald-500 !text-white !font-bold !border-none shadow-md shadow-emerald-600/20"
          >
            Go back to Home
          </Button>
        </Link>
      </Header>

      {/* Main Content Area */}
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
        className="max-w-7xl mx-auto w-full shadow-sm border border-slate-200/80"
      >
        {children}
      </Content>
    </Layout>
  );
};

export default SecondPagelayout;