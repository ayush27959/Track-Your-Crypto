import React, { useEffect, useState } from "react";
import { Card, Spin, Tag, Typography } from "antd";
import { Line } from "rc-progress";
import axios from "axios";

const { Text, Title } = Typography;

const LiveMarket = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 6,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(res.data || []);
      } catch (err) {
        console.error("LiveMarket fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <Title level={5} className="!m-0 !text-sm !font-bold">
            Live Market Prices
          </Title>
        </div>
      }
      className="shadow-sm border border-slate-200"
    >
      {loading ? (
        <div className="flex justify-center p-6">
          <Spin />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {coins.map((c) => (
            <div
              key={c.id}
              className="p-3 border border-slate-100 rounded-lg bg-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <img src={c.image} alt={c.symbol} className="w-6 h-6" />
                    <Text strong className="!text-sm">
                      {c.name}
                    </Text>
                    <Tag className="ml-2">{c.symbol.toUpperCase()}</Tag>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold">${c.current_price}</div>
                  <div className="text-xs text-slate-500">Market Cap: ${
                    (c.market_cap || 0).toLocaleString()
                  }</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>24h</span>
                  <span
                    className={
                      c.price_change_percentage_24h >= 0
                        ? "text-emerald-600"
                        : "text-red-500"
                    }
                  >
                    {c.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </div>
                <div className="mt-1">
                  <Line
                    percent={Math.min(Math.abs(c.price_change_percentage_24h || 0), 100)}
                    strokeWidth={4}
                    strokeColor={c.price_change_percentage_24h >= 0 ? "#10B981" : "#F97316"}
                    trailWidth={4}
                    trailColor="#E5E7EB"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default LiveMarket;
