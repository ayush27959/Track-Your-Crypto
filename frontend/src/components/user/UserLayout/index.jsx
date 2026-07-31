import {
  AppstoreOutlined,
  LineChartOutlined,
  SwapOutlined,
  UserOutlined,
  MenuOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Image, Menu, Button, theme } from "antd";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../../../utils/http";

const { Sider, Header, Content } = Layout;

// Updated menu items for Crypto Tracker
const items = [
  {
    key: "/app/user/dashboard",
    label: "Dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    key: "/app/user/markets",
    label: "Live Markets",
    icon: <LineChartOutlined />,
  },
  {
    key: "/app/user/transactions",
    label: "Transactions",
    icon: <SwapOutlined />,
  },
  {
    key: "/app/user/account",
    label: "Account",
    icon: <UserOutlined />,
  },
];

const UserLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();

  const handleNavigate = (menu) => {
    navigate(menu.key);
  };

  const siderStyle = {
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    height: "100vh",
  };

  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px #f0f1f2",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
  };

  // Improved Logout handler
  const logout = async () => {
    try {
      setLoading(true);
      await http.get("/api/user/logout");
    } catch (err) {
      console.error("Logout API call error:", err);
    } finally {
      // Clear all local session tokens
      localStorage.removeItem("token");
      localStorage.removeItem("expense-user");
      
      toast.success("Logged out successfully");
      setLoading(false);
      navigate("/login");
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="!min-h-screen bg-slate-50">
      <Sider style={siderStyle} collapsible collapsed={open} onCollapse={setOpen}>
        <div className="flex items-center justify-center my-4">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/6001/6001368.png"
            width={open ? 40 : 55}
            height={open ? 40 : 55}
            alt="Crypto Tracker Logo"
            preview={false}
            className="rounded-xl drop-shadow-md transition-all duration-300"
          />
        </div>

        <Menu
          selectedKeys={[pathname]}
          theme="dark"
          items={items}
          onClick={handleNavigate}
        />
      </Sider>

      <Layout>
        <Header style={headerStyle} className="flex justify-between items-center">
          <Button
            type="text"
            onClick={() => setOpen(!open)}
            icon={<MenuOutlined className="text-slate-700 text-lg" />}
          />
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={logout}
            loading={loading}
            className="font-semibold"
          >
            Logout
          </Button>
        </Header>

        <Content
          style={{
            margin: "16px",
            padding: 20,
            minHeight: 280,
            backgroundColor: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="shadow-sm border border-slate-200/80"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;