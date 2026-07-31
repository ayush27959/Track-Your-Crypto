import {
  BarChartOutlined,
  DollarCircleOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Button, Divider, Card, Alert } from "antd";
import DailyTransactionChart from "../DailyTransactionChart";
import LiveMarket from "../LiveMarket/LiveMarket";
import CryptoNews from "../CryptoNews/CryptoNews";
import PortfolioHoldings from "../PortfolioHoldings";
import { useState, useEffect } from "react";
import http from "../../../utils/http";
import Loader from "../loader";

const Dashboard = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    http
      .get("/api/dashboard/report")
      .then((res) => {
        setReport(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setError(err.response?.data?.message || "Failed to load dashboard data");
      })
      .finally(() => setLoading(false));
  }, []);

  // CSV Export Handler
  const handleExportCSV = (chartData) => {
    if (!chartData || !chartData.length) return;

    const headers = "Date,Total Amount ($)\n";
    const rows = chartData
      .map((row) => `${row.date},${row.total}`)
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Crypto_Activity_Report_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="p-4">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );

  const { summary, chart } = report || {};

  // Utility to format currency
  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(val || 0);

  return (
    <div className="p-2 space-y-6">
      {/* Top Header Actions */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800 m-0">
            Portfolio Dashboard
          </h1>
          <p className="text-xs text-slate-400 m-0">
            Track live rates, trade analytics, and recent activity
          </p>
        </div>

        <Button
          type="default"
          icon={<DownloadOutlined />}
          onClick={() => handleExportCSV(chart)}
          className="hover:border-indigo-600 hover:text-indigo-600 font-semibold"
        >
          Export CSV
        </Button>
      </div>

      {/* 1. LIVE MARKET PRICES (Clickable for Analysis Modal) */}
      <LiveMarket />

      {/* 2. SUMMARY CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Card 1: Total Trades */}
        <Card className="shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-y-2">
              <Button
                type="primary"
                icon={<BarChartOutlined />}
                size="large"
                shape="circle"
                className="!bg-emerald-600 !border-none"
              />
              <h1 className="text-sm font-bold text-slate-700 m-0">
                Total Trades
              </h1>
            </div>

            <Divider type="vertical" className="!h-16" />

            <div className="text-right">
              <h1 className="text-2xl font-black text-emerald-600 m-0">
                {summary?.totalTransaction || 0}
              </h1>
              <p className="text-xs text-slate-400 font-medium m-0">
                Est: {summary?.totalTransactionEstimate || 0}
              </p>
            </div>
          </div>
        </Card>

        {/* Card 2: Total Buy */}
        <Card className="shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-y-2">
              <Button
                type="primary"
                icon={<ArrowDownOutlined />}
                size="large"
                shape="circle"
                className="!bg-blue-600 !border-none"
              />
              <h1 className="text-sm font-bold text-blue-600 m-0">
                Total Buy
              </h1>
            </div>

            <Divider type="vertical" className="!h-16" />

            <div className="text-right">
              <h1 className="text-2xl font-black text-blue-600 m-0">
                {formatCurrency(summary?.totalCredit)}
              </h1>
              <p className="text-xs text-slate-400 font-medium m-0">
                Est: {formatCurrency(summary?.totalCreditEstimate)}
              </p>
            </div>
          </div>
        </Card>

        {/* Card 3: Total Sell */}
        <Card className="shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-y-2">
              <Button
                type="primary"
                icon={<ArrowUpOutlined />}
                size="large"
                shape="circle"
                className="!bg-amber-600 !border-none"
              />
              <h1 className="text-sm font-bold text-amber-600 m-0">
                Total Sell
              </h1>
            </div>

            <Divider type="vertical" className="!h-16" />

            <div className="text-right">
              <h1 className="text-2xl font-black text-amber-600 m-0">
                {formatCurrency(summary?.totalDebit)}
              </h1>
              <p className="text-xs text-slate-400 font-medium m-0">
                Est: {formatCurrency(summary?.totalDebitEstimate)}
              </p>
            </div>
          </div>
        </Card>

        {/* Card 4: Portfolio Balance */}
        <Card className="shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-y-2">
              <Button
                type="primary"
                icon={<DollarCircleOutlined />}
                size="large"
                shape="circle"
                className="!bg-indigo-600 !border-none"
              />
              <h1 className="text-sm font-bold text-indigo-600 m-0">
                Portfolio
              </h1>
            </div>

            <Divider type="vertical" className="!h-16" />

            <div className="text-right">
              <h1
                className={`text-2xl font-black m-0 ${
                  (summary?.balance || 0) >= 0
                    ? "text-indigo-600"
                    : "text-red-500"
                }`}
              >
                {formatCurrency(summary?.balance)}
              </h1>
              <p className="text-xs text-slate-400 font-medium m-0">
                Est: {formatCurrency(summary?.balanceEstimate)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* 3. PORTFOLIO HOLDINGS & UNREALIZED PnL TABLE */}
      <div>
        <PortfolioHoldings />
      </div>

      {/* 4. ANALYTICS CHART */}
      <div>
        <Card
          title={
            <span className="font-bold text-slate-800">
              Crypto Activity Analytics (Last 30 Days)
            </span>
          }
          className="shadow-sm border border-slate-200"
        >
          <DailyTransactionChart transactions={chart || []} />
        </Card>
      </div>

      {/* 5. CRYPTO MARKET NEWS FEED */}
      <div>
        <CryptoNews />
      </div>
    </div>
  );
};

export default Dashboard;