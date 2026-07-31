import React, { useEffect, useRef } from "react";
import { Card } from "antd";
import { ReadOutlined } from "@ant-design/icons";

const CryptoNews = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ""; // Container reset

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        feedMode: "market",
        market: "crypto",
        isTransparent: false,
        displayMode: "regular",
        width: "100%",
        height: 550,
        colorTheme: "light",
        locale: "en",
      });

      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <ReadOutlined className="text-indigo-600 text-lg" />
          <span className="font-bold text-slate-800 text-base">
            Live Crypto Market News & Updates
          </span>
        </div>
      }
      className="shadow-sm border border-slate-200"
    >
      <div className="w-full h-[550px]" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </Card>
  );
};

export default CryptoNews;