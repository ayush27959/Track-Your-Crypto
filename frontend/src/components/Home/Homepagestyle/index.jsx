import React from 'react';
import { Layout, Button, Card } from 'antd';
import { Link } from "react-router-dom";
import {
  WalletOutlined,
  LineChartOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

const HomeLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header className="!bg-white border-b border-slate-200 px-6 md:px-16 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-600/20">
            C
          </div>
          <h1 className="text-slate-900 text-xl md:text-2xl font-extrabold tracking-tight m-0">
            Crypto<span className="text-emerald-600">Tracker</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button type="text" className="!text-slate-700 !font-bold hover:!text-emerald-600">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              type="primary"
              className="!bg-emerald-600 hover:!bg-emerald-500 !text-white !font-bold !border-none shadow-md shadow-emerald-600/20"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </Header>

      {/* Hero Section */}
      <div className="px-6 md:px-16 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-semibold mb-6">
              <ThunderboltOutlined className="text-emerald-600" /> Real-Time Portfolio Tracking
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
              Track Your <br />
              <span className="text-emerald-600">Crypto Assets</span> <br />
              Smarter & Faster
            </h1>

            <p className="text-slate-600 mt-6 text-lg leading-relaxed font-medium">
              Monitor live market prices, log transactions, and keep complete control over your portfolio performance with our secure dashboard.
            </p>

            <div className="flex gap-4 mt-8 flex-wrap">
              <Link to="/signup">
                <Button
                  size="large"
                  type="primary"
                  className="!bg-emerald-600 hover:!bg-emerald-500 !text-white !font-bold !border-none !h-12 !px-8 shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                >
                  Start Tracking Free <ArrowRightOutlined />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="large" 
                  className="!bg-white !text-slate-800 !border-slate-300 hover:!border-emerald-600 !font-bold !h-12 !px-6"
                >
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6001/6001368.png"
                alt="Crypto Wallet Tracker"
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 border-y border-slate-200">
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Everything You Need to Manage Crypto
            </h2>
            <p className="text-slate-600 mt-2 font-medium">
              Powerful features built directly into your personal workspace.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="!bg-slate-50 !border-slate-200 hover:!border-emerald-500 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
                <LineChartOutlined className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Live Prices Feed
              </h3>
              <p className="text-slate-600 mt-2 font-medium leading-relaxed">
                Stay updated with real-time price feeds and market trends powered by CoinGecko API.
              </p>
            </Card>

            <Card className="!bg-slate-50 !border-slate-200 hover:!border-emerald-500 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
                <WalletOutlined className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Transaction Ledger
              </h3>
              <p className="text-slate-600 mt-2 font-medium leading-relaxed">
                Log buys, sells, and transfers easily to maintain an accurate ledger of all holdings.
              </p>
            </Card>

            <Card className="!bg-slate-50 !border-slate-200 hover:!border-emerald-500 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
                <SafetyCertificateOutlined className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                JWT Encrypted
              </h3>
              <p className="text-slate-600 mt-2 font-medium leading-relaxed">
                Your portfolio data stays strictly encrypted, private, and accessible only to you.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <Content className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-3xl p-10 md:p-14 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Take Control of Your Crypto Portfolio
          </h2>

          <p className="text-slate-300 text-lg mt-4 max-w-2xl mx-auto font-medium">
            Join now to track your trades, monitor profit/loss, and manage your assets cleanly.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link to="/signup">
              <Button
                type="primary"
                size="large"
                className="!bg-emerald-500 hover:!bg-emerald-400 !text-slate-950 !font-extrabold !border-none !h-12 !px-8 shadow-lg shadow-emerald-500/20"
              >
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </Content>

      {/* Footer */}
      <Footer className="!bg-white border-t border-slate-200 py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div>
            <h2 className="text-slate-900 text-2xl font-black tracking-wide m-0">
              Crypto<span className="text-emerald-600">Tracker</span>
            </h2>
            <p className="text-slate-600 mt-2 font-medium">
              Full-stack MERN application for managing crypto assets and live transactions.
            </p>
          </div>

          <div>
            <h3 className="text-slate-900 text-base font-bold mb-2">
              Quick Links
            </h3>
            <div className="flex flex-col gap-1 text-slate-600 font-semibold">
              <Link to="/login" className="hover:text-emerald-600">Login</Link>
              <Link to="/signup" className="hover:text-emerald-600">Register</Link>
            </div>
          </div>

          <div>
            <h3 className="text-slate-900 text-base font-bold mb-2">
              Contact
            </h3>
            <p className="text-slate-600 font-medium m-0">ayushkumar27959@gmail.com</p>
            <p className="text-slate-600 font-medium mt-1 m-0">+91 7079919291</p>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6 text-center">
          <p className="text-slate-500 text-sm m-0 font-semibold">
            © 2026 Crypto Wallet & Transaction Tracker | Built with React, Ant Design & MERN Stack
          </p>
        </div>
      </Footer>
    </Layout>
  );
};

export default HomeLayout;