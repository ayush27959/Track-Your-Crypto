import Homelayout from "../../../layout/Homelayout";
import { LockOutlined, UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Card, Button } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import http from "../../../utils/http";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const { Item } = Form;

const Signup = () => {
  const [signupForm] = Form.useForm();
  const [formData, setFormData] = useState(null);
  const [otp, setOtp] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await http.post("/api/user/send-mail", values);
      setOtp(data.otp);
      setFormData(values);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setOtp(null);
      setFormData(null);
    } finally {
      setLoading(false);
    }
  };

  const onSignup = async (values) => {
    try {
      if (Number(values.otp) !== Number(otp))
        return toast.error("OTP does not match");

      setLoading(true);
      await http.post("/api/user/signup", formData);
      await http.post("/api/user/verify-otp", { email: formData.email });

      toast.success("Signup successful! Welcome email sent.");
      setOtp(null);
      setFormData(null);
      signupForm.resetFields();
    } catch (err) {
      setOtp(null);
      setFormData(null);
      toast.error(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Homelayout>
      <div className="flex min-h-screen bg-slate-100">
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
          <Card className="w-full max-w-md shadow-xl bg-white border border-slate-200">
            <div className="text-center mb-6">
              <h2 className="font-extrabold text-slate-800 text-2xl tracking-tight m-0">
                Crypto<span className="text-emerald-600">Tracker</span>
              </h2>
              <p className="text-slate-600 font-semibold text-sm mt-1">
                {otp ? "VERIFY YOUR EMAIL" : "Create your account to start tracking"}
              </p>
            </div>

            {otp ? (
              <Form name="otp-form" layout="vertical" onFinish={onSignup}>
                <Item
                  name="otp"
                  label={<span className="text-slate-800 font-semibold">Enter OTP</span>}
                  rules={[{ required: true, message: "Please enter your OTP!" }]}
                >
                  <Input.OTP
                    size="large"
                    className="!text-slate-900"
                  />
                </Item>

                <Item className="mt-6">
                  <Button
                    type="primary"
                    loading={loading}
                    htmlType="submit"
                    block
                    size="large"
                    className="!bg-emerald-600 hover:!bg-emerald-500 !text-white !font-bold !border-none shadow-md shadow-emerald-600/20"
                  >
                    Verify & Create Account
                  </Button>
                </Item>
              </Form>
            ) : (
              <Form
                name="signup-form"
                layout="vertical"
                onFinish={onFinish}
                form={signupForm}
              >
                <Item
                  name="fullname"
                  label={<span className="text-slate-800 font-semibold">Full Name</span>}
                  rules={[{ required: true, message: "Please enter your full name!" }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-slate-500" />}
                    placeholder="Enter your full name"
                    size="large"
                    className="!bg-white !text-slate-900 !border-slate-300 hover:!border-emerald-500 focus:!border-emerald-500 font-medium"
                  />
                </Item>

                <Item
                  name="mobile"
                  label={<span className="text-slate-800 font-semibold">Mobile Number</span>}
                  rules={[{ required: true, message: "Please enter your mobile number!" }]}
                >
                  <Input
                    prefix={<PhoneOutlined className="text-slate-500" />}
                    placeholder="Enter your mobile number"
                    size="large"
                    className="!bg-white !text-slate-900 !border-slate-300 hover:!border-emerald-500 focus:!border-emerald-500 font-medium"
                  />
                </Item>

                <Item
                  name="email"
                  label={<span className="text-slate-800 font-semibold">Email Address</span>}
                  rules={[{ required: true, message: "Please enter your email!" }]}
                >
                  <Input
                    prefix={<MailOutlined className="text-slate-500" />}
                    placeholder="Enter your email"
                    size="large"
                    className="!bg-white !text-slate-900 !border-slate-300 hover:!border-emerald-500 focus:!border-emerald-500 font-medium"
                  />
                </Item>

                <Item
                  name="password"
                  label={<span className="text-slate-800 font-semibold">Password</span>}
                  rules={[{ required: true, message: "Please enter your password!" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-slate-500" />}
                    placeholder="Create a password"
                    size="large"
                    className="!bg-white !text-slate-900 !border-slate-300 hover:!border-emerald-500 focus:!border-emerald-500 font-medium"
                  />
                </Item>

                <Item className="mt-6">
                  <Button
                    type="primary"
                    loading={loading}
                    htmlType="submit"
                    block
                    size="large"
                    className="!bg-emerald-600 hover:!bg-emerald-500 !text-white !font-bold !border-none shadow-md shadow-emerald-600/20"
                  >
                    Send OTP & Register
                  </Button>
                </Item>
              </Form>
            )}

            {/* FIXED LINK HERE: to="/login" */}
            <div className="flex justify-end mt-4 pt-4 border-t border-slate-200">
              <Link
                to="/Login"
                className="!text-emerald-700 hover:!text-emerald-800 !font-bold underline text-sm"
              >
                Already have an account? Sign In
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Homelayout>
  );
};

export default Signup;