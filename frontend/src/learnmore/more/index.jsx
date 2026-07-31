import React from 'react';
import { Link } from "react-router-dom";
import { Card, Button } from 'antd';
import {
  PieChartOutlined,
  WalletOutlined,
  SafetyCertificateOutlined,
  LineChartOutlined,
  ArrowRightOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import HomeLayout from '../../layout/Homelayout';

const LearnMore = () => {
  return (
    <HomeLayout>
      <div className="min-h-screen bg-slate-50 px-6 md:px-16 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-semibold mb-6">
            <ThunderboltOutlined className="text-emerald-600" /> Real-Time Market & Asset Analytics
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            Learn More About <br />
            <span className="text-emerald-600">CryptoTracker</span>
          </h1>

          <p className="text-slate-600 text-lg mt-6 leading-relaxed font-medium">
            Discover how CryptoTracker helps you log transactions, monitor live coin prices via CoinGecko API,
            track portfolio gains & losses, and manage your crypto assets securely.
          </p>

          <Link to="/signup">
            <Button
              type="primary"
              size="large"
              className="!bg-emerald-600 hover:!bg-emerald-500 !text-white !font-bold !border-none !h-12 !px-8 shadow-lg shadow-emerald-600/20 mt-8 inline-flex items-center gap-2"
            >
              Get Started Free <ArrowRightOutlined />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-7xl mx-auto">
          <Card className="!bg-white rounded-2xl shadow-md border border-slate-200 hover:!border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
              <LineChartOutlined className="text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Live Coin Prices</h2>
            <p className="text-slate-600 mt-2 leading-relaxed font-medium">
              Fetch real-time price feeds for Bitcoin, Ethereum, and top altcoins dynamically.
            </p>
          </Card>

          <Card className="!bg-white rounded-2xl shadow-md border border-slate-200 hover:!border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
              <WalletOutlined className="text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Wallet Management</h2>
            <p className="text-slate-600 mt-2 leading-relaxed font-medium">
              Log buy, sell, and transfer operations to keep complete ledger records.
            </p>
          </Card>

          <Card className="!bg-white rounded-2xl shadow-md border border-slate-200 hover:!border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
              <PieChartOutlined className="text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Portfolio Growth</h2>
            <p className="text-slate-600 mt-2 leading-relaxed font-medium">
              Track overall asset growth and profit/loss distribution over time.
            </p>
          </Card>

          <Card className="!bg-white rounded-2xl shadow-md border border-slate-200 hover:!border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
              <SafetyCertificateOutlined className="text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">JWT Encrypted</h2>
            <p className="text-slate-600 mt-2 leading-relaxed font-medium">
              Your transaction history and portfolio data remain strictly private and protected.
            </p>
          </Card>
        </div>

        {/* About Section */}
        <div className="mt-20 bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-14 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center">
            Why Choose CryptoTracker?
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed mt-6 text-center max-w-4xl mx-auto font-medium">
            CryptoTracker is engineered to streamline personal asset management.
            Whether you are recording daily crypto purchases, analyzing profit distributions,
            or monitoring live market valuations, our platform delivers an intuitive workspace.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-200">
              <h3 className="text-xl font-extrabold text-emerald-600">
                User-Friendly Interface
              </h3>
              <p className="text-slate-600 mt-3 font-medium leading-relaxed">
                Clean and responsive dashboard designed for seamless transaction entries.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-200">
              <h3 className="text-xl font-extrabold text-emerald-600">
                Live Market API
              </h3>
              <p className="text-slate-600 mt-3 font-medium leading-relaxed">
                Integrated with external APIs for reliable real-time cryptocurrency values.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-200">
              <h3 className="text-xl font-extrabold text-emerald-600">
                Secure Data Store
              </h3>
              <p className="text-slate-600 mt-3 font-medium leading-relaxed">
                Powered by MongoDB & Node.js JWT authentication for reliable privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default LearnMore;