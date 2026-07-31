import React from 'react';
import { Layout, theme, Button } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

const Homelayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header className="!bg-white border-b border-slate-200 px-6 md:px-16 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
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

      {/* Footer */}
      <Footer className="!bg-white border-t border-slate-200 py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div>
            <h2 className="text-slate-900 text-2xl font-black tracking-wide m-0">
              Crypto<span className="text-emerald-600">Tracker</span>
            </h2>
            <p className="text-slate-600 mt-2 font-medium leading-relaxed">
              Full-stack MERN application for managing crypto assets, live coin prices, and transaction records.
            </p>
          </div>

          <div>
            <h3 className="text-slate-900 text-base font-bold mb-2">
              Quick Links
            </h3>
            <div className="flex flex-col gap-1 text-slate-600 font-semibold">
              <Link to="/" className="hover:text-emerald-600">Home</Link>
              <Link to="/login" className="hover:text-emerald-600">Sign In</Link>
              <Link to="/signup" className="hover:text-emerald-600">Create Account</Link>
            </div>
          </div>

          <div>
            <h3 className="text-slate-900 text-base font-bold mb-2">
              Support & Contact
            </h3>
            <p className="text-slate-600 font-medium m-0">ayushkumar27959@gmail.com</p>
            <p className="text-slate-600 font-medium mt-1 m-0">+91 7079919291</p>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6 text-center">
          <p className="text-slate-500 text-sm m-0 font-semibold">
            © 2026 Crypto Wallet & Transaction Tracker App
          </p>
        </div>
      </Footer>
    </Layout>
  );
};

export default Homelayout;