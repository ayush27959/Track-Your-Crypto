import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Card, Button } from "antd";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SecondPagelayout from "../../layout/SecondPagelayout";
import http from "../../utils/http";

const { Item } = Form;

const ForgotPassword = () => {
  const [ForgotForm] = Form.useForm();
  const [rePassword] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tok = params.get("token");
    if (tok) {
      checkToken(tok);
    } else {
      setToken(null);
    }
  }, [params]);

  const checkToken = async (tok) => {
    try {
      await http.post(
        "/api/user/verify-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        }
      );
      setToken(tok);
    } catch (err) {
      setToken(null);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await http.post("/api/user/forgot-password", values);
      toast.success("Please check your email for reset instructions");
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async (values) => {
    try {
      if (values.password !== values.rePassword)
        return toast.warning("Passwords do not match");

      setLoading(true);

      await http.put(
        "/api/user/change-password",
        values,
        {
          headers: {
            Authorization: `Bearer ${params.get("token")}`,
          },
        }
      );
      toast.success("Password changed successfully, please login with your new password");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SecondPagelayout>
      <div className="flex min-h-screen bg-slate-100">
        {/* Left Image Section */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-emerald-50 p-8 border-r border-slate-200">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6001/6001368.png"
            alt="Crypto Tracker Password Reset"
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
                {token ? "Set New Password" : "Reset Your Password"}
              </p>
            </div>

            {token ? (
              <Form
                layout="vertical"
                onFinish={onChangePassword}
                form={rePassword}
              >
                <Item
                  name="password"
                  label={<span className="text-slate-800 font-semibold">New Password</span>}
                  rules={[{ required: true, message: "Please enter your new password!" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-slate-500" />}
                    placeholder="Enter your new password"
                    size="large"
                    className="!bg-white !text-slate-900 !border-slate-300 hover:!border-emerald-500 focus:!border-emerald-500 font-medium"
                  />
                </Item>

                <Item
                  name="rePassword"
                  label={<span className="text-slate-800 font-semibold">Confirm Password</span>}
                  rules={[{ required: true, message: "Please confirm your password!" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-slate-500" />}
                    placeholder="Re-enter your password"
                    size="large"
                    className="!bg-white !text-slate-900 !border-slate-300 hover:!border-emerald-500 focus:!border-emerald-500 font-medium"
                  />
                </Item>

                <Item className="mt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={loading}
                    className="!bg-emerald-600 hover:!bg-emerald-500 !text-white !font-bold !border-none shadow-md shadow-emerald-600/20"
                  >
                    Change Password
                  </Button>
                </Item>
              </Form>
            ) : (
              <Form
                layout="vertical"
                onFinish={onFinish}
                form={ForgotForm}
              >
                <Item
                  name="email"
                  label={<span className="text-slate-800 font-semibold">Email Address</span>}
                  rules={[{ required: true, message: "Please enter your email!" }]}
                >
                  <Input
                    prefix={<MailOutlined className="text-slate-500" />}
                    placeholder="Enter your registered email"
                    size="large"
                    className="!bg-white !text-slate-900 !border-slate-300 hover:!border-emerald-500 focus:!border-emerald-500 font-medium"
                  />
                </Item>

                <Item className="mt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={loading}
                    className="!bg-emerald-600 hover:!bg-emerald-500 !text-white !font-bold !border-none shadow-md shadow-emerald-600/20"
                  >
                    Send Reset Link
                  </Button>
                </Item>
              </Form>
            )}

            {/* Navigation Links */}
            <div className="flex justify-between items-center text-sm mt-4 pt-4 border-t border-slate-200">
              <Link
                to="/login"
                className="!text-emerald-700 hover:!text-emerald-800 !font-bold underline"
              >
                Sign In
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
    </SecondPagelayout>
  );
};

export default ForgotPassword;