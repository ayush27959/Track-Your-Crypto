import React, { useState, useEffect } from "react";
import { Card, Table, Tag, Spin } from "antd";
import { CaretUpOutlined, CaretDownOutlined, PieChartOutlined } from "@ant-design/icons";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import axios from "axios";
import http from "../../../utils/http";

const COLORS = ["#f7931a", "#627eea", "#14f195", "#0033ad", "#f3ba2f", "#8c8c8c", "#e6007a"];

const PortfolioHoldings = () => {
  const [holdings, setHoldings] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch user's crypto holdings from backend
        const holdingsRes = await http.get("/api/transaction/holdings");
        const userHoldings = holdingsRes.data.data || [];
        setHoldings(userHoldings);

        // 2. Fetch live prices from CoinGecko for held coins
        if (userHoldings.length > 0) {
          const coinNames = userHoldings.map((h) => h.coinName).join(",");
          const pricesRes = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
              params: {
                vs_currency: "usd",
                ids: coinNames,
              },
            }
          );

          const priceMap = {};
          pricesRes.data.forEach((coin) => {
            priceMap[coin.id] = coin.current_price;
          });
          setLivePrices(priceMap);
        }
      } catch (err) {
        console.error("Failed to load holdings or live prices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(val || 0);

  // Combine holdings with live prices to calculate PnL
  const enrichedData = holdings.map((item) => {
    const currentPrice = livePrices[item.coinName] || item.avgBuyPrice;
    const currentValue = item.netQuantity * currentPrice;
    const pnl = currentValue - item.totalInvested;
    const pnlPercentage = item.totalInvested > 0 ? (pnl / item.totalInvested) * 100 : 0;

    return {
      ...item,
      currentPrice,
      currentValue,
      pnl,
      pnlPercentage,
    };
  });

  // Table Columns Setup
  const columns = [
    {
      title: "Asset",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol, record) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-800">{symbol}</span>
          <span className="text-xs text-slate-400 capitalize">{record.coinName}</span>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "netQuantity",
      key: "netQuantity",
      render: (qty) => <span className="font-semibold">{qty.toFixed(4)}</span>,
    },
    {
      title: "Avg Buy Price",
      dataIndex: "avgBuyPrice",
      key: "avgBuyPrice",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Current Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Current Value",
      dataIndex: "currentValue",
      key: "currentValue",
      render: (val) => (
        <span className="font-bold text-slate-800">{formatCurrency(val)}</span>
      ),
    },
    {
      title: "Unrealized P&L",
      dataIndex: "pnl",
      key: "pnl",
      render: (_, record) => {
        const isProfit = record.pnl >= 0;
        return (
          <Tag
            color={isProfit ? "green" : "red"}
            className="font-bold text-xs py-0.5 px-2 flex items-center w-fit gap-1"
          >
            {isProfit ? <CaretUpOutlined /> : <CaretDownOutlined />}
            {formatCurrency(record.pnl)} ({record.pnlPercentage.toFixed(2)}%)
          </Tag>
        );
      },
    },
  ];

  // Pie chart data structure
  const pieData = enrichedData.map((item) => ({
    name: `${item.symbol}`,
    value: item.currentValue,
  }));

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center p-12 bg-white rounded-lg shadow-sm border border-slate-200">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Holdings Table */}
          <Card
            title={
              <span className="font-bold text-slate-800">
                Crypto Holdings & Profit/Loss
              </span>
            }
            className="lg:col-span-2 shadow-sm border border-slate-200"
          >
            <Table
              dataSource={enrichedData}
              columns={columns}
              rowKey="symbol"
              pagination={false}
              size="middle"
            />
          </Card>

          {/* Asset Allocation Pie Chart */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <PieChartOutlined className="text-indigo-600" />
                <span className="font-bold text-slate-800">
                  Portfolio Allocation
                </span>
              </div>
            }
            className="shadow-sm border border-slate-200"
          >
            <div className="w-full h-[280px]">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val) => [formatCurrency(val), "Value"]}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  No holdings data available
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PortfolioHoldings;