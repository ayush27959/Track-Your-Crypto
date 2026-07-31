import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Button,
  Typography,
  Upload,
  message,
  Row,
  Col,
  Tag,
  Statistic,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  MailOutlined,
  SafetyOutlined,
  LogoutOutlined,
  WalletOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import http from "../../../utils/http";

const { Title, Text } = Typography;

const Account = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // =====================================================
  // GET USER FROM LOCAL STORAGE
  // =====================================================
  useEffect(() => {
    const storedData = localStorage.getItem("expense-user");

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        const userData = parsed.user || parsed.data || parsed;
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================
  const handleLogout = () => {
    localStorage.removeItem("expense-user");
    localStorage.removeItem("token");
    message.success("Logged out successfully");
    navigate("/");
  };

  // =====================================================
  // PROFILE PHOTO UPLOAD
  // =====================================================
  const handlePhotoUpload = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.originFileObj) {
      const formData = new FormData();
      formData.append("avatar", info.file.originFileObj);

      try {
        const res = await http.post("/api/user/update-profile", formData);
        
        const updatedUser = {
          ...user,
          avatar: res.data.avatarUrl || res.data.user?.avatar,
        };

        setUser(updatedUser);
        localStorage.setItem("expense-user", JSON.stringify(updatedUser));
        message.success("Profile photo updated successfully");
      } catch (err) {
        message.error("Photo upload failed");
      } finally {
        setLoading(false);
      }
    }
  };

  // Derived values for cleaner rendering
  const displayName = user?.name || user?.fullname || user?.fullName || "Crypto Trader";
  const displayEmail = user?.email || "Email Not Set";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-100 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-10">
          <Title className="!mb-1 !text-4xl !font-extrabold text-slate-800">
            My Crypto Account
          </Title>
          <Text className="text-slate-500 text-lg">
            Manage your trader profile and security settings
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card className="rounded-3xl border border-slate-200 shadow-xl overflow-hidden bg-white">
              <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-500" />

              <div className="relative flex flex-col items-center pb-8 px-5">
                <div className="-mt-16 relative">
                  <Avatar
                    size={130}
                    src={user?.avatar}
                    icon={<UserOutlined />}
                    className="border-[6px] border-white shadow-xl bg-slate-200 text-slate-500"
                  />
                  <Upload
                    showUploadList={false}
                    beforeUpload={() => true}
                    onChange={handlePhotoUpload}
                  >
                    <Button
                      shape="circle"
                      icon={<UploadOutlined />}
                      loading={loading}
                      className="absolute bottom-2 right-0 !bg-emerald-600 !text-white border-none shadow-lg hover:!bg-emerald-500"
                    />
                  </Upload>
                </div>

                <Title level={3} className="!mt-5 !mb-1 capitalize text-slate-800">
                  {displayName}
                </Title>

                <Text className="text-slate-500">
                  {displayEmail}
                </Text>

                <Tag color="emerald" className="mt-4 px-4 py-1 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800 border-emerald-200">
                  ⚡ Verified Crypto Trader
                </Tag>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={16}>
            <div className="grid gap-6">
              <Card className="rounded-3xl border border-slate-200 shadow-xl bg-white">
                <Title level={4} className="!mb-8 text-slate-800 font-bold">
                  Personal Information
                </Title>
                <div className="space-y-7">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl font-bold">
                      <MailOutlined />
                    </div>
                    <div>
                      <Text className="block text-xs uppercase text-slate-400 font-bold tracking-wider">
                        Email Address
                      </Text>
                      <Text className="text-lg font-semibold text-slate-800">
                        {displayEmail}
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-600 text-xl font-bold">
                      <SafetyOutlined />
                    </div>
                    <div>
                      <Text className="block text-xs uppercase text-slate-400 font-bold tracking-wider">
                        Account Status
                      </Text>
                      <Text className="text-lg font-semibold text-slate-800">
                        Verified 2FA Secured
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Portfolio Quick Overview */}
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Card className="rounded-3xl shadow-md border border-slate-200 bg-white">
                    <Statistic 
                      title={<span className="text-slate-500 font-bold text-xs uppercase">Portfolio Value</span>} 
                      value="$25,000" 
                      prefix={<WalletOutlined className="text-indigo-600" />} 
                      valueStyle={{ fontWeight: "800", color: "#312e81" }}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card className="rounded-3xl shadow-md border border-slate-200 bg-white">
                    <Statistic 
                      title={<span className="text-slate-500 font-bold text-xs uppercase">Total Buy Spent</span>} 
                      value="$40,000" 
                      valueStyle={{ color: "#059669", fontWeight: "800" }} 
                      prefix={<ArrowDownOutlined />} 
                    />
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card className="rounded-3xl shadow-md border border-slate-200 bg-white">
                    <Statistic 
                      title={<span className="text-slate-500 font-bold text-xs uppercase">Total Sold Return</span>} 
                      value="$15,000" 
                      valueStyle={{ color: "#d97706", fontWeight: "800" }} 
                      prefix={<ArrowUpOutlined />} 
                    />
                  </Card>
                </Col>
              </Row>

              <Card className="rounded-3xl border border-slate-200 shadow-xl bg-white">
                <div className="flex flex-col md:flex-row gap-4">
                  <Button type="primary" className="!bg-emerald-600 hover:!bg-emerald-500 !border-none !h-14 rounded-2xl flex-1 text-lg font-bold shadow-lg shadow-emerald-600/20">
                    Edit Profile
                  </Button>
                  <Button danger icon={<LogoutOutlined />} onClick={handleLogout} className="!h-14 rounded-2xl flex-1 text-lg font-bold">
                    Logout
                  </Button>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Account;