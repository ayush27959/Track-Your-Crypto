import Homelayout from "../../../layout/Homelayout"; // 👈 Add Layout Import
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Card, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import http from "../../../utils/http";

const { Item } = Form;

const Login = () => {
  const [loginForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await http.post("/api/user/login", values);
      const { role } = data;
      if (role === "admin") return navigate("/app/admin/dashboard");
      if (role === "user") return navigate("/app/user/dashboard");
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Homelayout> {/* 👈 Enclose inside Homelayout */}
      <div className="flex min-h-[80vh] bg-slate-100">
        {/* Left Image Section */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-emerald-50 p-8 border-r border-slate-200">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6001/6001368.png"
            alt="Crypto Wallet Tracker"
            className="w-4/5 object-contain drop-shadow-xl"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6 bg-slate-50">
          <Card className="w-full max-w-sm shadow-xl bg-white border border-slate-200">
            <div className="text-center mb-6">
              <h2 className="font-extrabold text-slate-800 text-2xl tracking-tight m-0">
                Crypto<span className="text-emerald-600">Tracker</span>
              </h2>
              <p className="text-slate-600 font-semibold text-sm mt-1">
                Sign in to manage your crypto portfolio
              </p>
            </div>

            <Form
              name="Login-form"
              layout="vertical"
              onFinish={onFinish}
              form={loginForm}
            >
              <Item
                name="email"
                label={<span className="text-slate-800 font-semibold">Email / Username</span>}
                rules={[{ required: true, message: "Please enter your email!" }]}
              >
                <Input
                  prefix={<MailOutlined className="text-slate-500" />}
                  placeholder="Enter your email"
                  size="large"
                  className="!bg-white !text-slate-900 !border-slate-300 hover:!border-emerald-500 font-medium"
                />
              </Item>

              <Item
                name="password"
                label={<span className="text-slate-800 font-semibold">Password</span>}
                rules={[{ required: true, message: "Please enter your password!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-slate-500" />}
                  placeholder="Enter your password"
                  size="large"
                  className="!bg-white !text-slate-900 !border-slate-300 hover:!border-emerald-500 font-medium"
                />
              </Item>

              <Item className="mt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  className="!bg-emerald-600 hover:!bg-emerald-500 !text-white !font-bold !border-none shadow-md shadow-emerald-600/20"
                  loading={loading}
                >
                  Sign In
                </Button>
              </Item>
            </Form>

            <div className="flex items-center justify-between text-sm mt-4 pt-4 border-t border-slate-200">
              <Link
                to="/forgot-password"
                className="!text-emerald-700 hover:!text-emerald-800 !font-bold underline"
              >
                Forgot Password?
              </Link>

              <Link
                to="/signup"
                className="!text-emerald-700 hover:!text-emerald-800 !font-bold underline"
              >
                Create Account
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Homelayout>
  );
};

export default Login;