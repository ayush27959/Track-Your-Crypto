import React, { useEffect, useRef } from "react";
import { Card } from "antd";
import { ReadOutlined } from "@ant-design/icons";

const CryptoNews = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous scripts/iframes
    container.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    container.appendChild(widgetDiv);

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

    container.appendChild(script);

    return () => {
      if (container) container.innerHTML = "";
    };
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
      <div
        className="tradingview-widget-container w-full h-[550px]"
        ref={containerRef}
      ></div>
    </Card>
  );
};

export default CryptoNews;