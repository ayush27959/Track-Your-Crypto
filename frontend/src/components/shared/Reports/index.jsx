import {
  BarChartOutlined,
  DollarCircleOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  SaveOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Progress,
  InputNumber,
  Typography,
  message,
  Tag,
} from "antd";
import { useState, useEffect } from "react";
import http from "../../../utils/http";
import Loader from "../loader";

const { Title, Text } = Typography;

const Report = () => {
  const [report, setReport] = useState(null);

  // Get current user for unique storage key
  const currentUser = JSON.parse(localStorage.getItem("expense-user") || "{}");
  const budgetKey = currentUser?._id ? `cryptoTarget_${currentUser._id}` : "cryptoTarget";

  const [monthlyTarget, setMonthlyTarget] = useState(() => {
    const saved = localStorage.getItem(budgetKey);
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    http
      .get("/api/dashboard/report")
      .then((res) => setReport(res.data))
      .catch(console.error);
  }, []);

  if (!report) return <Loader />;

  const { summary } = report;
  const investedAmount = summary?.totalCredit || summary?.totalBuy || 0;
  const totalSell = summary?.totalDebit || summary?.totalSell || 0;
  const netPortfolio = summary?.balance || 0;

  const percent = monthlyTarget > 0 ? Math.round((investedAmount / monthlyTarget) * 100) : 0;

  const handleSave = () => {
    localStorage.setItem(budgetKey, monthlyTarget);
    message.success("Investment target updated successfully!");
  };

  return (
    <div className="p-2 md:p-4 bg-[#f8fafc] min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <Title level={2} className="!mb-0 !font-bold">Portfolio Analysis</Title>
        <Text type="secondary">Track your crypto investments against monthly targets.</Text>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Trades", val: summary.totalTransaction || 0, est: summary.totalTransactionEstimate, icon: <BarChartOutlined />, color: "rose", suffix: "T" },
          { label: "Total Buy", val: `$${investedAmount}`, est: summary.totalCreditEstimate, icon: <ArrowDownOutlined />, color: "green", suffix: "$" },
          { label: "Total Sell", val: `$${totalSell}`, est: summary.totalDebitEstimate, icon: <ArrowUpOutlined />, color: "orange", suffix: "$" },
          { label: "Net Portfolio", val: `$${netPortfolio}`, est: summary.balanceEstimate, icon: <DollarCircleOutlined />, color: "indigo", suffix: "$" },
        ].map((item, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <Text type="secondary" className="block mb-1 font-medium">{item.label}</Text>
                <Title level={3} className="!m-0 !font-bold">
                  {item.val}
                </Title>
                <div className="mt-2 text-[12px] bg-slate-50 px-2 py-1 rounded-md inline-block text-slate-400">
                  Est: {item.est || 0}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 text-xl">
                {item.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Set Investment Target */}
        <Card className="shadow-sm border-none rounded-2xl lg:col-span-1">
          <Title level={4} className="!mb-6">Investment Target</Title>
          <div className="flex flex-col gap-4">
            <div>
              <Text className="block mb-2 font-medium">Monthly Investment Goal ($)</Text>
              <InputNumber
                size="large"
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                placeholder="Enter target amount"
                value={monthlyTarget}
                onChange={(v) => setMonthlyTarget(v)}
                className="w-full !rounded-xl"
              />
            </div>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              size="large" 
              block 
              className="!h-12 !rounded-xl !bg-emerald-600 hover:!bg-emerald-500 !border-none font-bold shadow-lg shadow-emerald-100"
              onClick={handleSave}
            >
              Save Goal
            </Button>
          </div>
        </Card>

        {/* Target Utilization */}
        <Card className="shadow-sm border-none rounded-2xl lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <Title level={4} className="!m-0 font-bold">Goal Completion Status</Title>
            {percent >= 100 && <Tag color="success" icon={<WarningOutlined />}>Monthly Goal Reached!</Tag>}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <Progress
                type="dashboard"
                percent={percent}
                strokeColor={{ '0%': '#10b981', '100%': '#059669' }}
                strokeWidth={10}
                size={180}
              />
            </div>

            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <Text type="secondary" className="block text-xs uppercase tracking-wider font-bold">Invested So Far</Text>
                  <Title level={3} className="!m-0 !text-emerald-600">${investedAmount}</Title>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <Text type="secondary" className="block text-xs uppercase tracking-wider font-bold">Target Goal</Text>
                  <Title level={3} className="!m-0 !text-slate-700">${monthlyTarget}</Title>
                </div>
              </div>
              
              {investedAmount >= monthlyTarget && monthlyTarget > 0 ? (
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3">
                  <Text className="text-emerald-700 font-medium">
                    Awesome! You have met your monthly investment target of ${monthlyTarget}!
                  </Text>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                  <Text className="text-blue-600 font-medium">
                    Remaining to reach target: ${monthlyTarget - investedAmount > 0 ? monthlyTarget - investedAmount : 0}
                  </Text>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Report;