import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Guard from "./Guard";
// Fix 1: Capital Loader matching file name
import Loader from "./components/shared/Loader"; 

const Homepage = lazy(() => import("./components/Home"));
const Homelayout = lazy(() => import("./layout/Homelayout"));
const Login = lazy(() => import("./components/Home/Login")); 
const Signup = lazy(() => import("./components/Home/Signup"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const UserLayout = lazy(() => import("./components/user/UserLayout"));

// Fix 2: Capital ForgotPassword match
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));

const Dashboard = lazy(() => import("./components/shared/Dashboard"));
const Reports = lazy(() => import("./components/shared/Reports"));
const Transaction = lazy(() => import("./components/shared/Transaction"));

// Fix 3: Admin Layout path verification
const AdminLayout = lazy(() => import("./components/Admin/AdminLayout"));

const Users = lazy(() => import("./components/shared/Users"));
const Account = lazy(() => import("./components/shared/Account"));
const LiveMarket = lazy(() => import("./components/shared/LiveMarket"));
const PortfolioHoldings = lazy(() => import("./components/shared/PortfolioHoldings"));

const Homepagestyle = lazy(() => import("./components/Home/Homepagestyle"));
const Learnmore = lazy(() => import("./learnmore/more"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Homepagestyle />} />
          <Route path="/home" element={<Homepage />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Signup" element={<Signup />} />
          
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/learnmore" element={<Learnmore />} />
          <Route path="/Learnmore" element={<Learnmore />} />

          {/* Admin Routes */}
          <Route
            path="/app/admin"
            element={
              <Guard endpoint="/api/user/session" role="admin">
                <AdminLayout />
              </Guard>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="account" element={<Account />} />
            <Route path="LiveMarket" element={<LiveMarket />} />
          </Route>

          {/* User Routes */}
          <Route
            path="/app/user"
            element={
              <Guard endpoint="/api/user/session" role="user">
                <UserLayout />
              </Guard>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="markets" element={<LiveMarket />} />
            <Route path="holdings" element={<PortfolioHoldings />} />
            <Route path="reports" element={<Reports />} />
            <Route path="transactions" element={<Transaction />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;